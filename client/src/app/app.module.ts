import { TabsModule } from './tabs.module';
import { AuthComponent } from './components/auth/auth.component';
import { StorageService } from './services/storage.service';
import { CqrsBus } from './services/cqrs/cqrs-bus.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    FormsModule,
    HttpModule,
    TabsModule
  ],
  providers: 
  [
    CqrsBus,
    StorageService,
    AuthService
  ],
  bootstrap:
  [
    AppComponent
  ]
})
export class AppModule { }
