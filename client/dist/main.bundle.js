webpackJsonp([1,4],{

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__ = __webpack_require__(314);
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






var LoginStatus;
(function (LoginStatus) {
    LoginStatus[LoginStatus["LoggedIn"] = 0] = "LoggedIn";
    LoginStatus[LoginStatus["UserNotFound"] = 1] = "UserNotFound";
    LoginStatus[LoginStatus["WrongPassword"] = 2] = "WrongPassword";
    LoginStatus[LoginStatus["ConnectionProblem"] = 3] = "ConnectionProblem";
})(LoginStatus || (LoginStatus = {}));
var RegisterStatus;
(function (RegisterStatus) {
    RegisterStatus[RegisterStatus["Registered"] = 0] = "Registered";
    RegisterStatus[RegisterStatus["EmailTaken"] = 1] = "EmailTaken";
    RegisterStatus[RegisterStatus["ConnectionProblem"] = 2] = "ConnectionProblem";
})(RegisterStatus || (RegisterStatus = {}));
var AuthService = (function () {
    function AuthService(_cqrs, _storage) {
        this._cqrs = _cqrs;
        this._storage = _storage;
        this.LoginStatusChanged = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        console.log("User is " + (this.IsLoggedIn() ? "logged in" : "not logged in"));
        this.LoginStatusChanged.next(this.IsLoggedIn());
    }
    AuthService.prototype.IsLoggedIn = function () {
        return (this._storage.GetSessionToken() != "");
    };
    AuthService.prototype.Login = function (email, pass) {
        var _this = this;
        var ret = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__["a" /* LoginQuery */]({ email: email, password: pass })).subscribe(function (token) {
            console.log("Token: " + token);
            _this._storage.SetSessionToken(token);
            ret.next(LoginStatus.LoggedIn);
            _this.LoginStatusChanged.next(true);
        }, function (err) {
            console.log("Err: " + err);
            switch (err) {
                case 404:
                    ret.next(LoginStatus.UserNotFound);
                    break;
                case 401:
                    ret.next(LoginStatus.WrongPassword);
                    break;
                default:
                    ret.next(LoginStatus.ConnectionProblem);
                    break;
            }
            _this._storage.SetSessionToken("");
        });
        return ret;
    };
    AuthService.prototype.Register = function (email, pass) {
        var _this = this;
        var ret = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_5_app_services_cqrs_messages__["b" /* UserRegisterQuery */]({ email: email, password: pass })).subscribe(function (token) {
            console.log("Token: " + token);
            _this._storage.SetSessionToken(token);
            ret.next(RegisterStatus.Registered);
            _this.LoginStatusChanged.next(true);
        }, function (err) {
            console.log("Err: " + err);
            switch (err) {
                case 406:
                    ret.next(RegisterStatus.EmailTaken);
                    break;
                default:
                    ret.next(LoginStatus.ConnectionProblem);
                    break;
            }
        });
        return ret;
    };
    AuthService.prototype.Logout = function () {
        this._storage.SetSessionToken('');
        this.LoginStatusChanged.next(false);
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__["a" /* CqrsBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__["a" /* CqrsBus */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__storage_service__["a" /* StorageService */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
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





var CqrsBus = (function () {
    function CqrsBus(_http, _storage) {
        this._http = _http;
        this._storage = _storage;
        this.API = ''; //https://localhost:3000/api/cqrsbus';
        this.API = 'api/cqrsbus';
    }
    CqrsBus.prototype.Send = function (message) {
        // Message class ---into---> { class_name: { class_fields }}
        var messagePackage = {};
        messagePackage[message.constructor.name] = message;
        var json = JSON.stringify(messagePackage);
        console.log('Sending message:', json);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Headers */]({
            'Content-type': 'application/json',
            'Authorization': this._storage.GetSessionToken()
        });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this._http
            .post(this.API, json, options)
            .map(function (response) {
            if (response.text() !== '') {
                return response.json();
            }
            else {
                return null;
            }
        })
            .do(function (x) {
            console.log('[CQRS.Send] Message result: ' + JSON.stringify(x));
        })
            .catch(function (e, c) {
            console.log('[CQRS.Send] Message exception: ', e);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(e.status);
        });
    };
    return CqrsBus;
}());
CqrsBus = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* StorageService */]) === "function" && _b || Object])
], CqrsBus);

