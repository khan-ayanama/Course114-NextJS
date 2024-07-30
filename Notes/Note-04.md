# Part-04

## Intercepting Routes

Intercepitn routes allow you to intercept or stop the default routing behaviour to present an alternative view or component when neavigating through the UI, while still preserving the intended route for scenarios like page reloads.

This can be useful if you want to show a route while keeping the context of the current page.

`Intercepting Routes Conventions`

(.) to match segments on the same level.
(..) to match segments one level above.
(..)(..) to match segments two levels above.

## Route Handlers

We can create custom request handler for our routes using a feature called route handlers.

Unlike page routes, which respond with HTML content, route handlers allow you to create RESTful endpoints, giving you full control over the response.

There is no overhead of having to create and configure a separate server.

Route handlers are also great for making external API requests.

Route handler run server-side, ensuring that sensitive information like private keys remains secure and never gets shipped to the browser.

## Handling GET & POST Request

```ts
// data.ts
export const comments = [
  {
    id: 1,
    comment: "This is the first comment",
  },
  {
    id: 2,
    comment: "This is the second comment",
  },
  {
    id: 3,
    comment: "This is the third comment",
  },
  {
    id: 4,
    comment: "This is the fourth comment",
  },
];

// route.ts
import { comments } from "./data";

// GET Request
export async function GET() {
  return Response.json(comments);
}

// POST Request
export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    comment: comment.text,
  };

  comments.push(newComment);

  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
```

## Dynamic Route handlers

When creating dynamic route handlers it is same as like page route create a sub folder inside square brackets [id]

```tsx
import { comments } from "../data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );

  return new Response(JSON.stringify(comment));
}
```

## URL Query Parameter
