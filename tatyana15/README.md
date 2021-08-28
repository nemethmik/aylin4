

# Tatyana15
The workspace was named after the excellent Russian volleyball player [Tatyana Kosheleva](https://youtu.be/RWNYCKrOX-g), who used to have number 15. 

**The project was put on hold** since I didn't like at all the way the instructor built this application. In the meantime, I learned Angular and I love it absolutely.
At first NX seemed to be loved, but eventually it just gives another layer of complexity,
a solution for a non-existent problem, honestly.
---

## Project Setup
After I created the workspace with **npx create-nx-workspace --preset=angular** which I got from [NX Setup](https://nx.dev/latest/angular/getting-started/nx-setup). This tool interactively asks for the workspace name (tatyana15) and the name of the 1st application (t15shop), stylesheet format (SASS) and linting format (ESLint).
NX detected wisely that I don't have NX CLI installed globally and gave instructions accordingly:

```
>  NX   NOTE  Nx CLI is not installed globally.
  This means that you might have to use "yarn nx" or "npx nx" to execute commands in the workspace.
  Run "yarn global add nx" or "npm install -g nx" to be able to execute command directly.
>  NX   NOTE  First time using Nx? Check out this interactive Nx tutorial.
  https://nx.dev/angular/tutorial/01-create-application
  Prefer watching videos? Check out this free Nx course on YouTube.
  https://www.youtube.com/watch?v=2mYLe9Kp9VM&list=PLakNactNC1dH38AfqmwabvOszDmKriGco
```
The application I created was t15store, and interestingly no README.MD was generated for the application.
This monorepo concept is relevant only for node JS projects because of its inherent technical nature. For a Java, C# or .NET Core it would be totally irrelevant since there the output could be a self-contained, autonomous JAR, DLL, LIB. This concept is totally missing from JS, hence the idea for monorepo.

As the name suggests there is only one package.json which has the regular start script for **npm start**. It actually started the t15shop application.
Since NX CLI wasn't inbstalled globally on my system use **npm run nx serve t15shop** within the tatyana15 workspace root folder to start the Angular shopping cart app.

NX supports plain [NodeJS](https://nx.dev/node) applications, too, so, the a4warehouse could have been added, too as an app in the NX workspace, which would be a lot more meaningfull setup, since this is the main idea behind NX. However, in that case all apps would use the same versions of NPM packages, which can be regarded as a good thing for cross-workspace consistency.

I used **npm run nx generate @nrwl/angular:app t15storeadmin** to create the store admin Angular application. When asked I picked using routing

When you work with NX it seems that it is not relying on a globally installed NX package.

## About NX

This project was generated using [Nx](https://nx.dev).

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="50">

🔎 **Smart, Extensible Build Framework**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@tatyana15/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.






## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