var _a, _b;
//# sourceMappingURL=cqrs-bus.service.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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

var StorageService = (function () {
    function StorageService() {
        this.SESSION_TOKEN_NAME = "session_token";
        if (typeof (Storage) === "undefined") {
            console.log("STORAGE IS UNAVALIABLE!");
        }
    }
    StorageService.prototype.SetSessionToken = function (token) {
        localStorage.setItem(this.SESSION_TOKEN_NAME, token);
    };
    StorageService.prototype.GetSessionToken = function () {
        return localStorage.getItem(this.SESSION_TOKEN_NAME);
    };
    return StorageService;
}());
StorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], StorageService);

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_tab_model__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__ = __webpack_require__(314);
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





var TabsService = (function () {
    function TabsService(_cqrs) {
        this._cqrs = _cqrs;
    }
    TabsService.prototype.GetChildren = function (parentId) {
        return this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["c" /* GetNotesQuery */]({ parentId: parentId }));
    };
    TabsService.prototype.AddSibling = function (parentId, title) {
        var id = __WEBPACK_IMPORTED_MODULE_3_angular2_uuid__["UUID"].UUID();
        var tab = new __WEBPACK_IMPORTED_MODULE_0__models_tab_model__["a" /* Tab */]();
        tab.id = id;
        tab.parentId = parentId;
        tab.title = title;
        tab.content = '';
        return this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["d" /* AddNoteCommand */]({ id: id, parentId: parentId, title: title }))
            .map(function () { return tab; });
    };
    TabsService.prototype.Update = function (tab) {
        console.log("Update:", tab);
        return this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["e" /* UpdateNoteCommand */](tab));
    };
    TabsService.prototype.Delete = function (id) {
        return this._cqrs.Send(new __WEBPACK_IMPORTED_MODULE_4_app_services_cqrs_messages__["f" /* DeleteNotesCommand */]({ id: id }));
    };
    return TabsService;
}());
TabsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__["a" /* CqrsBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cqrs_cqrs_bus_service__["a" /* CqrsBus */]) === "function" && _a || Object])
], TabsService);

var _a;
//# sourceMappingURL=tabs.service.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tab; });
var Tab // equivalent of NoteDto in backend API
 = (function () {
    function Tab() {
    }
    return Tab;
}());

//# sourceMappingURL=tab.model.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UserRegisterQuery__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LoginQuery__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DeleteNotesCommand__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UpdateNoteCommand__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GetNotesQuery__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AddNoteCommand__ = __webpack_require__(478);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__UserRegisterQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__LoginQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__AddNoteCommand__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__UpdateNoteCommand__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__GetNotesQuery__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__DeleteNotesCommand__["a"]; });







//# sourceMappingURL=index.js.map

/***/ }),

/***/ 361:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 361;


/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(485);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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


