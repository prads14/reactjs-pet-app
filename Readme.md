# Create Package JSON file

npm init -y

this will create empty package.json file but no specific ddetails about other installations

# Install prettier for code reading

npm install --global prettier

# Install ES lint and its setup

npm install -D eslint@8.24.0 eslint-config-prettier@8.5.0

add below details in .eslintrc.json file.
{
"extends": ["eslint:recommended", "prettier"],
"plugins": [],
"parserOptions": {
"ecmaVersion": 2022,
"sourceType": "module",
"ecmaFeatures": {
"jsx": true
}
},
"env": {
"es6": true,
"browser": true,
"node": true
}
}

# Write gitignore file

add below details to .gitignore file

node_modules
dist/
.env
.DS_Store
coverage/
.vscode/

# install vite server to run the application

npm install -D vite@3.1.4 @vitejs/plugin-react@2.1.0

Also update vite.config.js file as below.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()],
root: "src",
});

# ES lint configurations for website

npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8

configurations

.eslintrc.json

npm install -D eslint-plugin-react-hooks@4.6.0

# Setting up the react router

npm install react-router-dom@6.4.1.

# interesting stuff react query

npm install @tanstack/react-query@4.10.1

# installing tailwindCSS

npm i -D tailwindcss@3.1.8 postcss@8.4.18 autoprefixer@10.4.12

for creating configuration files
npx tailwindcss init -p
npm install -D @tailwindcss/forms@0.5.3

Update tailwind.config

# install react Redux

npm install @reduxjs/toolkit@1.8.6 react-redux@8.0.4
