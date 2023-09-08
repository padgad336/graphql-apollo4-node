# Notification Service
  <h2>NODEJS Typescript Graphql APOLLO V4 PM2 Boilerplate</h2>

 ## Installation

Use the package manager [yarn](https://yarnpkg.com/getting-started/install) to install package

```bash
   yarn
```
## Usage
 #### dev
```bash
# start develop
  yarn dev
 
```
 - to run the project, server will run on `http://localhost:8000/graphql`
 #### production
```bash
# start production
  docker-compose up -d --build
```
## Config
  #### .env
  ```bash
//config port api 
PORT=8940
//config link url mongoDB
MONGO_URI=mongodb+srv://
JWT_SECRET=localsecret

## Config
  #### .