var AppComponent = (function () {
    function AppComponent(_auth) {
        var _this = this;
        this._auth = _auth;
        this.showTabs = false;
        this.showTabs = _auth.IsLoggedIn();
        _auth.LoginStatusChanged.subscribe(function (x) { return _this.showTabs = x; });
    }
    AppComponent.prototype.Demo = function () {
        this._auth.Login("demo", "demo").subscribe(function (s) {
            if (s == __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["b" /* LoginStatus */].UserNotFound) {
                alert("No demo user in database");
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-root',
        template: "\n  \n    <div class=\"header\">      \n       <span class=\"title\">Recursive Notepad</span> \n       <auth></auth>        \n    </div>\n    \n         \n    <button *ngIf=\"!showTabs\" (click)=\"Demo()\" class=\"margin-top btn btn-danger center-block\">Run Demo</button>\n    <tabs *ngIf=\"showTabs\"></tabs>\n     \n\n    ",
        styles: [__webpack_require__(543)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_module__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_auth_auth_component__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_storage_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cqrs_cqrs_bus_service__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__(204);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_1__components_auth_auth_component__["a" /* AuthComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_0__tabs_module__["a" /* TabsModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__services_cqrs_cqrs_bus_service__["a" /* CqrsBus */],
            __WEBPACK_IMPORTED_MODULE_2__services_storage_service__["a" /* StorageService */],
            __WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */]
        ],
        bootstrap: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyGuid; });
var EmptyGuid = "00000000-0000-0000-0000-000000000000";
//# sourceMappingURL=guid.extension.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
var AuthComponent = (function () {
    function AuthComponent(_auth) {
        var _this = this;
        this._auth = _auth;
        this.inputsVisible = true;
        this.loginButtonVisible = true;
        this.logoutButtonVisible = false;
        this.loginButtonText = "Login";
        this.registerButtonText = "Register";
        this.emailInputError = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką
        this.passwordInputError = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką
        this._auth.LoginStatusChanged.subscribe(function (loginStatus) {
            if (loginStatus)
                _this.SetFormState(AuthFormViewState.LogedIn);
            else
                _this.SetFormState(AuthFormViewState.Initial);
        });
    }
    AuthComponent.prototype.SetFormState = function (state) {
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
    };
    AuthComponent.prototype.Login = function (email, pass) {
        var _this = this;
        this.SetFormState(AuthFormViewState.Logging);
        this._auth.Login(email, pass).subscribe(function (status) {
            switch (status) {
                case __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["b" /* LoginStatus */].LoggedIn:
                    _this.SetFormState(AuthFormViewState.LogedIn);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["b" /* LoginStatus */].UserNotFound:
                    _this.SetFormState(AuthFormViewState.UserNotFound);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["b" /* LoginStatus */].WrongPassword:
                    _this.SetFormState(AuthFormViewState.WrongPassword);
                    break;
                default:
                    _this.SetFormState(AuthFormViewState.Initial);
                    break;
            }
        });
    };
    AuthComponent.prototype.Register = function (email, pass) {
        var _this = this;
        this.SetFormState(AuthFormViewState.Registering);
        this._auth.Register(email, pass).subscribe(function (status) {
            switch (status) {
                case __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["c" /* RegisterStatus */].Registered:
                    _this.SetFormState(AuthFormViewState.LogedIn);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["c" /* RegisterStatus */].EmailTaken:
                    _this.SetFormState(AuthFormViewState.EmailTaken);
                    break;
                default:
                    _this.SetFormState(AuthFormViewState.Initial);
                    break;
            }
        });
    };
    AuthComponent.prototype.Logout = function () {
        this._auth.Logout();
        this.SetFormState(AuthFormViewState.Initial);
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'auth',
        template: "\n\n    <div class=\"form-inline\">\n    \n      <div class=\"form-group\">\n        <input type=\"text\" #email                  \n              [ngClass]=\"{ 'alert-danger': emailInputError, 'hide': !inputsVisible }\"\n              placeholder=\"E-mail\"\n              class=\"form-control\"\n              (keydown.enter)=\"Login(email.value, pass.value)\"\n              value=\"\">\n      </div>\n    \n      <div class=\"form-group\" >   \n        <input type=\"password\" #pass                \n              [ngClass]=\"{ 'alert-danger': passwordInputError, 'hide': !inputsVisible }\"\n              placeholder=\"Password\" \n              class=\"form-control\"\n              (keydown.enter)=\"Login(email.value, pass.value)\"\n              value=\"\">\n      </div> \n    \n      <div class=\"form-group\">\n        <button *ngIf=\"loginButtonVisible\"\n                (click)=\"Login(email.value, pass.value)\"\n                class=\"btn btn-primary\">{{ loginButtonText }}</button>\n        <button *ngIf=\"logoutButtonVisible\" \n                (click)=\"Logout()\"\n                class=\"btn\">Logout</button> \n      </div> \n      \n      <div class=\"form-group\">\n        <button *ngIf=\"loginButtonVisible\"\n                (click)=\"Register(email.value, pass.value)\"\n                class=\"btn btn-default\">{{ registerButtonText }}</button>    \n      </div>\n\n    </div>\n    ",
        styles: ["\n    .little-margin-top { margin-top: 12px }\n    .hide { display: none } \n  "] // because [hidden] is not working with .form-control
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AuthComponent);

var _a;
//# sourceMappingURL=auth.component.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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

var EditableOnceComponent = (function () {
    function EditableOnceComponent() {
        this.value = null;
        this.placeholder = null;
        this.onComplete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oldValue = null;
        this.edit = false;
        this.edited = false;
    }
    EditableOnceComponent.prototype.Edit = function () {
        this.edit = true;
        this.oldValue = this.value;
        this.value = "";
        this.edited = false;
    };
    EditableOnceComponent.prototype.OnEnterPress = function (value) {
        if (value != "") {
            this.edited = true;
            this.onComplete.emit(value);
            this.value = this.oldValue;
        }
        else {
            this.value = this.oldValue;
        }
        this.edit = false;
    };
    EditableOnceComponent.prototype.Abort = function () {
        if (this.edited) {
            return; // ..so we need to stop here
        }
        else {
            this.edit = false;
            this.value = this.oldValue;
        }
    };
    return EditableOnceComponent;
}());
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
        template: "\n       \n    <span *ngIf=\"!edit\" \n        (click)=\"Edit()\" \n        class=\"value-label\">\n        {{ value }}\n    </span>                                 \n\n    <span *ngIf=\"edit\" class=\"value-edit\">\n        <input type=\"text\"\n               #thisInput \n               focus=\"true\"\n               [value]=\"value\"                           \n               [placeholder]=\"placeholder\"\n               (keydown.enter)=\"OnEnterPress(thisInput.value)\"\n               (blur)=\"Abort()\" \n               (keydown.esc)=\"Abort()\">\n    </span>         \n    ",
        styles: ["\n        input { height: 20px; border: 1px solid #999; }\n    "]
    })
], EditableOnceComponent);

//# sourceMappingURL=editable-once.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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

var EditableValueComponent = (function () {
    function EditableValueComponent() {
        this.value = null;
        this.placeholder = null;
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oldValue = null;
        this.edit = false;
        this.edited = false;
    }
    EditableValueComponent.prototype.Edit = function () {
        this.edit = true;
        this.edited = false;
        this.oldValue = this.value;
    };
    EditableValueComponent.prototype.OnEnterPress = function (value) {
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
    };
    EditableValueComponent.prototype.Abort = function () {
        if (this.edited) {
            return; // ..so we need to stop here
        }
        else {
            this.edit = false;
            this.value = this.oldValue;
        }
    };
    return EditableValueComponent;
}());
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
        "      \n    <span *ngIf=\"!edit\"  \n           class=\"value-label\"\n          (dblclick)=\"Edit()\">{{ value }}</span>                                 \n\n    <span *ngIf=\"edit\" \n           class=\"value-edit\">\n        <input type=\"text\"\n               #thisInput \n               focus=\"true\"\n               [value]=\"value\"                           \n               [placeholder]=\"placeholder\"\n               (keydown.enter)=\"OnEnterPress(thisInput.value)\"\n               (blur)=\"Abort()\" \n               (keydown.esc)=\"Abort()\">\n    </span>         \n    ",
        styles: ["\n        input { height: 20px; border: 1px solid #aaa; }\n    "]
    })
], EditableValueComponent);

