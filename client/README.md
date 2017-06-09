# RecursiveNotebook2.WebClient

Based on **Angular 2.4.0**. Written in Visual Studio Code.

# Features

- [x] Authentication with JWT tokens 
- [x] Authorizaition (CanRead, CanAdd, CanEdit, CanDelete)
- [x] Adding, removing, editing notes
- [x] Tab context menu: Delete, Cut, Paste

# Used patterns and solutions

- CQRS - for comunication with server
- JWT - for user authentication
- GUID - for user and notes indexing
- Bootstrap3 - for styling
- angular2-contextmenu - for context menu
- angular2-focus - for autofocus on inputs

# How to run

- do **npm install** after download
- make sure server listen on *http://localhost:1234/api/cqrsbus* (or change endpoint in *cqrs-bus.service.ts*)
- in console: **ng serve** and then open browser at *http://localhost:4200*

# Backend

This project requires **RecursiveNotebook2.Server** to work properly.

