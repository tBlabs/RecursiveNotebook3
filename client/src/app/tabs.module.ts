import { TabsService } from './services/tabs.service';
import { TabsListComponent } from './components/tabs-list/tabs-list.component';
import { EditableValueComponent } from './components/editable-value/editable-value.component';
import { EditableOnceComponent } from './components/editable-once/editable-once.component';
import { DynamicTabsComponent } from './components/tabs/tabs.component';
import { FocusModule } from 'angular2-focus';
import { Http, HttpModule } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'angular2-contextmenu';

@NgModule({
  imports: 
  [
    FormsModule,
    HttpModule,
    CommonModule,
    FocusModule.forRoot(),
    ContextMenuModule
  ],
  exports:
  [
    DynamicTabsComponent
  ],
  declarations:
  [   
    EditableValueComponent,
    EditableOnceComponent,
    TabsListComponent,
    DynamicTabsComponent
  ],
  providers:
  [
    TabsService
  ]
})
export class TabsModule { }