//# sourceMappingURL=editable-value.component.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_tab_model__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_guid_extension__ = __webpack_require__(472);
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





var TabsListComponent = TabsListComponent_1 = (function () {
    function TabsListComponent(tabsService, _title) {
        this.tabsService = tabsService;
        this._title = _title;
        this.parentTab = null;
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tabs = [];
        this.selectedTab = null;
        this.isLoading = false;
    }
    TabsListComponent.prototype.ngOnChanges = function () {
        this.selectedTab = null;
        this.LoadTabs(this.parentTab);
    };
    TabsListComponent.prototype.ngOnInit = function () {
        if (this.parentTab == null) {
            this.LoadTabs(this.parentTab);
        }
    };
    TabsListComponent.prototype.SelectContentTab = function () {
        if (this.selectedTab != null) {
            this.onSelect.emit(this.parentTab);
            this.selectedTab = null;
        }
    };
    TabsListComponent.prototype.Select = function (tab) {
        if (this.selectedTab != tab) {
            this.selectedTab = tab; // This will run ngOnChanges and ngOnInit
            this.onSelect.emit(this.selectedTab);
            this._title.setTitle(tab.title); // TODO remove from here
        }
    };
    TabsListComponent.prototype.LoadTabs = function (parentTab) {
        var _this = this;
        this.isLoading = true;
        this.tabs = [];
        var parentId = parentTab != null ? parentTab.id : __WEBPACK_IMPORTED_MODULE_4__common_guid_extension__["a" /* EmptyGuid */];
        this.tabsService.GetChildren(parentId)
            .finally(function () {
            _this.isLoading = false;
        })
            .subscribe(function (tabs) {
            if (TabsListComponent_1.movingTab != null)
                _this.tabs = tabs.filter(function (t) { return t.id != TabsListComponent_1.movingTab.id; }); // Show all but not cutted one
            else
                _this.tabs = tabs;
            // Auto open first tab in first line of tabs (with parentId=0)
            if (_this.tabs[0] != null && _this.tabs[0].parentId == __WEBPACK_IMPORTED_MODULE_4__common_guid_extension__["a" /* EmptyGuid */]) {
                _this.Select(_this.tabs[0]);
            }
        }, function (err) {
            alert("Can not get children! Error: " + err);
        });
    };
    TabsListComponent.prototype.AddSibiling = function (title) {
        var _this = this;
        if (title != "") {
            var parentId = this.parentTab != null ? this.parentTab.id : __WEBPACK_IMPORTED_MODULE_4__common_guid_extension__["a" /* EmptyGuid */];
            this.tabsService.AddSibling(parentId, title).subscribe(function (newTab) {
                _this.tabs.push(newTab);
                _this.Select(newTab);
            }, function (err) {
                alert("Can not add new tab! Error: " + err);
            });
        }
    };
    TabsListComponent.prototype.UpdateTab = function (tab) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("SelectedTab:", tab);
            _this.tabsService.Update(tab).subscribe(function () {
                // nothing to do
                resolve();
            }, function (err) {
                if (err == 401)
                    alert("You have no permision to edit notes!");
                else
                    alert("Can not edit tab! Error: " + err);
                reject(err);
            });
        });
    };
    TabsListComponent.prototype.RemoveTab = function (tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        this.SelectContentTab();
    };
    TabsListComponent.prototype.Delete = function (tab) {
        var _this = this;
        if (confirm("Delete \"" + tab.title + "\"?")) {
            this.tabsService.Delete(tab.id).subscribe(function () {
                _this.RemoveTab(tab);
            }, function (err) {
                if (err == 401)
                    alert("You have no permision to delete notes!");
                else
                    alert("Can not delete tab! Error: " + err);
            });
        }
    };
    TabsListComponent.prototype.CuttedTabName = function () {
        return (TabsListComponent_1.movingTab != null) ? TabsListComponent_1.movingTab.title : "";
    };
    TabsListComponent.prototype.HaveMovingTab = function () {
        return TabsListComponent_1.movingTab != null;
    };
    TabsListComponent.prototype.TabContextMenu_DeleteTab = function ($event) {
        this.Delete($event.item);
    };
    TabsListComponent.prototype.TabContextMenu_CutTab = function ($event) {
        TabsListComponent_1.movingTab = $event.item;
        console.log("Cutting " + TabsListComponent_1.movingTab.title);
        this.RemoveTab(TabsListComponent_1.movingTab);
    };
    TabsListComponent.prototype.TabContextMenu_BindTabToParent = function ($event) {
        var _this = this;
        if (TabsListComponent_1.movingTab != null) {
            var contextMenuTab_1 = $event.item;
            console.log("Pasting \"" + TabsListComponent_1.movingTab.title + "\" as child of \"" + contextMenuTab_1.title + "\"...");
            TabsListComponent_1.movingTab.parentId = contextMenuTab_1.parentId;
            this.UpdateTab(TabsListComponent_1.movingTab).then(function () {
                _this.Select(contextMenuTab_1);
                _this.tabs.push(TabsListComponent_1.movingTab);
                _this.Select(TabsListComponent_1.movingTab);
                TabsListComponent_1.movingTab = null;
            });
        }
    };
    return TabsListComponent;
}());
TabsListComponent.movingTab = null; // Must be static because cutted tab can be shared between many tabs-list's
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_tab_model__["a" /* Tab */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_tab_model__["a" /* Tab */]) === "function" && _a || Object)
], TabsListComponent.prototype, "parentTab", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]) === "function" && _b || Object)
], TabsListComponent.prototype, "onSelect", void 0);
TabsListComponent = TabsListComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'tabs-list',
        template: "\n\n        <ul class=\"nav nav-tabs little-margin-top\">\n\n            <li *ngIf=\"parentTab != null\" \n                [class.active]=\"selectedTab == null\" \n                (click)=\"SelectContentTab()\">\n                <a>_</a>\n            </li>\n\n            <li *ngIf=\"isLoading\"> \n                <a>Loading...</a>\n            </li>\n\n            <li *ngFor=\"let tab of tabs\"           \n                class=\"editable-tab\"    \n                [class.active]=\"tab == selectedTab\" \n                (click)=\"Select(tab)\"\n                [contextMenu]=\"tabContextMenu\"\n                [contextMenuSubject]=\"tab\">   \n                <a>  \n                    <editable-value [class.active-tab]=\"tab == selectedTab\" \n                                    [value]=\"tab.title\"\n                                    [placeholder]=\"'Title'\"\n                                    (onChange)=\"tab.title=$event; UpdateTab(tab)\">\n                    </editable-value>             \n                </a>\n            </li>\n\n            <li>   \n                <a>             \n                    <editable-once [value]=\"'(+)'\"\n                                   [placeholder]=\"'New Tab Title'\"\n                                   (onComplete)=\"AddSibiling($event)\">\n                    </editable-once>             \n                </a>\n            </li>\n \n        </ul>\n        \n        <tabs-list *ngIf=\"selectedTab != null\" \n                    [parentTab]=\"selectedTab\"\n                    (onSelect)=\"onSelect.emit($event)\">\n        </tabs-list> \n\n        <context-menu #tabContextMenu>\n            <template contextMenuItem let-item (execute)=\"TabContextMenu_DeleteTab($event)\">Delete</template>\n            <template contextMenuItem divider=\"true\"></template>\n            <template contextMenuItem let-item [enabled]=\"!HaveMovingTab()\" (execute)=\"TabContextMenu_CutTab($event)\">Cut</template>        \n            <template contextMenuItem let-item [enabled]=\"HaveMovingTab()\" (execute)=\"TabContextMenu_BindTabToParent($event)\">Paste <b>{{CuttedTabName()}}</b> as sibiling</template>\n        </context-menu>\n        \n    ",
        styles: [__webpack_require__(544)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* Title */]) === "function" && _d || Object])
], TabsListComponent);

