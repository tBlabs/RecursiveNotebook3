webpackJsonp([1,4],{

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 161;


/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(188);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_AuthService__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AppComponent = class AppComponent {
    constructor(_auth, _snackBar) {
        this._auth = _auth;
        this._snackBar = _snackBar;
        this.showTabs = false;
        this.showTabs = _auth.IsLoggedIn();
        _auth.LoginStatusChanged.subscribe((loginStatus) => this.showTabs = loginStatus);
    }
    openSnackBar() {
        this._snackBar.open("yo!", null, { duration: 1000 });
    }
    OnClockClick(event) {
        console.log('Clock clicked, event args: ', event.detail.foo);
        this._snackBar.open("This Clock is a Web Component :)", "", { duration: 3000 });
    }
    Demo() {
        this._auth.Login("demo@demo.com", "demo");
    }
};
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-root',
        template: `
 
    <div class="header">      
       <span class="title">Recursive Notepad</span> 
       <auth></auth>        
    </div>
         
    <button *ngIf="!showTabs" (click)="Demo()" class="margin-top btn btn-danger center-block">See Example</button>
    <tabs *ngIf="showTabs"></tabs>
<!--
    <button md-button (click)="openSnackBar()">
      Snack test!
    </button>
-->
    <simple-clock theme="gray" (clicked)="OnClockClick($event)"></simple-clock>

    `,
        styles: [__webpack_require__(248)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_AuthService__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cqrs_CqrsBus__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ErrorService__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_module__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_auth_auth_component__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_storage_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(171);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_auth_auth_component__["a" /* AuthComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__tabs_module__["a" /* TabsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MaterialModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__services_cqrs_CqrsBus__["a" /* CqrsBus */],
            __WEBPACK_IMPORTED_MODULE_7__services_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MdSnackBar */],
            __WEBPACK_IMPORTED_MODULE_2__services_ErrorService__["a" /* SnackService */]
        ],
        bootstrap: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_9__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const EmptyGuid = "00000000-0000-0000-0000-000000000000";
/* harmony export (immutable) */ __webpack_exports__["a"] = EmptyGuid;

//# sourceMappingURL=guid.extension.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_AuthService__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var AuthFormViewState;
(function (AuthFormViewState) {
    AuthFormViewState[AuthFormViewState["Initial"] = 0] = "Initial";
    AuthFormViewState[AuthFormViewState["Logging"] = 1] = "Logging";
    AuthFormViewState[AuthFormViewState["LogedIn"] = 2] = "LogedIn";
    AuthFormViewState[AuthFormViewState["UserNotFound"] = 3] = "UserNotFound";
    AuthFormViewState[AuthFormViewState["WrongPassword"] = 4] = "WrongPassword";
    AuthFormViewState[AuthFormViewState["Registering"] = 5] = "Registering";
    AuthFormViewState[AuthFormViewState["EmailTaken"] = 6] = "EmailTaken";
})(AuthFormViewState || (AuthFormViewState = {}));
let AuthComponent = class AuthComponent {
    constructor(_auth) {
        this._auth = _auth;
        this.inputsVisible = true;
        this.loginButtonVisible = true;
        this.logoutButtonVisible = false;
        this.loginButtonText = "Login";
        this.registerButtonText = "Register";
        this.emailInputError = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką
        this.passwordInputError = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką
        if (_auth.IsLoggedIn())
            this.SetFormState(AuthFormViewState.LogedIn);
        _auth.LoginStatusChanged.subscribe((loginStatus) => {
            if (loginStatus == true) {
                this.SetFormState(AuthFormViewState.LogedIn);
            }
        });
        // TODO nasłuchiwanie zmian w serwisie
    }
    SetFormState(state) {
        this.inputsVisible = true;
        this.loginButtonText = "Login";
        this.registerButtonText = "Register";
        this.loginButtonVisible = true;
        this.logoutButtonVisible = false;
        this.emailInputError = false;
        this.passwordInputError = false;
        switch (state) {
            default:
            case AuthFormViewState.Initial:
                // do nothing
                break;
            case AuthFormViewState.Logging:
                this.loginButtonText = "Logging...";
                break;
            case AuthFormViewState.LogedIn:
                this.inputsVisible = false;
                this.loginButtonVisible = false;
                this.logoutButtonVisible = true;
                break;
            case AuthFormViewState.UserNotFound:
                this.emailInputError = true;
                break;
            case AuthFormViewState.WrongPassword:
                this.passwordInputError = true;
                break;
            case AuthFormViewState.Registering:
                this.registerButtonText = "Registering...";
                break;
            case AuthFormViewState.EmailTaken:
                this.emailInputError = true;
                break;
        }
    }
    Login(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetFormState(AuthFormViewState.Logging);
            let status = yield this._auth.Login(email, pass);
            switch (status) {
                case __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["b" /* LoginStatus */].LoggedIn:
                    this.SetFormState(AuthFormViewState.LogedIn);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["b" /* LoginStatus */].UserNotFound:
                    this.SetFormState(AuthFormViewState.UserNotFound);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["b" /* LoginStatus */].WrongPassword:
                    this.SetFormState(AuthFormViewState.WrongPassword);
                    break;
                default:
                    this.SetFormState(AuthFormViewState.Initial);
                    break;
            }
        });
    }
    Register(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetFormState(AuthFormViewState.Registering);
            let status = yield this._auth.Register(email, pass);
            switch (status) {
                case __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["c" /* RegisterStatus */].Registered:
                    this.SetFormState(AuthFormViewState.LogedIn);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["c" /* RegisterStatus */].EmailTaken:
                    this.SetFormState(AuthFormViewState.EmailTaken);
                    break;
                default:
                    this.SetFormState(AuthFormViewState.Initial);
                    break;
            }
        });
    }
    Logout() {
        this._auth.Logout();
        this.SetFormState(AuthFormViewState.Initial);
    }
};
AuthComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'auth',
        template: `

    <div class="form-inline">
    
      <div class="form-group">
        <input type="text" #email                  
              [ngClass]="{ 'alert-danger': emailInputError, 'hide': !inputsVisible }"
              placeholder="E-mail"
              class="form-control"
              (keydown.enter)="Login(email.value, pass.value)"
              value="">
      </div>
   
      <div class="form-group" >   
        <input type="password" #pass                
              [ngClass]="{ 'alert-danger': passwordInputError, 'hide': !inputsVisible }"
              placeholder="Password" 
              class="form-control"
              (keydown.enter)="Login(email.value, pass.value)"
              value="">
      </div> 
    
      <div class="form-group">
        <button *ngIf="loginButtonVisible"
                (click)="Login(email.value, pass.value)"
                class="btn btn-primary">{{ loginButtonText }}</button>
        <button *ngIf="logoutButtonVisible" 
                (click)="Logout()"
                class="btn">Logout</button> 
      </div> 
      
      <div class="form-group">
        <button *ngIf="loginButtonVisible"
                (click)="Register(email.value, pass.value)"
                class="btn btn-default">{{ registerButtonText }}</button>    
      </div>

    </div>
    `,
        styles: [`
    .little-margin-top { margin-top: 12px }
    .hide { display: none } 
  `] // because [hidden] is not working with .form-control
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AuthService */]) === "function" && _a || Object])
], AuthComponent);

