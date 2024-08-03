# Part-08

## Data Fetching in App Router

App router uses the React Server Components (RSC) architecture, which allows us to fetch data using either server components or client components.

It's advantageous to fetch data using server components, as they have direct access to server-side resources such as databases or file systems.

This not only taps into the server's computational power and proximity to data sources for efficient data fetching and rendering but also minimizes the need for client-side processing.

We will explore data fetching techniques using both server and client components in Next.js

Server components support various configuration for caching, revalidating, and optimizing data fetching.

On the client side, data fetching is typically managed through third-party libraries such as Tanstack Query which offers its own robust APIs.

## Fetching Data with Server Components

The RSC architecture in the app router introduces support of async and await keywords in server components.

This allows you to use the familiar javascript await syntax by defining you component as an asynchronous function.

```tsx
// Users.tsx
export default async function UsersPage() {
  const response = await fetch("https://example.com");
  const users = await response.json();

  return (
    {users.map(user=>(
      <div key={user.id}>
      <h2>{user.name}</h2>
      </div>
    ))}
  )
}
```

### Loading and Error States

Traditionally in React, you might manage these states by creating separate variables and conditionally rendering UI based on their values.

To implement a loading state, define and export a React component in `loading.tsx`

For handling errors, define and export a React component in `error.tsx`
