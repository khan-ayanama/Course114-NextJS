# Part-01

## Introduction

Nextjs helps creating an application without worrying about configuration.

## Main features of NextJS

`Routing`: File-system based router build on top of Server Component.
`Data Fetching`: Extended fetch api for request memoization, data caching and revalidation.
`Styling`
`Optimizations`: Improves Core Web Vitals.
`Typescript`: Improved support for TS.

## App Router vs Page Router

App router is newer version use it to build your applications.

## Installation

```bash
npx create-next-app@latest
```

Application first renders `layout.tsx` -> `page.tsx` first.

## React Server Components

- In Next.js all components are Server components by default.
- They have ability to run task like reading or fetching data from database.
- However they don't have ability to use hooks or handle user interactions.

## Client Components

To creat client components, it's necessary to add "use client" at the top of file.

## Routing

Next.js has a file based routing mechanism.

URL paths that users can acess in the browser are defined by files and folders in codebase.

### Routing Conventions

- All routes must be placed inside app folder.
- Every file that corresponds to a route must be named `page.js` or `page.tsx`.
- Every folder corresponds to a path segement in the browser URL.

For URL like `localhost:3000/about` this url will access the file file inside the app folder.

`Nested Routes`

If you want a nested route put the folder inside the folder and create a file name `page.tsx` inside the folder.

`Dynamic Routes`
When you want to access dynamic route create a dynamic folder route inside the square bracket and that folder will act as dynamic page, page can be look like this.

```tsx
type ParamsProp = {
  params: { productId: string };
};

export default function ProductDetails({ params }: ParamsProp) {
  return (
    <div>
      <h2>Details of Product of id: {params.productId}</h2>
    </div>
  );
}
```

`Nested Dynamic Routes`
If you want dynamic route inside dynamic route like `localhost:3000/product/1/review/1`
then create a folder inside [productId] named review and then inside it create new folder [reviewId] and inside it create `page.tsx`

```tsx
export default function ReviewDetails({
  params,
}: {
  params: {
    productId: string;
    reviewId: string;
  };
}) {
  return (
    <div>
      <h1>
        Review {params.reviewId} for product {params.productId}
      </h1>
    </div>
  );
}
```

### Catch All Segments

if you want to access any route after certain route you can use [...slug] folder inside that folder and create a `page.tsx` inside that folder.

For Example: if you want to access,
`docs/feature1/concept1`
`docs/feature2/concept1`
`docs/feature1/concept14`
`docs/feature14/concept10`

- When you're using [...slug] the route `localhost:3000/docs` will be inaccessible if you want to use that route wrap slug folder in two square bracket [[...slug]]

```tsx
export default function Docs({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  if (params.slug?.length === 2) {
    return (
      <h1>
        Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}
      </h1>
    );
  } else if (params.slug?.length === 1) {
    return <h1>Viewing docs for feature {params.slug[0]}</h1>;
  }

  return <h1>Docs Home Page</h1>;
}
```

## Not Found

Create a file name `not-found.tsx` and this will render when requested route or page is not found.

When you want to conditionally render `not-found.tsx` page conditionally

```tsx
import { notFound } from "next/navigation";

export default function Docs({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  console.log(params);

  if (params.slug?.length > 2) {
    notFound();
  }
  if (params.slug?.length === 2) {
    return (
      <h1>
        Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}
      </h1>
    );
  } else if (params.slug?.length === 1) {
    return <h1>Viewing docs for feature {params.slug[0]}</h1>;
  }

  return <h1>Docs Home Page</h1>;
}
```