var _a;
//# sourceMappingURL=auth.component.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditableOnceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let EditableOnceComponent = class EditableOnceComponent {
    constructor() {
        this.value = null;
        this.placeholder = null;
        this.onComplete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oldValue = null;
        this.edit = false;
        this.edited = false;
    }
    Edit() {
        this.edit = true;
        this.oldValue = this.value;
        this.value = "";
        this.edited = false;
    }
    OnEnterPress(value) {
        if (value != "") {
            this.edited = true;
            this.onComplete.emit(value);
            this.value = this.oldValue;
        }
        else {
            this.value = this.oldValue;
        }
        this.edit = false;
    }
    Abort() {
        if (this.edited) {
            return; // ..so we need to stop here
        }
        else {
            this.edit = false;
            this.value = this.oldValue;
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EditableOnceComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EditableOnceComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EditableOnceComponent.prototype, "onComplete", void 0);
EditableOnceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'editable-once',
        template: `
       
    <span *ngIf="!edit" 
        (click)="Edit()" 
        class="value-label">
        {{ value }}
    </span>                                 

    <span *ngIf="edit" class="value-edit">
        <input type="text"
               #thisInput 
               focus="true"
               [value]="value"                           
               [placeholder]="placeholder"
               (keydown.enter)="OnEnterPress(thisInput.value)"
               (blur)="Abort()" 
               (keydown.esc)="Abort()">
    </span>         
    `,
        styles: [`
        input { height: 20px; border: 1px solid #999; }
    `]
    })
], EditableOnceComponent);

