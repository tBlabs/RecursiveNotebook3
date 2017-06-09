import { TabsService } from './../../services/tabs.service';
import { Tab } from './../../models/tab.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tabs',
    template: `
 
        <tabs-list (onSelect)="Selected($event)"></tabs-list>
          
        <div id="textarea-box">
            <textarea *ngIf="selectedTab" 
                      [value]="selectedTab.content" 
                      (keyup)="content=$event.target.value"></textarea>
        </div>   

        <div id="textarea-inputs-box">  
            <button *ngIf="selectedTab" 
                    [disabled]="selectedTab.content==content" 
                    (click)="Save()" 
                    [innerHTML]="buttonText" 
                    class="btn btn-primary  margin-right">Save</button>     
        </div>
  
    `,
    styleUrls: ['tabs.component.css']
})
export class DynamicTabsComponent
{
    private selectedTab: Tab = null;

    private buttonText: string = "Save";
    private content: string = "";


    constructor(private _tabsService: TabsService) { }

    private Selected($event: Tab): void
    {
        this.selectedTab = $event;

        if ($event != null)
        {
            console.log("Selected tab: " + this.selectedTab.title + " (id=" + this.selectedTab.id + ")");
        }
    }

    private Save(): void
    {
        this.buttonText = "Saving...";
        
        this.selectedTab.content = this.content;

        this._tabsService.Update(this.selectedTab)
            .finally(() =>
            {
                this.buttonText = "Save";
            })
            .subscribe(() =>
            {
                // nothing to do
            },
            (err) => 
            {
                alert('Unable to save. Error ' + err);
            });
    }
}