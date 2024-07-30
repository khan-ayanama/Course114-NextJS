# Part-03

## Templates

Templates are similar to layouts in that they wrap each cild layout or page.

But, with templates, when a user navigates between routes that share a template, a new instance of hte component is mounted, DOM elements are recreated, state is not preserverd, and effects are re-synchronized.

A template can be defined by exporting a default React component from a template.js or template.tsx file.

Similar to layouts, templates should accept a children prop which will render the nested segments in the route.

`Order of Render:` Page --> template --> layout

## Loading

`loading.tsx`
This file allows us to create loading states that are displayed to users while specific route segment's content is loading.

The loading state appears immediately upon navigation, giving users the assuarance that the application is responsive and actively loading content.

`Benefits`

- You can display the loading state as soon as a user navigates to a new route.
- Next.js allwos the creation of shared layouts that remain interactive while new route segments are loading.

Users can continue interacting with certain parts of the application, such as a navigation menu or sidebar, even if the main content is still being fetched.

## Error

`error.tsx`

- Automatically wrap a route segment and its nested children in a React Eror boundary.
- Create error UI tailored a specific segments using the file-system heirarchy to adust granularity.
- Isolate erros to affected segments while keeping the rest of the application functional.
- Add functionality to attemp to recover from an error without full page reload.

```tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
```

### Handling Errors

- Errors bubble up to the closest parent error boundary.
- An error.tsx file will cater to erros for all its nested child segments.
- By positioning error.tsx files at different levels in the nested folders of a route, you can achieve a more granular level or error handling.

`Hanlding errors in layouts`

- An error.tsx file will handle errors for all its nested child segments.
- The error boundary does not catch errors thrown it's nested inside the layouts component.

```tsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## Parallel Routes

Parallel routes are an advanced routing mechanism that allows for the simultaneous rendering of multiple pages within the same layout.

- Parallel routes in Next.js are defined using a feature known as slots.
- Slots help structure our content in a modular fashion.
- To defina a slot, we use the `@folder` naming convention.
- Each slot is then passed as a prop to its corresponding `layout.tsx` file.
- Each slot of your dashboard can essentially function as a mini-application, complete with its own navigation and state management.

### Independent Route Handling

- Each slot of your layout, such as user, analytics or revenue metrics, can have own loading and error states.
- The granular control is particularly beneficial in scenarios where different sections of page load at varying speeds or encounter unique errors.

### Unmatched Routes

In the case of navigation withing the UI, Next.js retains the previously active state of a slot regardless of change in the URL.

Next.js immediately searches for a `default.tsx` file with in each unmatched slot.

The presence of `default.tsx` is critical, as it provides the default content that Next.js will render in the user interface.

If `default.tsx` is missing in any of the unmatched slots for the current route, Next.js will render 404 error.

`default.tsx`

- This file in Next.js serves as a fallback to render content when the framework cannot retrieve a slot's active state from the current URL.
- You have complete freedom to define the UI for unmatched routes: You can either mirror the content found in page.tsx or craft an entirely cutsom view.