//# sourceMappingURL=editable-once.component.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditableValueComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let EditableValueComponent = class EditableValueComponent {
    constructor() {
        this.value = null;
        this.placeholder = null;
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oldValue = null;
        this.edit = false;
        this.edited = false;
    }
    Edit() {
        this.edit = true;
        this.edited = false;
        this.oldValue = this.value;
    }
    OnEnterPress(value) {
        if (value != "") {
            if (this.value != value) {
                this.value = value;
                this.edited = true;
                this.onChange.emit(this.value);
            }
        }
        else {
            this.value = this.oldValue;
        }
        this.edit = false;
    }
    Abort() {
        if (this.edited) {
            return; // ..so we need to stop here
        }
        else {
            this.edit = false;
            this.value = this.oldValue;
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EditableValueComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], EditableValueComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], EditableValueComponent.prototype, "onChange", void 0);
EditableValueComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'editable-value',
        template: 
        /*
            Warnings:
            (1) I think (!) that <a> tags styles are ignored by Angular in template, that's why we need to use something other here
            (2) .value-label need 3px of extra padding if we wanna have the same height of tab independently from edit mode (label or input)
                  - or -
                We need to change input height to smaller
        */
        `      
    <span *ngIf="!edit"  
           class="value-label"
          (dblclick)="Edit()">{{ value }}</span>                                 

    <span *ngIf="edit" 
           class="value-edit">
        <input type="text"
               #thisInput 
               focus="true"
               [value]="value"                           
               [placeholder]="placeholder"
               (keydown.enter)="OnEnterPress(thisInput.value)"
               (blur)="Abort()" 
               (keydown.esc)="Abort()">
    </span>         
    `,
        styles: [`
        input { height: 20px; border: 1px solid #aaa; }
    `]
    })
], EditableValueComponent);

//# sourceMappingURL=editable-value.component.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tabs_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_tab_model__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_guid_extension__ = __webpack_require__(173);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






