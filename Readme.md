# chai and backend series 
This is a video series on backend with javaScript.


 To Initialise the node package.
 - command: npm init
 - package name: (project.backend).
 - version : (as the version of the NPM)
 - Description : a backend in at chai and code channel- youtube.
 - entry point: (index.js)
 - test command: if not given it putted it by default if not given 
 - Git Reposiritory: you can initialize it now or can do it later
 - keywords: javaScript, backend, chai 
 - athor : Akshat Arya. 
 - then hit the enter.

 ## To initialize the Git repository.
 - commands:
 - git add . => it will add the files and folder to the git repo
 - git commit -m "add initial files for backend"
 - To change the master class to main:- git branch -M main
 - to add the remote :- git remote add origin https://github.com/midnighteagle/project.backend.git 
 - git push -u origin main :- To add the upstream and push the file and folder to the git.


 ### To store images:-
 - Make a file public , in public folder make an another folder name temp to add the images 
 - now we cheak the git status :- then it not push the folder only on git. and then the folder should be having files to push on the git .
 - then we put an file in it to push in it.
 - then it make a file that is .gitignore to keep the some secrets and api to the project otherwise a another option that is gitignore generator on the web that give all the data of gitignore according to your package name like nodejs or many more .
 - Now create a dotenv file that means enviromental variables file to provide the security of the system.


## Now make a folder in Root like SRC:
- create a file in the SRC folder of the name of app.js, constants.js, index.js
- command :-
- first change the directory: cd src then enter 
- To make the files : touch app.js,constants.js, index.js and hit the Enter button.
- then all the files are created.

# now configure the Package.json
- import of the packages in node by two types : 1st is common js, 2nd is modules.
- In the package.json file : upper the "main" syntax , put "type" : "module" 
- under the Script put : "dev": "nodemon src/index.js.

# now import nodemon as dev dependency 
- then the command is  npm i -D nodemon.

- now cheak git status : "git status" in the terminal.
- now add on the git :-" git add . " in the terminal
- now Commit with the message: "git commit -m "setup project File - Part 1" in the terminal.
- now push on the git : "git push" in the terminal.


## Now make folder in src
- cd src : to enter the Src Folder.
- now make folders: using cmd: mkdir controller, db, middleware, models, routes, utils-> then hit the enter button.
- then these folders are created in the Src folder.
- check git status
- commit on git . 

## Now to prettier 
- to install prettier on dev dependency :- npm i -D prettier

- prettierrc : it is used to set the prettier configration
- prettierignore : it is used to ignore file by prettier  





#### Some notes :-

- [Model Link] (https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

- gitignore : it is used to ignore file by the git 
- .env :Create a .env file in the root of your project (if using a monorepo structure like apps/backend/app.js, put it in the root of the folder where your index.js process runs):S3_BUCKET="YOURS3BUCKET", SECRET_KEY="YOURSECRETKEYGOESHERE"



### Now How connect database to the server