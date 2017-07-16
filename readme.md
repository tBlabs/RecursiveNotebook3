Shared folder.

This folder must be copied to 
- client/src/app
- and server/src
after any change in its structure. That's terrible but it's the only way to obtain some shared resources.

Shared belongs to server package.json but! Using any lib (like http-status-codes) in shared files
must also be added to client package.json.

Any changes in this structure 


Few words about exceptions.

- there are to classes of exceptions:
    - server exceptions (ServerException)
        Which split into:
        - HandlerException's
        - CqrsBusException's
        - other exceptions
    - client exceptions (ClientException)



HandlerException : ForClient


IForClient
- msg
- httpStatus
- xxx: code, type

IForServer
- logMsg

Server
CustomException : IForClient


Client
CustomException : IForServer