let TabsListComponent = TabsListComponent_1 = class TabsListComponent {
    constructor(tabsService, _title) {
        this.tabsService = tabsService;
        this._title = _title;
        this.parentTab = null;
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]();
        this.tabs = [];
        this.selectedTab = null;
        this.isLoading = false;
    }
    ngOnChanges() {
        this.selectedTab = null;
        this.LoadTabs(this.parentTab);
    }
    ngOnInit() {
        if (this.parentTab == null) {
            this.LoadTabs(this.parentTab);
        }
    }
    SelectContentTab() {
        if (this.selectedTab != null) {
            this.onSelect.emit(this.parentTab);
            this.selectedTab = null;
        }
    }
    Select(tab) {
        if (this.selectedTab != tab) {
            this.selectedTab = tab; // This will run ngOnChanges and ngOnInit
            this.onSelect.emit(this.selectedTab);
            this._title.setTitle(tab.title); // TODO remove from here
        }
    }
    LoadTabs(parentTab) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            this.tabs = [];
            let parentId = parentTab != null ? parentTab.id : __WEBPACK_IMPORTED_MODULE_5__common_guid_extension__["a" /* EmptyGuid */];
            try {
                let tabs = yield this.tabsService.GetChildren(parentId);
                this.isLoading = false;
                if (TabsListComponent_1.movingTab != null)
                    this.tabs = tabs.filter(t => t.id != TabsListComponent_1.movingTab.id); // Show all but not cutted one
                else
                    this.tabs = tabs;
                // Auto open first tab in first line of tabs (with parentId=0)
                if (this.tabs[0] != null && this.tabs[0].parentId == __WEBPACK_IMPORTED_MODULE_5__common_guid_extension__["a" /* EmptyGuid */]) {
                    this.Select(this.tabs[0]);
                }
            }
            catch (ex) {
                if (ex.constructor.name === __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__["a" /* ServerException */].name) {
                    let serverException = ex;
                    let exceptionCode = serverException.code;
                    switch (exceptionCode) {
                        default: break;
                    }
                }
            }
        });
    }
    AddSibiling(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title != "") {
                let parentId = this.parentTab != null ? this.parentTab.id : __WEBPACK_IMPORTED_MODULE_5__common_guid_extension__["a" /* EmptyGuid */];
                try {
                    let newTab = yield this.tabsService.AddSibling(parentId, title);
                    this.tabs.push(newTab);
                    this.Select(newTab);
                }
                catch (ex) {
                    if (ex.constructor.name === __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__["a" /* ServerException */].name) {
                        let serverException = ex;
                        let exceptionCode = serverException.code;
                        switch (exceptionCode) {
                            default: break;
                        }
                    }
                }
            }
        });
    }
    UpdateTab(tab) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("SelectedTab:", tab);
            try {
                yield this.tabsService.Update(tab);
            }
            catch (ex) {
                if (ex == 401)
                    alert("You have no permision to edit notes!"); // TODO err code not ex!!!
                else
                    alert("Can not edit tab! Error: " + ex);
            }
        });
    }
    RemoveTab(tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        this.SelectContentTab();
    }
    Delete(tab) {
        return __awaiter(this, void 0, void 0, function* () {
            if (confirm(`Delete "${tab.title}"?`)) {
                try {
                    yield this.tabsService.Delete(tab.id);
                    this.RemoveTab(tab);
                }
                catch (ex) {
                    if (ex.constructor.name === __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__["a" /* ServerException */].name) {
                        let serverException = ex;
                        let exceptionCode = serverException.code;
                        switch (exceptionCode) {
                            default: break;
                        }
                    }
                }
            }
        });
    }
    CuttedTabName() {
        return (TabsListComponent_1.movingTab != null) ? TabsListComponent_1.movingTab.title : "";
    }
    HaveMovingTab() {
        return TabsListComponent_1.movingTab != null;
    }
    TabContextMenu_DeleteTab($event) {
        this.Delete($event.item);
    }
    TabContextMenu_CutTab($event) {
        TabsListComponent_1.movingTab = $event.item;
        console.log(`Cutting ${TabsListComponent_1.movingTab.title}`);
        this.RemoveTab(TabsListComponent_1.movingTab);
    }
    TabContextMenu_BindTabToParent($event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (TabsListComponent_1.movingTab != null) {
                let contextMenuTab = $event.item;
                console.log(`Pasting "${TabsListComponent_1.movingTab.title}" as child of "${contextMenuTab.title}"...`);
                TabsListComponent_1.movingTab.parentId = contextMenuTab.parentId;
                yield this.UpdateTab(TabsListComponent_1.movingTab);
                this.Select(contextMenuTab);
                this.tabs.push(TabsListComponent_1.movingTab);
                this.Select(TabsListComponent_1.movingTab);
                TabsListComponent_1.movingTab = null;
            }
        });
    }
};
TabsListComponent.movingTab = null; // Must be static because cutted tab can be shared between many tabs-list's
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_tab_model__["a" /* Tab */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_tab_model__["a" /* Tab */]) === "function" && _a || Object)
], TabsListComponent.prototype, "parentTab", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]) === "function" && _b || Object)
], TabsListComponent.prototype, "onSelect", void 0);
TabsListComponent = TabsListComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
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
        styles: [__webpack_require__(249)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_tabs_service__["a" /* TabsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["g" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["g" /* Title */]) === "function" && _d || Object])
], TabsListComponent);

var TabsListComponent_1, _a, _b, _c, _d;
//# sourceMappingURL=tabs-list.component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicTabsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


let DynamicTabsComponent = class DynamicTabsComponent {
    constructor(_tabsService) {
        this._tabsService = _tabsService;
        this.selectedTab = null;
        this.buttonText = "Save";
        this.content = "";
    }
    Selected(tab) {
        this.selectedTab = tab;
        if (tab != null) {
            console.log("Selected tab: " + this.selectedTab.title + " (id=" + this.selectedTab.id + ")");
        }
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buttonText = "Saving...";
            this.selectedTab.content = this.content;
            try {
                yield this._tabsService.Update(this.selectedTab);
                this.buttonText = "Save";
            }
            catch (ex) {
                alert('Unable to save. Error ' + ex);
            }
        });
    }
};
DynamicTabsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
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
        styles: [__webpack_require__(250)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */]) === "function" && _a || Object])
], DynamicTabsComponent);

var _a;
//# sourceMappingURL=tabs.component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ConnectionTimeoutException {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConnectionTimeoutException;

//# sourceMappingURL=ConnectionTimeoutException.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UnhandledException {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnhandledException;

//# sourceMappingURL=UnhandledException.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AddNoteCommand {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddNoteCommand;

//# sourceMappingURL=AddNoteCommand.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DeleteNotesCommand {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DeleteNotesCommand;

//# sourceMappingURL=DeleteNotesCommand.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GetNotesQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GetNotesQuery;

//# sourceMappingURL=GetNotesQuery.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LoginQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginQuery;

