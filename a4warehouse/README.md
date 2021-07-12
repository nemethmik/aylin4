# Aylin 4 Warehouse - a Backend Server for the Aylin 4 Store Front Shopping cart Application

The project more or less followed the Udemy course [MEAN Stack E-Commerce App: Angular 12, NX, PrimeNg [2021]](https://www.udemy.com/course/mean-stack-ecommerce-app-angular-nx-primeng/)

In my version, however, I used TypeScript heavily for the backend development, too. 
[NodeMon can be used with TS-Node](https://futurestud.io/tutorials/typescript-use-nodemon-to-restart-your-server-on-changes) to run ts files directly. When a server is installed as an Azure App Server, Azure can build the entire application on the server. Check out my series on SOAP services [Developing a SOAP Service with Node TypeScript and Deploying It as Azure App Service (Part 4)](https://www.youtube.com/watch?v=UNEVOctGbsw)
Here are the main points of setting up a proper TypeScript Express server environment:
- **npm install typescript nodemon ts-node @types/node @types/express npm-run-all eslint @types/morgan --save-dev** 
    - typescript is the TS compiler
    - nodemon with ts-node is to start server when a TS file is changed
    - npm-run-all is to perform a series of (test) scripts
    - ESLint for enforcing TS rules and have the option to automatically fix errors, where it is supported.
    - Installing @types/morgan is terribly important, otherwise it cannot be imported.
- **npm install express dotenv morgan**
    - dotenv is for hadling .env files
    - [morgan](https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n) is for logging incoming requests and it requires @types/morgan, too.
    The [morgan](http://expressjs.com/en/resources/middleware/morgan.html) log can be formatted a number of ways 
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

## Starting an Express Server

In a hosted environment it is terribly important to use the process.env.PORT variable which automatically set by Azure, AWS or any hosting system. If it is not defined, when running locally, then the default could be 3000.
```
let port: number = parseInt(process.env.PORT || "3000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 3000
```
The *dotenv* modules supports defining .env file containing environment variables, but when a real environment variable is defined it takes precedence.
bodyParser.json() as middleware is deprecated, use **app.use(express.json())**
