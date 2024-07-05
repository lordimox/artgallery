This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

IMAGES AND DATA USED IN THIS PROJECT ARE NOT OF MY PROPERTY.
We're using the Art Institute of Chicago public API to develop this project.
Images used follows the Art Institute of Chicago API documentation to retrieve the urls.


## Information about the project
This is a challenge project made for Driscolls.
I'm writing some comments below about what I did in the project:  

Challenge asks for a News section, but decided to consume a public API that needs no suscription or token and still showing the functionality and HTTP Requests.
I explicitly removed the .env files from .gitignore since here the API url is public and no token is needed, but still wanted to show this practice.
  
REDUX  
Instead of consuming a Database with needs of deploying an API and database, I decided to use Redux as database. The Redux store is persisted with client localStorage.
I decided to use Redux Slices to be able to use mutating states, since it uses Immer and allows this thing to happen.  
Also, declaring functions without checking action.type reduces changes of making mistakes as typo errors, and we can export those functions as slice.actions to access them outside the code and directly calling sending the payload without having to specify the event type in dispatch.  

ROUTING  
Next.js provides routing in the project through AppRouter and PageRouter.  
I used AppRouter, that consists in creating new folders inside app and every folder with a page.tsx file inside is a new route.  
I like this architecture since Next.js also allows you to declare some special components in File Conventions:  
    - Declaring a layout.tsx file inside the folder, allows you to give some layout to any page/component below this.  
    - Declaring a loading.tsx file inside the folder, allows you to set a loading screen for the content.  
    - You may declare a not-found.tsx file in every folder too, but I did not creat any new since Next.js has one as default.  
    - Declaring a folder with brackets [] gets a dynamic route, so the name you set inside the brackets for the folder will be the key for the params to get the value.  
    - Declaring a folder with double brackets and spread operator [[...key]] set a dynamic route with optional parameters, I used this to have just one component doing the view, edition and creation of users.
Landing is a Welcome Page with a link, this is to better understand the logic that Next App Router follows in case reviewer is not familiarized with it.  
  
HOOKS  
I've used several Hooks in the app, being useState and useEffect the natives from React. 
Some useEffects runs only in the first iterations while other are waiting for any change in the Redux Store.  
Since useSelector react-redux hook makes a suscription to Redux Store, the value will change an so the Users. But I needed to run some validations in case Redux Store is populated and useEffect is reached before this, so a useEffect listens to changes here.
  
CASING  
I used kebab-case for class names, so every style made is in this casing.  
As a common good practice in React, I used camelCase for variables and functions, and PascalCase for React Components.  