//# sourceMappingURL=LoginQuery.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UpdateNoteCommand {
    constructor(tab) {
        this.id = tab.id;
        this.parentId = tab.parentId;
        this.title = tab.title;
        this.content = tab.content;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UpdateNoteCommand;

//# sourceMappingURL=UpdateNoteCommand.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UserRegisterQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserRegisterQuery;

//# sourceMappingURL=UserRegisterQuery.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_tabs_list_tabs_list_component__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_editable_value_editable_value_component__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_editable_once_editable_once_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_tabs_tabs_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_focus__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_focus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_focus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let TabsModule = class TabsModule {
};
TabsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_9__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5_angular2_focus__["FocusModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu__["ContextMenuModule"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__components_tabs_tabs_component__["a" /* DynamicTabsComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__components_editable_value_editable_value_component__["a" /* EditableValueComponent */],
            __WEBPACK_IMPORTED_MODULE_3__components_editable_once_editable_once_component__["a" /* EditableOnceComponent */],
            __WEBPACK_IMPORTED_MODULE_1__components_tabs_list_tabs_list_component__["a" /* TabsListComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_tabs_tabs_component__["a" /* DynamicTabsComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */]
        ]
    })
], TabsModule);

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExceptionCode; });
var ExceptionCode;
(function (ExceptionCode) {
    ExceptionCode[ExceptionCode["UnhandledException"] = 1] = "UnhandledException";
    ExceptionCode[ExceptionCode["CanNotResolveMessage"] = 2] = "CanNotResolveMessage";
    ExceptionCode[ExceptionCode["CanNotResolveMessageHandler"] = 3] = "CanNotResolveMessageHandler";
    ExceptionCode[ExceptionCode["Unauthorized"] = 4] = "Unauthorized";
    ExceptionCode[ExceptionCode["WrongPassword"] = 5] = "WrongPassword";
    ExceptionCode[ExceptionCode["EmailTaken"] = 6] = "EmailTaken";
    ExceptionCode[ExceptionCode["UserNotExists"] = 7] = "UserNotExists";
    ExceptionCode[ExceptionCode["NoPermission"] = 8] = "NoPermission";
    ExceptionCode[ExceptionCode["InvalidUserEmail"] = 9] = "InvalidUserEmail";
    ExceptionCode[ExceptionCode["InvalidUserPassword"] = 10] = "InvalidUserPassword";
    ExceptionCode[ExceptionCode["InvalidNoteTitle"] = 11] = "InvalidNoteTitle";
    ExceptionCode[ExceptionCode["ValidationProblem"] = 12] = "ValidationProblem";
})(ExceptionCode || (ExceptionCode = {}));
//# sourceMappingURL=ExceptionCode.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status_codes__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status_codes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status_codes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__ = __webpack_require__(189);


class ServerException {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerException;

const SERVER_EXCEPTIONS = [
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].UnhandledException, message: "Unhandled exception", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["INTERNAL_SERVER_ERROR"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].CanNotResolveMessage, message: "Unknown message", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].CanNotResolveMessageHandler, message: "No handler for message", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].Unauthorized, message: "Unauthorized", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].WrongPassword, message: "Wrong password", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].EmailTaken, message: "Email already taken", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].UserNotExists, message: "User not exists", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].NoPermission, message: "No permission", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidUserEmail, message: "Invalid user email", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidUserPassword, message: "Invalid user password", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidNoteTitle, message: "Invalid note title", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].ValidationProblem, message: "Validation problem", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] }
];
/* unused harmony export SERVER_EXCEPTIONS */

//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)();
// imports


