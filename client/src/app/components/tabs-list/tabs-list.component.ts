import { TabsService } from './../../services/tabs.service';
import { Tab } from './../../models/tab.model';
import { CqrsBus } from './../../services/cqrs/cqrs-bus.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { EmptyGuid } from './../../common/guid.extension';

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

    private LoadTabs(parentTab: Tab): void
    {
        this.isLoading = true;
        this.tabs = [];

        let parentId = parentTab != null ? parentTab.id : EmptyGuid;

        this.tabsService.GetChildren(parentId)
            .finally(() =>
            {
                this.isLoading = false;
            })
            .subscribe((tabs: Tab[]) => 
            {
                if (TabsListComponent.movingTab != null)
                    this.tabs = tabs.filter(t => t.id != TabsListComponent.movingTab.id); // Show all but not cutted one
                else
                    this.tabs = tabs;

                // Auto open first tab in first line of tabs (with parentId=0)
                if (this.tabs[0] != null && this.tabs[0].parentId == EmptyGuid)
                {
                    this.Select(this.tabs[0]);
                }
            },
            (err) =>
            {
                alert("Can not get children! Error: " + err);
            });
    }

    private AddSibiling(title: string): void
    {
        if (title != "")
        {
            let parentId = this.parentTab != null ? this.parentTab.id : EmptyGuid;

            this.tabsService.AddSibling(parentId, title).subscribe((newTab) =>
            {
                this.tabs.push(newTab);
                this.Select(newTab);
            },
                (err) =>
                {
                    alert("Can not add new tab! Error: " + err);
                });
        }
    }

    private UpdateTab(tab: Tab)
    {     
        return new Promise((resolve, reject) =>
        {
            console.log("SelectedTab:", tab);

            this.tabsService.Update(tab).subscribe(() => 
            {
                // nothing to do
                resolve();
            },
                (err) =>
                {
                    if (err == 401) alert("You have no permision to edit notes!");
                    else
                        alert("Can not edit tab! Error: " + err);

                    reject(err);
                });
        });

    }

    private RemoveTab(tab: Tab): void
    {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        this.SelectContentTab();
    }

    private Delete(tab: Tab): void
    {
        if (confirm(`Delete "${ tab.title }"?`))
        {
            this.tabsService.Delete(tab.id).subscribe(() =>
            {
                this.RemoveTab(tab);
            },
                (err) =>
                {
                    if (err == 401) alert("You have no permision to delete notes!");
                    else
                        alert("Can not delete tab! Error: " + err);
                });
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

        console.log(`Cutting ${TabsListComponent.movingTab.title}`);

        this.RemoveTab(TabsListComponent.movingTab);
    }

    private TabContextMenu_BindTabToParent($event): void
    {
        if (TabsListComponent.movingTab != null)
        {
            let contextMenuTab: Tab = $event.item;

            console.log(`Pasting "${ TabsListComponent.movingTab.title }" as child of "${ contextMenuTab.title }"...`);
 
            TabsListComponent.movingTab.parentId = contextMenuTab.parentId;

            this.UpdateTab(TabsListComponent.movingTab).then(()=>
            {
                this.Select(contextMenuTab);
                this.tabs.push(TabsListComponent.movingTab);
                this.Select(TabsListComponent.movingTab);
                
                TabsListComponent.movingTab = null;
            });          
        }
    }
}