var TabsListComponent_1, _a, _b, _c, _d;
//# sourceMappingURL=tabs-list.component.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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


var DynamicTabsComponent = (function () {
    function DynamicTabsComponent(_tabsService) {
        this._tabsService = _tabsService;
        this.selectedTab = null;
        this.buttonText = "Save";
        this.content = "";
    }
    DynamicTabsComponent.prototype.Selected = function ($event) {
        this.selectedTab = $event;
        if ($event != null) {
            console.log("Selected tab: " + this.selectedTab.title + " (id=" + this.selectedTab.id + ")");
        }
    };
    DynamicTabsComponent.prototype.Save = function () {
        var _this = this;
        this.buttonText = "Saving...";
        this.selectedTab.content = this.content;
        this._tabsService.Update(this.selectedTab)
            .finally(function () {
            _this.buttonText = "Save";
        })
            .subscribe(function () {
            // nothing to do
        }, function (err) {
            alert('Unable to save. Error ' + err);
        });
    };
    return DynamicTabsComponent;
}());
DynamicTabsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'tabs',
        template: "\n \n        <tabs-list (onSelect)=\"Selected($event)\"></tabs-list>\n          \n        <div id=\"textarea-box\">\n            <textarea *ngIf=\"selectedTab\" \n                      [value]=\"selectedTab.content\" \n                      (keyup)=\"content=$event.target.value\"></textarea>\n        </div>   \n\n        <div id=\"textarea-inputs-box\">  \n            <button *ngIf=\"selectedTab\" \n                    [disabled]=\"selectedTab.content==content\" \n                    (click)=\"Save()\" \n                    [innerHTML]=\"buttonText\" \n                    class=\"btn btn-primary  margin-right\">Save</button>     \n        </div>\n  \n    ",
        styles: [__webpack_require__(545)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__["a" /* TabsService */]) === "function" && _a || Object])
], DynamicTabsComponent);

