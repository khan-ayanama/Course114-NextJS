# Part-05

## Headers in Route Handlers

HTTP headers represent the metadata associated with an API request and response.

### Request Headers

These are sent by the client, suc as a web browser, to the server. They contain essential information about the request, which helps the server understand and process it correctly.

`User-Agent:` which identifies the browser and operating system to the server.
`Accept:` which indicates the content types like text, video, or image formats that the client can process.
`Authorization:` headers used by the client to authenticate itself in the server.

```tsx
import { type NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  // Method-01 to read headers
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get("Authorization"));

  // Method-02 to read headers
  const headerList = headers();
  console.log(headerList.get("Authorization"));

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
```

## Cookies in Route Handlers

Cookies are small pieces of data that a server sends to a user's web browser.

The browser may store the cookie and sent it back to the same server with later request.

Cookies are mainly used for three purposes.

- Session management like logins and shopping carts.
- Personalization like user preference and themes.
- Tracking like recording and analyzing user behavious.

```tsx
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // Setting Cookies
  cookies().set("resultPerPage", "20");

  // Reading cookies
  const theme = request.cookies.get("theme");

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
```

## Caching in Route Handlers

## Middleware

Middleware in Next.js is a powerful feature that offers a robust way to intercept and control the flow of requests and responses within your applications.

It does this at a global level significantly enhancing features like redirection, URL rewrites, authentication, headers and cookies management and more.

Middleware allows use to specify paths where it will be active

- Custom matcher config
- Conditional statements
