import { ErrorService } from './services/ErrorService';
import { MdSnackBar, MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from './tabs.module';
import { AuthComponent } from './components/auth/auth.component';
import { StorageService } from './services/storage.service';
import { CqrsBus } from './services/cqrs/cqrs-bus.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: 
  [
    AppComponent,
    AuthComponent
  ],
  imports: 
  [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TabsModule,
    MaterialModule
  ],
  providers: 
  [
    CqrsBus,
    StorageService,
    AuthService,
    MdSnackBar,
    ErrorService
  ],
  bootstrap:
  [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