var _a;
//# sourceMappingURL=tabs.component.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNoteCommand; });
var AddNoteCommand = (function () {
    function AddNoteCommand(init) {
        Object.assign(this, init);
    }
    return AddNoteCommand;
}());

//# sourceMappingURL=AddNoteCommand.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteNotesCommand; });
var DeleteNotesCommand = (function () {
    function DeleteNotesCommand(init) {
        Object.assign(this, init);
    }
    return DeleteNotesCommand;
}());

//# sourceMappingURL=DeleteNotesCommand.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetNotesQuery; });
var GetNotesQuery = (function () {
    function GetNotesQuery(init) {
        Object.assign(this, init);
    }
    return GetNotesQuery;
}());

//# sourceMappingURL=GetNotesQuery.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginQuery; });
var LoginQuery = (function () {
    function LoginQuery(init) {
        Object.assign(this, init);
    }
    return LoginQuery;
}());

//# sourceMappingURL=LoginQuery.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateNoteCommand; });
var UpdateNoteCommand = (function () {
    function UpdateNoteCommand(tab) {
        this.id = tab.id;
        this.parentId = tab.parentId;
        this.title = tab.title;
        this.content = tab.content;
    }
    return UpdateNoteCommand;
}());

//# sourceMappingURL=UpdateNoteCommand.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRegisterQuery; });
var UserRegisterQuery = (function () {
    function UserRegisterQuery(init) {
        Object.assign(this, init);
    }
    return UserRegisterQuery;
}());

