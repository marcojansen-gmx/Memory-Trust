Pull request test

# MemoryBank
An APP collaborating all of the accounts user or user's acquaintances have created and constantly forget, with functions notifying the members of the connected network to request support from each other

Semantic UI React
https://react.semantic-ui.com/

HTML to JSX Converter
https://htmltojsx.in/

Timestamp Microservice
https://github.com/maciejziemichod/Timestamp-Microservice

jsonwebtoken
https://www.npmjs.com/package/jsonwebtoken

bcrypt
https://www.npmjs.com/package/bcrypt

Visual Studio Code Tips and Tricks
https://code.visualstudio.com/docs/getstarted/tips-and-tricks


# Pass JWT to Resolver with Context (Server-side)

In this demo, you will verify if a token is valid and carry

## Instructions

* Run `npm install` and `npm run seed` to set up the database.

* Open [server.js](server/server.js) and explain the following:

  * We can add another option to our Apollo Server configuration called `context`, which is a lot like middleware in Express.

  * This will allow us to intercept any request to the server and check if there's a valid JWT before the request gets to the resolver.

* Open [auth.js](server/utils/auth.js) and explain the `authMiddleware` function:

  * Whenever we make a request to our server, we will check if there's a token with the request and attempt to verify and decode it if there is.

  * We use the `return` statement to return the `req` object, either modified with user data or not modified at all, and the request will continue to go to its intended resolver function.

* Open [resolvers.js](server/schemas/resolvers.js) and explain the following:

  * Any time we need to implement authentication on a query or mutation, we can add a third parameter called `context` to the resolver function.

  * The `context` object is whatever has been returned from our `authMiddleware` function, so it may or may not include a `user` property depending on the status of the JSON Web Token.

  * If there is a `user` property, we can assume the user's token has been verified and the `user` property now holds data about the user that we stored in the token itself.
