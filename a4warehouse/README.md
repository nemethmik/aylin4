# Aylin 4 Warehouse - a Backend Server for the Aylin 4 Store Front Shopping cart Application

The project more or less followed the Udemy course [MEAN Stack E-Commerce App: Angular 12, NX, PrimeNg [2021]](https://www.udemy.com/course/mean-stack-ecommerce-app-angular-nx-primeng/)

In my version, however, I used TypeScript heavily for the backend development, too. 
[NodeMon can be used with TS-Node](https://futurestud.io/tutorials/typescript-use-nodemon-to-restart-your-server-on-changes) to run ts files directly. When a server is installed as an Azure App Server, Azure can build the entire application on the server. Check out my series on SOAP services [Developing a SOAP Service with Node TypeScript and Deploying It as Azure App Service (Part 4)](https://www.youtube.com/watch?v=UNEVOctGbsw)
Here are the main points of setting up a proper TypeScript Express server environment:
- **npm init** was used to create package.json
- **npm install typescript nodemon ts-node @types/node @types/express npm-run-all eslint @types/morgan @types/mongoose @types/cors @types/bcryptjs @types/jsonwebtoken @types/express-jwt  --save-dev** 
    - typescript is the TS compiler
    - nodemon with ts-node is to start server when a TS file is changed
    - npm-run-all is to perform a series of (test) scripts
    - ESLint for enforcing TS rules and have the option to automatically fix errors, where it is supported.
    - Installing @types/morgan is terribly important, otherwise it cannot be imported.
- **npm install express dotenv morgan mongoose cors bcryptjs jsonwebtoken express-jwt**
    - dotenv is for hadling .env files
    - [morgan](https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n) is for logging incoming requests and it requires @types/morgan, too.
    The [morgan](http://expressjs.com/en/resources/middleware/morgan.html) log can be formatted a number of ways 
    -mongoose is to access mongo DB
- run **npx tsc --init** to create tsconfig.json
- Add source and destination directories to the tsconfig.json  
    ```
    "outDir": "./dist",                        /* Redirect output structure to the directory. */
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ```
    If you get an error "no inputs were found in config file 'tsconfig.json'. specified 'include' paths were '["**/*"]' and 'exclude' paths were '["./dist"]'", just ignore it, when you create your **src/index.ts** and compile it the error goes away. 
- Run **npx eslint --init** to create *.eslintrc.json* When it asks if you use TypeScript answer yes, since it is going to install typescript support modules.
    - Add these rules to the .eslintrc.json file:
    ```
      "@typescript-eslint/explicit-module-boundary-types": ["warn", {"allowArgumentsExplicitlyTypedAsAny":true}],
      "@typescript-eslint/no-explicit-any":"warn",
      "quotes": ["error","double",{ "allowTemplateLiterals": true } ],
      "@typescript-eslint/semi": ["error", "never"]
    ```
- Remember to install the *ESLint extension* for Visual Studio code. Be patient, VSC may need some time to recognize the ESLint rules.
- Add **"main": "dist/index.js"**  to package.json. This must match the *outDir* defined in tsconfig.json.
- Add these commands to the scripts section in package.json:
    - **"start": "node ."** This will automatically start the server with running the JS file defined in the "main" instruction (see above) 
    - **"dev": "nodemon src/index.ts"** This is to run the application in development mode, when ts-node is installed TS files can be run directly.
    - **"build": "tsc -p ."** This will be used by Azure to build the (server) application upon deployment. 
    - "lint": "npx eslint src/" This will detect all issues with the source files in src folder.
    - "fix": "npx eslint src/ --fix" This will automatically fix the issues that can be fixable (semicolons removed, single quotes replaced with double quotes) with the source files in src folder.

It is bad practice to define start NPM command with nodemon, it should be *"start":"node ."*, dot is important otherwise node starts in interactive mode. For running nodemon, it is better to simply add a *"dev":"nodemon ."* or simply *"dev":"nodemon"* without dot, nodemon has no interactive mode. With these commands node or nodemon starts the file defined for main.

## The Most Common Commands
- To start development service **npm run dev**
  - You can use *npm start* but only after you have compiled the TypeScript application into the dist folder with *npm run build* This is exactly what Azure does when the application is deployed as an App/Web Service.
- To run CURL tests, open a new terminal window and set the *SVC* environment variable with *set SVC=http://localhost:4500/api/v10/* and then you can **npm run prod:10**
- I did a lot of tests with *Postman*, too. For interactive testing APIs it is more convenient than CURL.I have an account and I had to install the Postman local agent to access the *localhost* service.

## Starting an Express Server

In a hosted environment it is terribly important to use the process.env.PORT variable which automatically set by Azure, AWS or any hosting system. If it is not defined, when running locally, then the default could be 3000.
```
let port: number = parseInt(process.env.PORT || "3000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 3000
```
The *dotenv* modules supports defining .env file containing environment variables, but when a real environment variable is defined it takes precedence.
bodyParser.json() as middleware is deprecated, use **app.use(express.json())**

## Connecting to a Mongo DB
Install mongoose and get a connection string.
- Login to [cloud.mongodb.com](https://cloud.mongodb.com/) and on the Clusters page find the Connect button, then copy the connection string.
- On the database panel create a user for the application (a4storeowner).
- The database is a collection on the clusters panel (a4warehouse)
- Make sure to add your local IP to the network access otherwise an authorization fault is resulted

The mongoose.connect function returns a promise, so 
for the sake of fun, I included the database connection part into an async function and the entire server startup function into another async function. This was I managed to program the startup in a way that the Express server starts only after a successfult database connection.
In a real application this is not ok, since then the server cannot be asked via the web browser interface if the database connection was ok or not. 

MongoDB Compass is a simple tool to manage data. 
[Mongoose schema can be used with TypeScript](https://mongoosejs.com/docs/typescript/schemas.html), but a schema definition is necessary even with TypeScript.

Mongoose has a tricky API, after reviewing the [TypeScript sample](https://mongoosejs.com/docs/typescript.html) in the Mongoose documentation, you can find that the connect function imported from mongoose module seems to connect the database globally, and I was right: 
"Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection."  
```
import { Schema, model, connect } from "mongoose"

// 1. Create an interface representing a document in MongoDB.
interface User {
  name: string,
  email: string,
  avatar?: string,
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
})

// 3. Create a Model.
const UserModel = model<User>("User", schema)

run().catch(err => console.log(err))

async function run(): Promise<void> {
  // 4. Connect to MongoDB
  await connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const doc = new UserModel({
    name: "Bill",
    email: "bill@initech.com",
    avatar: "https://i.imgur.com/dM7Thhn.png"
  })
  await doc.save()

  console.log(doc.email) // bill@initech.com
}
``` 
When you want to use [multiple connections](https://mongoosejs.com/docs/connections.html#multiple_connections) with mongoose you should use
**createConnection** which returns a connection object, and its *model* member should be used to create models. Schemas are independent of models, since they are only definition objects, but a *model* is bound to a specific database connection. 
Instead of using this unintuitive default connection style it is better to explicitly use and pass around the *connection* object to any function performing database operation, which is the norm with every imaginable database system.
[Mongoose and multiple database in single node.js project](https://stackoverflow.com/questions/19474712/mongoose-and-multiple-database-in-single-node-js-project) is an excellent source fo information.

## Using typegoose
[Typegoose](https://github.com/typegoose/typegoose) is an excellent library when you are serious in Mongoose/MongoDB.

## Example Database Structure
He has five collections; Products, Orders, (non-hyerarchical product classification) Category, Users (customers = non isAdmin), OrderItems (the price should have been included, since it can change over time), there is no Shopping Cart (weird), no Payments.

I used to have bad memories with the hilarious limitations of Mondo DB and all other no-structure storage tools, I wouldn't even call them databases.
This course just reassured that no way I'd use such a system for a complex application vs a real SQL database.
On the other hand, for not too complex applications written in TypeScript where you regard the data as just a persistable collections it's quite ok.

In lesson 32 Show Category Details in the Product *populate* mongoose function is used. Lesson 37 nicely explain how to query products by categories. Lesson 38 explains how to use virtuals in mongoose schema definitions. Kessons 40 - 46 show a quite decent user management machinery using bcrypt.

## Source Code Structure
Since this is a small application, I stay away from subfolders. Each business objects has its own file, schema, business functions and models. Schemas and models are never exported from the modules ony the business functions and the TypeScript type/interface definitions. 
I didn't use Express routers, since it gives almost no real functionality.

[CORS](https://expressjs.com/en/resources/middleware/cors.html)  has a number of configuration option, and even [TypeScript examples](https://www.twilio.com/blog/add-cors-support-express-typescript-api) are available.

## JSON Web Tokens for Authentication
The contents of a token can be decoded at [jwt.io by Auth0](https://jwt.io/) 
Lesson 51 explains vaguely how to use the *isRevoked* express-jwt feature.
JWT is an enormously big topic way beyond the scope of such a tutorial application. Simple basic authentication would have been enough, unless the storefront is not extended with OAuth, that is where the authentication is done by a thirt party: Auth0, Google, Microsoft, Facebook.

## File Uploading
Section 7 explains how to use [Multer](https://expressjs.com/en/resources/middleware/multer.html) for file uploads. Multer is written on top of busboy, which I used in my [Brankica project](https://github.com/nemethmik/brankica)