//# sourceMappingURL=UserRegisterQuery.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_tabs_service__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_tabs_list_tabs_list_component__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_editable_value_editable_value_component__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_editable_once_editable_once_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_tabs_tabs_component__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_focus__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_focus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_focus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular2_contextmenu__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var TabsModule = (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
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

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(92)();
// imports


// module
exports.push([module.i, "tabs\n{\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n        flex: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%; \n}\n\n.header \n{  \n    display: -webkit-box;  \n    display: -ms-flexbox;  \n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between; \n    background: #333;\n    margin: 0;\n    padding: 12px;\n}\n\n.header span.title \n{ \n    -webkit-box-flex: 1; \n        -ms-flex: 1; \n            flex: 1; \n    font-size: 24px; \n    color: #eee;   \n    margin: 0;\n    padding: 0; \n}\n\n.header auth\n{\n    -webkit-box-flex: 2;\n        -ms-flex: 2;\n            flex: 2;   \n    text-align: right;\n}\n\n.margin-top \n{ \n    margin-top: 72px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(92)();
// imports


// module
exports.push([module.i, ".active-tab\n{\n    font-weight: bold;\n}\n\n.little-margin-top\n{\n    margin-top: 12px;\n}\n  \nul li,\nul li a\n{\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(92)();
// imports


// module
exports.push([module.i, "#textarea-box\n{\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; \n    display: -webkit-box; \n    display: -ms-flexbox; \n    display: flex;\n}\n\ntextarea \n{ \n    -webkit-box-flex: 1; \n        -ms-flex: 1; \n            flex: 1;\n    width: 98%; \n    margin: 12px 1%; \n    padding: 12px; \n    border: 1px solid #ddd;\n} \n\n#textarea-inputs-box\n{\n    text-align: right;\n}\n\n#textarea-inputs-box button\n{ \n    margin: 0 1% 12px \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(362);


/***/ })

},[824]);
//# sourceMappingURL=main.bundle.js.map