// module
exports.push([module.i, "tabs\n{\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n        flex: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%; \n}\n\n.header \n{  \n    display: -webkit-box;  \n    display: -ms-flexbox;  \n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between; \n    background: #333;\n    margin: 0;\n    padding: 12px;\n}\n\n.header span.title \n{ \n    -webkit-box-flex: 1; \n        -ms-flex: 1; \n            flex: 1; \n    font-size: 24px; \n    color: #eee;   \n    margin: 0;\n    padding: 0; \n}\n\n.header auth\n{\n    -webkit-box-flex: 2;\n        -ms-flex: 2;\n            flex: 2;   \n    text-align: right;\n}\n\n.margin-top \n{ \n    margin-top: 72px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)();
// imports


// module
exports.push([module.i, ".active-tab\n{\n    font-weight: bold;\n}\n\n.little-margin-top\n{\n    margin-top: 12px;\n}\n  \nul li,\nul li a\n{\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)();
// imports


// module
exports.push([module.i, "#textarea-box\n{\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; \n    display: -webkit-box; \n    display: -ms-flexbox; \n    display: flex;\n}\n\ntextarea \n{ \n    -webkit-box-flex: 1; \n        -ms-flex: 1; \n            flex: 1;\n    width: 98%; \n    margin: 12px 1%; \n    padding: 12px; \n    border: 1px solid #ddd;\n} \n\n#textarea-inputs-box\n{\n    text-align: right;\n}\n\n#textarea-inputs-box button\n{ \n    margin: 0 1% 12px \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(162);


/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cqrs_CqrsBus__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_errors_ExceptionCode__ = __webpack_require__(93);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RegisterStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







var LoginStatus;
(function (LoginStatus) {
    LoginStatus[LoginStatus["LoggedIn"] = 0] = "LoggedIn";
    LoginStatus[LoginStatus["UserNotFound"] = 1] = "UserNotFound";
    LoginStatus[LoginStatus["WrongPassword"] = 2] = "WrongPassword";
    LoginStatus[LoginStatus["EmptyInput"] = 3] = "EmptyInput";
    LoginStatus[LoginStatus["ConnectionProblem"] = 4] = "ConnectionProblem";
})(LoginStatus || (LoginStatus = {}));
var RegisterStatus;
(function (RegisterStatus) {
    RegisterStatus[RegisterStatus["Registered"] = 0] = "Registered";
    RegisterStatus[RegisterStatus["EmailTaken"] = 1] = "EmailTaken";
    RegisterStatus[RegisterStatus["ConnectionProblem"] = 2] = "ConnectionProblem";
})(RegisterStatus || (RegisterStatus = {}));
let AuthService = class AuthService {
    constructor(_cqrs, _storage) {
        this._cqrs = _cqrs;
        this._storage = _storage;
        console.log("User is " + (this.IsLoggedIn() ? "logged in with token " + this._storage.GetSessionToken() : "not logged in"));
        this.loginStatus = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
    }
    get LoginStatusChanged() {
        return this.loginStatus;
    }
    IsLoggedIn() {
        return (this._storage.GetSessionToken() !== null);
    }
    Login(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if (email === '' || pass === '') // TODO: real validation
                // {
                //     return LoginStatus.EmptyInput;
                // }
                //throw new ServerException();
                let tokenDTO = yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__["a" /* LoginQuery */]({ email: email, password: pass }));
                console.log("Token: " + tokenDTO.token);
                this._storage.SetSessionToken(tokenDTO.token);
                this.loginStatus.next(true);
                return LoginStatus.LoggedIn;
            }
            catch (ex) {
                console.log("Login exception: ", ex);
                if (ex instanceof __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__["a" /* ServerException */]) {
                    let serverException = ex;
                    console.log("SERVER EX: ", serverException);
                    switch (serverException.code) {
                        case __WEBPACK_IMPORTED_MODULE_6__shared_errors_ExceptionCode__["a" /* ExceptionCode */].UserNotExists: return LoginStatus.UserNotFound;
                        case __WEBPACK_IMPORTED_MODULE_6__shared_errors_ExceptionCode__["a" /* ExceptionCode */].WrongPassword: return LoginStatus.WrongPassword;
                        default: return LoginStatus.ConnectionProblem;
                    }
                }
                else {
                    console.log("OTHER EX");
                    return LoginStatus.ConnectionProblem;
                }
            }
        });
    }
    Register(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenDTO = yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__["b" /* UserRegisterQuery */]({ email: email, password: pass }));
                console.log("Token:", tokenDTO.token);
                this._storage.SetSessionToken(tokenDTO.token);
                this.loginStatus.next(true);
                return RegisterStatus.Registered;
            }
            catch (ex) {
                console.log("Register exception: ", ex);
                if (ex instanceof __WEBPACK_IMPORTED_MODULE_0__shared_errors_errors__["a" /* ServerException */]) {
                    let serverException = ex;
                    console.log("SERVER EX: ", serverException);
                    switch (serverException.code) {
                        case __WEBPACK_IMPORTED_MODULE_6__shared_errors_ExceptionCode__["a" /* ExceptionCode */].EmailTaken: return RegisterStatus.EmailTaken;
                        default: return RegisterStatus.ConnectionProblem;
                    }
                }
                else {
                    console.log("OTHER EX");
                    return RegisterStatus.ConnectionProblem;
                }
            }
        });
    }
    Logout() {
        this._storage.SetSessionToken('');
        this.loginStatus.next(false);
    }
};
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cqrs_CqrsBus__["a" /* CqrsBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cqrs_CqrsBus__["a" /* CqrsBus */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__storage_service__["a" /* StorageService */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=AuthService.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exceptions_ConnectionTimeoutException__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__exceptions_UnhandledException__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ErrorService__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_errors_errors__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CqrsBus; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








let CqrsBus = class CqrsBus {
    constructor(_http, _storage, _snackService) {
        this._http = _http;
        this._storage = _storage;
        this._snackService = _snackService;
        this.API = 'api/cqrsbus';
        if (!!process.env.PORT) {
            console.log("Production host");
            this.API = 'api/cqrsbus';
        }
        else {
            console.log("Local host");
            this.API = 'http://localhost:3000/api/cqrsbus';
        }
    }
    Send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (1) throw new ServerException();
            // Message class ---into---> { class_name: { class_fields }}
            const messagePackage = {};
            messagePackage[message.constructor.name] = message;
            const messageAsJson = JSON.stringify(messagePackage);
            console.log('Sending message:', messageAsJson);
            const headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* Headers */]({
                'Content-type': 'application/json',
                'Authorization': this._storage.GetSessionToken()
            });
            const options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
            try {
                let response = yield this._http.post(this.API, messageAsJson, options).timeout(3000).toPromise();
                console.log('POST Response:', response);
                if (response.text() !== '') {
                    let responseAsObject = response.json();
                    console.log('Message result: ' + JSON.stringify(responseAsObject));
                    return responseAsObject;
                }
                else {
                    console.log('Message result: (empty)');
                    return null;
                }
            }
            catch (ex) {
                console.log('[CQRS Bus] ex:', ex);
                if (ex instanceof __WEBPACK_IMPORTED_MODULE_6_rxjs__["TimeoutError"]) {
                    console.log("TIMEOUT");
                    this._snackService.Error("Connection timeout");
                    throw new __WEBPACK_IMPORTED_MODULE_0__exceptions_ConnectionTimeoutException__["a" /* ConnectionTimeoutException */]();
                }
                else if (ex instanceof __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* Response */]) {
                    if (ex.status === 0) {
                        this._snackService.Error("Server is not responding");
                        // throw new ServerNonResponsiveException();
                    }
                    else {
                        let serverException = ex.json();
                        console.log('[CQRS.Send] ServerException: ', serverException);
                        this._snackService.Error(serverException.message);
                        throw new __WEBPACK_IMPORTED_MODULE_7__shared_errors_errors__["a" /* ServerException */](serverException);
                        //throw serverException;
                    }
                }
                else {
                    console.log("Unhandled exception type");
                    this._snackService.Error('Unhandled exception');
                    throw new __WEBPACK_IMPORTED_MODULE_1__exceptions_UnhandledException__["a" /* UnhandledException */]();
                }
            }
            // return this._http
            //     .post(this.API, messageAsJson, options)
            //     .map(response =>
            //     {
            //         if (response.text() !== '')
            //         {
            //             return response.json();
            //         }
            //         else 
            //         {
            //             return null;
            //         }
            //     })
            //     .do(x => 
            //     {
            //         console.log('[CQRS.Send] Message result: ' + JSON.stringify(x))
            //     })
            //     .catch((e, c) =>
            //     {
            //         console.log('[CQRS.Send] Message exception: ', e);
            //         return Observable.throw(e.status);
            //     });
        });
    }
};
CqrsBus = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__storage_service__["a" /* StorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ErrorService__["a" /* SnackService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ErrorService__["a" /* SnackService */]) === "function" && _c || Object])
], CqrsBus);

