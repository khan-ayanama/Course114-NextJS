# Part-07

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

## RSC Rendering Lifecycle

For React Server Components, it's important to consider three elements: `Browser`, `Next.js` and `React`

Server Rendering Strategies:

- Static Rendering
- Dynamic Rendering
- Streaming

### Static Rendering

Static rendering is a server rendering strategy where we generate HTML pages at the time of building our application.

This approach allows the page to be build once, cached by a CDN, and served to the client almost instantly.

The optimization also enables you to share the result of the rendering work among differnt users, resulting in a significant performance boost for your application.

Static rendering is particularly useful for blog pages, e-commerce product pages, documentation, and marketing pages.

- Static rendering is default rendering strategy in the app router.
- All routes are automatically prepared at build time without additional setup.

### Production Server vs Dev Server

- For production, an optimized build is created once, and you deploy that build.
- A development server, one the other hand, focuses on the developer experience.
- We can't afford to build oru app once, make changes, rebuild, and so on.
- For productions builds, a page will be pre-rendered once when we run the build command.
- In development mode, a page will be pre-rendered for every request.

## Prefetching

Prefetchign is a technique used to preload a route in the background before the user navigates to it.

- Routes are automatically prefetched as they become visible in the user's viewport either when the page first loads or as it comes into view through scrolling.
- For static routes, the entire route is prefetched and cached by default.

When we load the homepage, Next.js prefetches the About and Dashboard routes, keeping them for instant navigation.

### Static Rendering Summary

- Static rendering is a strategy where the HTML is generated at build time.
- Along with the HTML, the RSC payload is created for each component, and Javascript chunks are produced for client-side component hydration in the browser.
- If you navigate directly to a page route, the corresponding HTML file is served.
- If you navigate to the route from a different one, the route is created on the client side using the RSC payload and javascript chunks, without any additional request to the server.
- Static rendering is great for performance and use cases includes blogs, documentation, markeing pages etc.

## Dynamic Rendering

Dynamic rendering is a server rendering strategy where routes are rendered for each user at request time.

It is useful when a route has data that is personalized to the user or contains information that can only be known at request time, such as cookies or the URL's search parameters.

News websites, personalized e-commerce pages, and social media feeds ar some example where dnamic rendering is beneficial.

### How to Dynamically Render

During rendering, if a dynamic function id discovered, Next.js will switch to dynamically rendering the whole route.

In Next.js, these dynamic functions are: `cookies()`, `headers()` and `searchParams`.

Using any of these will opt the whole route into dynamic rendering at request time.

### Dynamic rendering Summary

Dynamic rendering is a strategy where the HTML is generate at request time.

Next.js automatically switches to dynamic rendering when it comes across a dynamic function in the component, such as cookies(), headers and searchParams object.

This form of rendering is great for when we need to render HTML personalized to user, such as social media feed.

As a developer, you do not need to choose between static and dynamic rendering, Next.js will automatically choose the best rendering strategy for each route based on the features and APIs used.

## Streaming

Streaming is a strategy that allwos for progressive UI rendering from the server.

Work is divided into chunks and streamed to the client as soon as it's ready.

This enables users to see parts of the page immediately, before the entire content has finished rendering.

Streaming significantly improves both the initial page loading performance and the rendering of UI elements that rely on slower data fetches, which would otherwise block the rendering of the entire route.

Streaming is integrated into the Next.js App router by default.

## Server and Client Composition pattern

This is the section where we learn which component should be rendered as client component and which one as server component.

### Server only Code

Certain code is intended to execute only on the server.

You might have module or functions that use multiple libraries, use environment varaibles, interact directly with database, or process confidential information.

Since JS modules can be shared, it's possible for code that's meant only for the server to unintentionally end up in the client.

If server-side code gets bundled into the client-side js, it could lead to a bloated bundle size, expose secret keys, database queries, and sensitive business logic.

It is crucial to separate server-only code from client-side code to protect the application's security and integrity.

`server-only package`
Provides a build-time error if developers accidently import one of these modules into a Client Component.

`Third-party packages`
Third party packages in the ecosystem are gadually adapting, beginning to add the "use client" directive to components that rely one client-only features, marking a clear distinction in their execution environment.

Many components from npm packages, which traditionally leverage client-side features, haven't yet integrated this directive.

The absence of "use client" means that while these components will function correctly in Client Components, they may encouter issues or might not work at all withing server components.

To address this, you can wrap third party components that rely one client-only features in your own client components.

## Context Providers

Context providers are typically rendered near the root of an application to share global application state and logic.

For example, the application theme.

However, since React context is not supported in Server Components, attempting to create a context at the root of your application will result in an error.

To address this, you can create a context and render it's provider inside a separate client component.

## Client-only Code

It's importatn to restict operation of client to only client side.

Client-only code typically interacts with browser-specific features like the DOM, the window object, localStorage etc which are not available on the server.

Ensuring that such code is executed only on the client side prevents errors during server-side rendering.

To prevent unintended server side usage of client side code, we can use a package called `client-only`
