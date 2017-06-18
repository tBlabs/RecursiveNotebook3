import { MdSnackBar } from '@angular/material';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService, LoginStatus } from './services/auth.service';
import { Component } from '@angular/core';
import { TestSnackComponent } from "app/components/snackbar/snack.component";

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

    <simple-clock theme="gray" (clicked)="XXX($event)"></simple-clock>

    `,
  styleUrls: ['app.component.css']
})
export class AppComponent
{

  openSnackBar()
  {
    // this.snackBar.openFromComponent(TestSnackComponent, {
    //   duration: 1200,
    // });
    this.snackBar.open("yo!", "", { duration: 1000 });
  }

  XXX(event)
  {
    console.log(event.detail.foo);
    this.snackBar.open("Clock clicked!", "", { duration: 1000 });

  }

  showTabs: boolean = false;

  constructor(private _auth: AuthService, public snackBar: MdSnackBar
  )
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
