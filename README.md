# Companies Editor (TypeScript, React, Redux)

## Features

- select, create, update, delete(+batch delete) on Companies and Workers
- infinite scroll

Note: when infinite scroll is activated, adding new company to an empty table will trigger the creation of twenty new companies until the last table row is out of the viewport.

## Solutions

- normalized Redux state (w/ `createEntityAdapter()`) and other modern RTK patterns
- custom hooks for infinite scroll and table rows selection

## Installation

1. Clone the repository (or download ZIP):

```
git clone https://github.com/branxy/companies-editor.git
```

2. Navigate to project:

```
cd companies-editor
```

3. Install packages:

```
npm i
```

4. Start the app:

```
npm run dev
```
