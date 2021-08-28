# Net Ninja Webpack Typescript Tutorial

**Project put on hold** since I found the series outdated inconsistent, actually a disappointment Net Ninja used to be a decent instructor.

---

## Motivation
The motivation to learn this topic is that I'm collecting knowledge to elaborate a no-framework web development stack of ttols
like Bootstrap, TypeScript, PWA, (in-browser) Local Storage, fetch/Axios, w3-iclude-html with inspirational videos like:
- [Learn JavaScript & CSS For Beginners by Creating a Dynamic Page Switcher](https://youtu.be/-eVgT9pLHhI) this was the video that started all this. 
- [How to create Tabs menu using Bootstrap 5](https://youtu.be/VdEJ1_pvHuU?t=636)
- The [Adding typescript to react with babel and webpack](https://www.udemy.com/course/typescript-with-react-hooks-and-context/learn/lecture/13688888#overview)
lecture of the Udemy class shows how to configure webpack for a from scratch React project.

## Installation
Sources:
- [Webpack & TypeScript, 2020](https://www.youtube.com/watch?v=lXWDkPCzeE4&list=PL4cUxeGkcC9hOkGbwzgYFmaxB0WiduYJC&index=1)
- [iamshaunjp/webpack-and-typescript](https://github.com/iamshaunjp/webpack-and-typescript)
Installation sequence:
- **npm init**
- **npm i typescript webpack webpack-cli webpack-dev-server ts-loader -D** so tsc and webpack both are installed locally to the package.
- **npx tsc --init**

For *index.html* I used the sample from [getbootstrap.com](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
You cannot use webpack without configuration because of the TS file: the webpack [configuration document says](https://webpack.js.org/configuration/) that 
Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is *src/index.js* and will output the result in *dist/main.js* minified and optimized for production.

[createapp.dev](https://createapp.dev/webpack) is a fancy tool to generate a project with webpack, parcel or snowpack. Interestingly parcel requires no config file at all.

After the 4th lesson. I stopped watching Net Ninja's video, since he used an older version of webpack and it behaved differently then webpack 5 I have here.
So I switched over to [Webpack 5 and Typescript Project Setup Walkthrough](https://www.youtube.com/watch?v=4lpmVZdj12g) which used webpack 5 and a lot more intuitive less than 30 minutes intro.

However eventually I decided  to switch over to Parcel because of its zero-configuration design, it fits much better to the simple development tool-set I am aiming to use. [Parcel JS Setups Walkthrough and Review](https://www.youtube.com/watch?v=D3EZ9dvjuHI) is a detailed explanation from 2021, but the first video I saw was [React, Typescript and Sass with Parcel - Part 1](https://www.youtube.com/watch?v=jdFaLrzfDB0) and [Part 2](https://www.youtube.com/watch?v=Px_2JE1vBkI) in this example React is configured with Parcel in a very simple way.

