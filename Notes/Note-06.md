# Part-06

## Rendering

Rendering is the process that transforms the code you write into user interfaces.

In Next.js, choosing the right time and place to do this rendering is vital for building a performant application.

## Client Side Rendering (CSR)

Client side rendering which is in React application server sends single html page and bundle of javascript which calculates the UI of an application.

### Drawbacks of CSR

`SEO`
Generating HTML that mainly contains a single div tag is not optimal for SEO, as it provides little content for search engines to index.

`Performance`

Having the browser (client) handle all the work, such as fetching data, computing the UI, and making the HTML interactive, can slow things down. Users might see a blank screen or a loading spinner while the page loads.

Each new feature added to the application increases the size of the javascript bundle, prolonging the wait time for users to see the UI.

## Server Side Rendering (SSR)

It significantly improves SEO because search engines can easily index server-rendered content.

Users can immediately see the page HTML content, instead of blank screen or loading spinner.

### Hydration

During hydration, React takes control in the browser, recontructing the component tree in memory based on the static HTML that was served.

It carefully plans the placement of interactive elements within the tree. Then, React proceeds to bind the necessary javascript logic to these elements.

This involves intializing the application state, attachign event handlers for actions such as clicks and mouseover, and setting up any other dynamic functionalities required for a fully interactive user experience.

### Server-side Solutions

1. Static Site Generation (SSG)
2. Server-side Rendering (SSR)

SSG occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesn't change often, like blog posts.

SSR, on the other hand, renders pages on demand in response to user requests, It is suitable for personalized content like social media feeds, where the HTML depends on the logged-in user.

Server side Rendering (SSR) was a significant improvement over Client-Side Rendering (CSR), it provides faster intial page loads and better SEO

### Drawbacks of SSR

1. You have to fetch everything before you can show anything.
2. You have to load everythign before you can hydrate anything.
3. You have to hydrate everything before you can interact with anything.

These issues contribute to an 'all-or-nothing' waterfall scenario, resulting in inefficiencies, especially if certain parts of you application are slower than others.

## Suspense for SSR

Use the `<Suspense>` component to unlock two major features:

1. HTML streaming on the server.
2. Selective hydration on the client.

### HTML streaming on the Server

You don't have to fetch everything before you can show something.

If a particular section delays the intial HTML, it can be seamlessly integrated into the stream later.

This is the essence of how Suspense facilitates server-side HTML streaming.

`The other challenge`
Until the JS for the main content loaded. client-side app hydration cannot start.

And if the JS bundle for the main section is large, this could significantly delay the process.

### Code splitting

Code splitting allows you to mark specific code segments as not immediately necessary for loading, signalling your bundler to segregate them into separate `<script>` tags.

Using `React.lazy` for code splitting enables you to separate the main section's code from the primary javascript bundle.

The javascript containing React and the code for the entire application, excluding to main section, can now be downloaded independently by the client, without having to wait for the main section's code.

`Selective Hydration on the Client`

- By wrapping the main section withing `<Suspense>`, you've indicated to React that it should not prevent the rest of the page from not just streaming but also from hydrating.

- This feature, called selective hydration allows for the hydration of sections as they become available, before the rest of the HTML and the Javascript code are fully downloaded.

- Thanks to Selective Hydration, a heavy piece of JS doesn't prevent the rest of the page from becoming interactive.

- Selective Hydration offers a solution to the third issue, the necessity to "hydrate everything to interact with anything".

- React begins hydrating as soon as possible, enabling interactions with elements like header and side navigation without waiting for the main content to be hydrated.

- This process is managed automatically by React.

- In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.

### Drawbacks of Suspense SSR

`First`, even though JS code is streamed to the browser asynchronously, eventually, the entire code for a web page must be downloaded by the user.

As application add more features, the amount of code users need to download also grows. This leads to an important question:
Should users really have to download so much data?

`Second`, the current approach required that all React components undergo hydration on the client-side, irrespective of their actual need for interactivity.

This process can inefficiently spend resources and extend the loading times and time to interactivity for users, as their devices need to process and render components that might not even require client-side interaction.

This leades to another question:
Should all component be hydrated, even those that don't need interactivity?

`Third`, In spite of servers superior capacity for handling intensive processing tasks, the bulk of JS execution still takes place on the user's device.

This can slow down the performance, especially on devices that are not very powerful.

This leads to another important question:
Should so much of the work be done on the user's device?

## React Server Components (RSC)

RSC represents a new architecture designed by the React Team.

This approach aims to leverage the strengths of both server and client environments, optimizing for efficiency, load times, and interactivity.

The acrchitectuer introduces a dual-component model.

- Client Components
- Server Components

### Client Components

- They are typically rendered on the client-side (CSR) but, they can also be rendered to HTML on the SSR, allowing users to immediately see the page's HTML content rather than a blank screen.
- Components that primarily run on client but can and should also be excuted once on the server as an optimzing strategy.
- Client components have access to client environment such as `use State`, `event listeners` etc.

### Server Components

- Server component operate exclusively on server.
- It's code stays on serer and never downloaded on client.

`Benefits of Server Components`

- Reduced bundle size.
- Direct Access to Server-side Resources.
- Enhanced Security.
- Improved Data fetching.
- Caching improves
- Faster Initial page load and first contentful paint
- Improved SEO

### Summary

- RSC architecture and by extension in the Next.js app router, components are server components by default.
- To use client components, you much include the use client directive at the top.
- Server components are rendered only on the server.
- Client component are rendered once on the server and then on the client.