var _a, _b, _c;
//# sourceMappingURL=CqrsBus.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(83)))

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let StorageService = class StorageService {
    constructor() {
        this.SESSION_TOKEN_NAME = "session_token";
        if (typeof (Storage) === "undefined") {
            console.log("STORAGE IS UNAVALIABLE!");
        }
    }
    SetSessionToken(token) {
        localStorage.setItem(this.SESSION_TOKEN_NAME, token);
    }
    ClearSessionToken() {
        localStorage.setItem(this.SESSION_TOKEN_NAME, '');
    }
    GetSessionToken() {
        let token = localStorage.getItem(this.SESSION_TOKEN_NAME);
        if (token === '')
            token = null;
        return token;
    }
};
StorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], StorageService);

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cqrs_CqrsBus__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_tab_model__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__ = __webpack_require__(92);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let TabsService = class TabsService {
    constructor(_cqrs) {
        this._cqrs = _cqrs;
    }
    GetChildren(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["c" /* GetNotesQuery */]({ parentId: parentId }));
        });
    }
    AddSibling(parentId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__["UUID"].UUID();
            const tab = new __WEBPACK_IMPORTED_MODULE_1__models_tab_model__["a" /* Tab */]();
            tab.id = id;
            tab.parentId = parentId;
            tab.title = title;
            tab.content = '';
            yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["d" /* AddNoteCommand */]({ id: id, parentId: parentId, title: title }));
            return tab; // TODO add try catch
        });
    }
    Update(tab) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["e" /* UpdateNoteCommand */](tab));
        });
    }
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["f" /* DeleteNotesCommand */]({ id: id }));
        });
    }
};
TabsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__cqrs_CqrsBus__["a" /* CqrsBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__cqrs_CqrsBus__["a" /* CqrsBus */]) === "function" && _a || Object])
], TabsService);

