# MyDocDay

A minimal Next.js App Router project with TypeScript, Tailwind CSS, and
Storybook.

Install dependencies and start Next.js:

```sh
npm install
npm run dev
```

Start Storybook:

```sh
npm run storybook
```

Create a production build with `npm run build`, or build the static Storybook
with `npm run build-storybook`.

## Layout utilities

`container` and `container-fluid` provide responsive centered and full-width
containers. Use `row` with `col`, `col-1` through `col-12`, and Tailwind
responsive variants such as `md:col-6` to build a
12-column layout. Gutters default to `1.5rem` and can be changed with an
arbitrary CSS property utility such as `[--gutter-x:2rem]`.
