# MySpendings-server

Server code for MySpendings web application

## Local setup

Before setup a `.env` file is needed at the root directory.
It must have following variables:

- DATABASE_URL = database connection URL
- DB_PW = database password
- JWT_KEY = access token key
- JWT_REFRESH = refresh token key

### DataBase setup

Create a database with following scheme: `database/mySpendings.sql`

### Starting server

Run `node server.js` and the service should be running at port 8080 on localhost.
