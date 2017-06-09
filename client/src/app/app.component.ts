import { AuthComponent } from './components/auth/auth.component';
import { AuthService, LoginStatus } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  
    <div class="header">      
       <span class="title">Recursive Notepad</span> 
       <auth></auth>        
    </div>
    
         
    <button *ngIf="!showTabs" (click)="Demo()" class="margin-top btn btn-danger center-block">Run Demo</button>
    <tabs *ngIf="showTabs"></tabs>
     

    `,
  styleUrls: ['app.component.css']
})
export class AppComponent
{
  showTabs: boolean = false;

  constructor(private _auth: AuthService)
  {
    this.showTabs = _auth.IsLoggedIn();

    _auth.LoginStatusChanged.subscribe(x => this.showTabs = x);
  }

  Demo()
  {
    this._auth.Login("demo", "demo").subscribe((s: LoginStatus) =>
    {
      if (s == LoginStatus.UserNotFound) 
      {
        alert("No demo user in database");
      }
    });
  }
}
