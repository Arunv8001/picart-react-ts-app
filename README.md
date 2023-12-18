# _Picart assignment Project_

    Picart assignment Project : Simple Todo Appication with React, typescript and Node js.

# SPA Features:

● The application should have at least 3 routes/pages: Home, Users and User Details Page.
● Users:

1.  Display a list of users with the following columns: Name, Email, Age, and Actions.
2.  Pagination: Limit to 10 users per page.
3.  Sort: Provide sorting options for Name and Age.
4.  Search: Include a search bar to search users by name.
    ● User Details Page:
5.  Display detailed information of a selected user: Full Name, Email, Age, Address, and Profile Picture.
6.  Provide a back button to return to the Users.
    ● The Home page should showcase some dynamic content fetched

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Setup Instruction

- Required NodeJS version 16+
- Clone repo - `git clone https://github.com/Arunv8001/picart-react-ts-app.git`
- Install dependencies - `npm install`
- Run project - `npm run dev`
- Open browser and visit http://127.0.0.1:5173/

- Build project - `npm run build`

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
