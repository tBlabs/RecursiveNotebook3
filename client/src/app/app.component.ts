import { MdSnackBar } from '@angular/material';
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
         
    <button *ngIf="!showTabs" (click)="Demo()" class="margin-top btn btn-danger center-block">See Example</button>
    <tabs *ngIf="showTabs"></tabs>

    <button md-button (click)="openSnackBar()">
      Snack test!
    </button>

    <simple-clock theme="gray" (clicked)="OnClockClick($event)"></simple-clock>

    `,
  styleUrls: ['app.component.css']
})
export class AppComponent
{
  showTabs: boolean;

  constructor(private _auth: AuthService, public _snackBar: MdSnackBar
  )
  {
    this.showTabs = _auth.IsLoggedIn();

    //_auth.LoginStatusChanged.subscribe(x => this.showTabs = x);
  }

  openSnackBar()
  {
    this._snackBar.open("yo!", "", { duration: 1000 });
  }

  OnClockClick(event)
  {
    console.log('Clock clicked, event args: ', event.detail.foo);
    this._snackBar.open("This Clock is a Web Component :)", "", { duration: 3000 });
  }

  Demo()
  {
    // this._auth.Login("demo", "demo").subscribe((s: LoginStatus) =>
    // {
    //   if (s == LoginStatus.UserNotFound) 
    //   {
    //     alert("No demo user in database");
    //   }
    // });
  }
}
