## Basic Instructions for Professor and TA

### How to run web app

0. Make sure you have node and npm installed
1. Run `npm install` - this will install all relevant dependencies
2. Run `npm run build` - this will build a product-ready application
3. With your favorite http-server of choice, serve the *~/build* folder, we recommend [http-server](https://www.npmjs.com/package/http-server).
4. Alternatively, run `npm run start` to start the development server (not recommended)

### How to build JSDocs

1. Run `npm run docs` at project's root directory
2. Open the up the `~/docs/index.html` file
3. Alternatively, use [http-server](https://www.npmjs.com/package/http-server) at the `~/docs` directory

### How to run automated Unit tests

1. Run `npm run test` to run all unit tests

### How to run performance test

1. `npm run test` will generate a PerformanceTest.md markdown file at the root directory of our project

## Naming Conventions

|Entity|Format|Example|Remarks|
|-|-|-|-|-|
|Component Names|`ComponentName`|`FancyButton`|a.k.a. PascalCase|
|CSS ClassNames|`name-of-component__some-description`|`fancy-button__primary-disabled`|name of the component followed by 2 underscores and the description of the style. This is a simplified form of the BEM (block element modifier) CSS Architecture.<br />Note: no capital letters.|
|JS Variable/function names|`variableName`|`counterForLoop`|a.k.a. camelCase<br />TBH I don't really mind what naming scheme is used for variables and functions as long as they stay within the component. **But** if your function is a React Component, please follow the convention for component name.|

## Folder structure
Where do I make a new component?

```
src
├── components
│   ├── NameOfComponent
|   │  ├── NameOfComponent.scss
|   │  └── NameOfComponent.jsx
│   └── index.tsx
├── page
│   └── NameOfPage
|   │  ├── NameOfPage.scss
|   │  └── NameOfPage.jsx
│   └── index.tsx
├── serviceWorker.js
└── utils.js
```

## Importing Components and Pages
How to import a component?
```
import { NameOfComponent } from '../components';
```
How to add a component to the index?
1. open up ./src/components/index.tsx
2. import the component into this file with
```
import Navbar from './NameOfComponent/NameOfComponent';
```
3. add the component into the export object
```
export { Navbar, NameOfComponent };
```
4. How to consume it?
```
./some/random/place.js

import { NavBar, AnotherComponent } from ./path/to/components/index.tsx;
```
The same exact thing will apply for pages/index.tsx

#
## FAQ for CZ3003 Team - Implementation of Web App

Feel free to hit Xing Zhi or Nicholas up if you have any questions.

**Q: What tools are we using?**

A: Normally, I don't really care what editors my colleagues use, but considering most of us have minimal to 0 experience, we should follow the same tools for a more consistent experience. These tools also have the highest market share among the dev community.

1. Everyone on the team should use VSCode. Uponing opening this project, you would be prompted to install a couple of extensions for VSCode recommended by the "workspace". You should install all of them. What they do is in their description.

2. Everyone MUST have NodeJS either 12 LTS or 14 current installed. `npm` should come along with the NodeJS installation. If you have not: https://nodejs.org/en/download/current/

**Q: What browser are we targeting?**

A: Chrome. Let us just target chrome as the sole browser to support. Supporting Safari or Edge is quite a lot of effort and huge waste of time for very little reward.

**Q: What is the difference between page and component?**

A: There is no difference in implementation, both of them are react components. The difference is in the usage. Pages are part of our application flow, things like a settings page, etc. Components on the other hand are widgets that should be reused as much as possible. Things like a tooltip or a map display widget.

**Q: Should I write functional components or class components.**

A: I don't really mind, but for consistency, we all just write functional. The code is much shorter, there is much less room for mistakes and you can use react hooks. You can read more about this topic [here (*disclaimer: its xingzhi's blog*)](https://xingzhi.dev/blog/react-functional-or-class-components/).

**Q: What is .SCSS?**

A: Just write your CSS styles in these files. I am using scss so there is a build step to ensure all of the styling code will not have any syntax errors. CSS with correct syntax will work perfectly fine here.

**Q: What are some things we do not care about?**

A: Considering this is a school project, there are things that we should straight out ignore.

1. Localization - translation or timezone for different regions
2. Mobile responsiveness - this is a good to have, but considering our users for the react app should be "experts", we should ignore this factor
3. Accessibility - normally we should try to strive to make our app accessible for the disabled, but for a tight crunch, I think we have enough on our hands

**Q: What is the utils.ts file for?**

A: The utils file contains general utilities that can be used throughout the application. Example usage:
```
/* usage for utils file */
import { generateUUID } from '../path-to-utils.js'

const uniqueID = generateUUID();
console.log('The generated UUID is '+uniqueID);

// ===========================================
/* or we can do named exports */

import { generateUUID as gimmeDatUUID } from '../path-to-utils.js'

const uniqueID = gimmeDatUUID();
console.log('Dat UUID is '+uniqueID);
```

## Instructions to CZ3003 team

You must install all recommended extensions VSCode is prompting you to install (look at the bottom right hand corner).

Upon pulling this repo, first do `npm install` at the root directory where `package.json` is located. This will install all necessary dependencies for you to work.

Then, run `npm start` to start the live dev server and start working. `Ctrl + C` in your terminal to stop the live server.

**Note:** You can commit code that is broken, but you will **not** be able to *push* code that breaks the build. Meaning if your code somehow throws an exception when we run the app, it will not be accepted. So **make sure** that every latest commit you push is working.

**Note:** You can commit broken code, so if you feel like commiting broken code so you can roll back to another snapshot or you wanna experiment with some other thing, feel free.

This also means pushing code will take a bit longer, cos it will run a simple `npm run build` to make sure most things are in order.

**Note:** If you dunno what you are doing, do not force-push. Xz will stab you.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
