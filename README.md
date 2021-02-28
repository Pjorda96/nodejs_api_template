# Api en Node.js and mongo

NodeJS template for fast startup

### Start the project
1. Open a terminal and go to the folder you want clone the project.
2. Clone the project with the following command: ```git clone https://github.com/Pjorda96/nodejs_api_template.git```
3. Go to the cloned project with ```cd nodejs_api_template```
4. Install the dependencies with ```npm i```
5. While installing the dependencies check the config variables at [config.js](src/config.js) to determine a secret key, token duration and database url.
6. After the dependencies have been installed start the project with ```npm start```

And `Node.js api listening on http://localhost:5000!`.

### Project endpoints

##### Health Checker
Useful for check the status of the api on the server

##### Test private
Endpoint to test the auth middleware with the token

##### Post CRUD
CRUD of an endpoint called `post`. Basic CRUD with custom auth endpoints.

##### User CRUD
`User` CRUD. Auth endpoints for handle user info. POST endpoint no needed for Sign Up use.

##### Auth
Sign In and Sign Up endpoints. Used to handle the `user` creation and get the auth token for restricted endpoints.

### Postman collection and environment
* [Postman collection](NodeTemplate.postman_collection.json)
* [Postman environment](Localhost.postman_environment.json)
