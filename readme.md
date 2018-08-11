# Live demo

http://r-book.herokuapp.com

# TODO

- restore tests (there is some kind of problem with DI in message-validation.spec, that's why all tests are disabled)
- move messages (commands and queries) to /shared folder (this is not easy because of many reasons: mainly because of inject decorators)
- client validation is not even started..

# Architecture

- Very Object Oriented design (thanks to TypeScript :)
- Express.js server
- MongoDb
- CQRS bus with one endpoint
- IoC/DI (for messages and their handlers and few services)
- JWT (for user logging tokens)
- Repo pattern for notes
- DTO for transferring data from server to client
- Decorators for easier registering messages and handlers
- .env for keeping enviroment variables (dotenv)

# Build and run

Look at package.json in main dir. There is many commands for many things.
Basic run requires run of two commands (in separate terminals):
- npm run buildandrunclient
- npm run buildandrunserver

This will run client at localhost:4200 and server at localhost:3000

# For editors..

Watch out for `/shared` folder. Files from there are copied before every build to 
- client/app/src
- server/src

Do not edit those files from there! They will be overridden!