var _a;
//# sourceMappingURL=tabs.service.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tab // equivalent of NoteDto in backend API
 {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tab;

//# sourceMappingURL=tab.model.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(62);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let SnackService = class SnackService {
    constructor(_snack) {
        this._snack = _snack;
    }
    Error(message) {
        console.log("snack: " + message);
        this._snack.open(message, null, { duration: 2500, extraClasses: ["red-alert"] });
    }
};
SnackService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdSnackBar */]) === "function" && _a || Object])
], SnackService);

var _a;
//# sourceMappingURL=ErrorService.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UserRegisterQuery__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LoginQuery__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DeleteNotesCommand__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UpdateNoteCommand__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GetNotesQuery__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AddNoteCommand__ = __webpack_require__(181);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__UserRegisterQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__LoginQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__AddNoteCommand__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__UpdateNoteCommand__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__GetNotesQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__DeleteNotesCommand__["a"]; });







//# sourceMappingURL=index.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExceptionCode; });
var ExceptionCode;
(function (ExceptionCode) {
    ExceptionCode[ExceptionCode["UnhandledException"] = 1] = "UnhandledException";
    ExceptionCode[ExceptionCode["CanNotResolveMessage"] = 2] = "CanNotResolveMessage";
    ExceptionCode[ExceptionCode["CanNotResolveMessageHandler"] = 3] = "CanNotResolveMessageHandler";
    ExceptionCode[ExceptionCode["Unauthorized"] = 4] = "Unauthorized";
    ExceptionCode[ExceptionCode["WrongPassword"] = 5] = "WrongPassword";
    ExceptionCode[ExceptionCode["EmailTaken"] = 6] = "EmailTaken";
    ExceptionCode[ExceptionCode["UserNotExists"] = 7] = "UserNotExists";
    ExceptionCode[ExceptionCode["NoPermission"] = 8] = "NoPermission";
    ExceptionCode[ExceptionCode["InvalidUserEmail"] = 9] = "InvalidUserEmail";
    ExceptionCode[ExceptionCode["InvalidUserPassword"] = 10] = "InvalidUserPassword";
    ExceptionCode[ExceptionCode["InvalidNoteTitle"] = 11] = "InvalidNoteTitle";
    ExceptionCode[ExceptionCode["ValidationProblem"] = 12] = "ValidationProblem";
})(ExceptionCode || (ExceptionCode = {}));
//# sourceMappingURL=ExceptionCode.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status_codes__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http_status_codes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http_status_codes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__ = __webpack_require__(93);


class ServerException {
    constructor(init) {
        Object.assign(this, init);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerException;

const SERVER_EXCEPTIONS = [
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].UnhandledException, message: "Unhandled exception", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["INTERNAL_SERVER_ERROR"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].CanNotResolveMessage, message: "Unknown message", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].CanNotResolveMessageHandler, message: "No handler for message", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].Unauthorized, message: "Unauthorized", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].WrongPassword, message: "Wrong password", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].EmailTaken, message: "Email already taken", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].UserNotExists, message: "User not exists", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].NoPermission, message: "No permission", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidUserEmail, message: "Invalid user email", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidUserPassword, message: "Invalid user password", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].InvalidNoteTitle, message: "Invalid note title", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["UNAUTHORIZED"] },
    { code: __WEBPACK_IMPORTED_MODULE_1__ExceptionCode__["a" /* ExceptionCode */].ValidationProblem, message: "Validation problem", httpStatus: __WEBPACK_IMPORTED_MODULE_0_http_status_codes__["BAD_REQUEST"] }
];
/* unused harmony export SERVER_EXCEPTIONS */

//# sourceMappingURL=errors.js.map

/***/ })

},[510]);
//# sourceMappingURL=main.bundle.js.map