# solulab-task

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone https://github.com/hashimreja/solulabTask.git
cd solulab task
npm install
npm start (for development)
http://localhost:3000/api-doc for swagger api documentation
Before running swagger run npm test to load the database with sample data.
initially execute user login to get the auth token and authorize all the api's at global level and test the api's
```

### Testing 
``` 
git clone https://github.com/hashimreja/solulabTask.git
cd solulab task
npm install
npm test (for testing) and loading up the database with sample data
```

### Database Backup commands
``` 
mongodb backup:  mongodump --db mean --gzip --archive=solulab
mongodb restore: mongorestore --gzip --archive=mean --db solulab
```