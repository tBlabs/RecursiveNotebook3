Shared folder.

This folder must be copied to 
- client/src/app
- and server/src
after any change in its structure. That's terrible but it's the only way to obtain some shared resources.

Shared belongs to server package.json but! Using any lib (like http-status-codes) in shared files
must also be added to client package.json.

Any changes in this structure 


#Sharded folder modification

Any change in /sharded requires client and server rebuild (npm run buildclient & npm run buildserver)
to copy shared files to appropriate folders.


#To improve
- Database connections usage