import { ServerException } from './../../../../../shared/errors/errors';
import { TabsService } from './../../services/tabs.service';
import { Tab } from './../../models/tab.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { EmptyGuid } from './../../common/guid.extension';
import { ExceptionCode } from "app/shared/errors/ExceptionCode";

@Component({
    selector: 'tabs-list',
    template: `

        <ul class="nav nav-tabs little-margin-top">

            <li *ngIf="parentTab != null" 
                [class.active]="selectedTab == null" 
                (click)="SelectContentTab()">
                <a>_</a>
            </li>

            <li *ngIf="isLoading"> 
                <a>Loading...</a>
            </li>

            <li *ngFor="let tab of tabs"           
                class="editable-tab"    
                [class.active]="tab == selectedTab" 
                (click)="Select(tab)"
                [contextMenu]="tabContextMenu"
                [contextMenuSubject]="tab">   
                <a>  
                    <editable-value [class.active-tab]="tab == selectedTab" 
                                    [value]="tab.title"
                                    [placeholder]="'Title'"
                                    (onChange)="tab.title=$event; UpdateTab(tab)">
                    </editable-value>             
                </a>
            </li>

            <li>   
                <a>             
                    <editable-once [value]="'(+)'"
                                   [placeholder]="'New Tab Title'"
                                   (onComplete)="AddSibiling($event)">
                    </editable-once>             
                </a>
            </li>
 
        </ul>
        
        <tabs-list *ngIf="selectedTab != null" 
                    [parentTab]="selectedTab"
                    (onSelect)="onSelect.emit($event)">
        </tabs-list> 

        <context-menu #tabContextMenu>
            <template contextMenuItem let-item (execute)="TabContextMenu_DeleteTab($event)">Delete</template>
            <template contextMenuItem divider="true"></template>
            <template contextMenuItem let-item [enabled]="!HaveMovingTab()" (execute)="TabContextMenu_CutTab($event)">Cut</template>        
            <template contextMenuItem let-item [enabled]="HaveMovingTab()" (execute)="TabContextMenu_BindTabToParent($event)">Paste <b>{{CuttedTabName()}}</b> as sibiling</template>
        </context-menu>
        
    `,
    styleUrls: ['tabs-list.component.css']
})
export class TabsListComponent implements OnInit, OnChanges
{
    @Input() parentTab: Tab = null;
    @Output() onSelect: EventEmitter<Tab> = new EventEmitter<Tab>();

    private static movingTab: Tab = null; // Must be static because cutted tab can be shared between many tabs-list's

    private tabs: Tab[] = [];
    private selectedTab: Tab = null;
    private isLoading: boolean = false;

    constructor(private tabsService: TabsService, private _title: Title) { }

    ngOnChanges()
    {
        this.selectedTab = null;

        this.LoadTabs(this.parentTab);
    }

    ngOnInit()
    {
        if (this.parentTab == null) // Because ngOnChanges() comes first..
        {
            this.LoadTabs(this.parentTab);
        }
    }

    private SelectContentTab(): void
    {
        if (this.selectedTab != null)
        {
            this.onSelect.emit(this.parentTab);

            this.selectedTab = null;
        }
    }

    private Select(tab: Tab): void
    {
        if (this.selectedTab != tab)
        {
            this.selectedTab = tab; // This will run ngOnChanges and ngOnInit

            this.onSelect.emit(this.selectedTab);

            this._title.setTitle(tab.title); // TODO remove from here
        }
    }

    private async LoadTabs(parentTab: Tab): Promise<void>
    {
        this.isLoading = true;
        this.tabs = [];

        let parentId = parentTab != null ? parentTab.id : EmptyGuid;
        try
        {
            let tabs: Tab[] = await this.tabsService.GetChildren(parentId);

            this.isLoading = false;

            if (TabsListComponent.movingTab != null)
                this.tabs = tabs.filter(t => t.id != TabsListComponent.movingTab.id); // Show all but not cutted one
            else
                this.tabs = tabs;

            // Auto open first tab in first line of tabs (with parentId=0)
            if (this.tabs[0] != null && this.tabs[0].parentId == EmptyGuid)
            {
                this.Select(this.tabs[0]);
            }
        }
        catch (ex)
        {
            if (ex.constructor.name === ServerException.name) // if (ex instanceof ServerException) - is not working here!
            {
                let serverException: ServerException = ex as ServerException;
                let exceptionCode: ExceptionCode = serverException.code;

                switch (exceptionCode)
                {
                    default: break;
                }
            }
        }
    }

    private async AddSibiling(title: string): Promise<void>
    {
        if (title != "")
        {
            let parentId = this.parentTab != null ? this.parentTab.id : EmptyGuid;

            try
            {
                let newTab: Tab = await this.tabsService.AddSibling(parentId, title);

                this.tabs.push(newTab);
                this.Select(newTab);
            }
            catch (ex)
            {
                if (ex.constructor.name === ServerException.name) // if (ex instanceof ServerException) - is not working here!
                {
                    let serverException: ServerException = ex as ServerException;
                    let exceptionCode: ExceptionCode = serverException.code;

                    switch (exceptionCode)
                    {
                        default: break;
                    }
                }
            }
        }
    }

    private async UpdateTab(tab: Tab)
    {
        console.log("SelectedTab:", tab);

        try
        {
            await this.tabsService.Update(tab);
        }
        catch (ex)
        {
            if (ex == 401) alert("You have no permision to edit notes!"); // TODO err code not ex!!!
            else
                alert("Can not edit tab! Error: " + ex);
        }
    }

    private RemoveTab(tab: Tab): void
    {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        this.SelectContentTab();
    }

    private async Delete(tab: Tab): Promise<void>
    {
        if (confirm(`Delete "${ tab.title }"?`))
        {
            try
            {
                await this.tabsService.Delete(tab.id);

                this.RemoveTab(tab);
            }
            catch (ex)
            {
                if (ex.constructor.name === ServerException.name) // if (ex instanceof ServerException) - is not working here!
                {
                    let serverException: ServerException = ex as ServerException;
                    let exceptionCode: ExceptionCode = serverException.code;

                    switch (exceptionCode)
                    {
                        default: break;
                    }
                }
            }
        }
    }

    private CuttedTabName() // This is a function because template can not access static members directly
    {
        return (TabsListComponent.movingTab != null) ? TabsListComponent.movingTab.title : "";
    }

    private HaveMovingTab() // This is a function because template can not access static members directly
    {
        return TabsListComponent.movingTab != null;
    }

    private TabContextMenu_DeleteTab($event)
    {
        this.Delete($event.item);
    }

    private TabContextMenu_CutTab($event)
    {
        TabsListComponent.movingTab = $event.item;

        console.log(`Cutting ${ TabsListComponent.movingTab.title }`);

        this.RemoveTab(TabsListComponent.movingTab);
    }

    private async TabContextMenu_BindTabToParent($event): Promise<void>
    {
        if (TabsListComponent.movingTab != null)
        {
            let contextMenuTab: Tab = $event.item;

            console.log(`Pasting "${ TabsListComponent.movingTab.title }" as child of "${ contextMenuTab.title }"...`);

            TabsListComponent.movingTab.parentId = contextMenuTab.parentId;

            await this.UpdateTab(TabsListComponent.movingTab);

            this.Select(contextMenuTab);
            this.tabs.push(TabsListComponent.movingTab);
            this.Select(TabsListComponent.movingTab);

            TabsListComponent.movingTab = null;
        }
    }
}