# Interview Scheduler

Hello!

This is a simple React JS application deployed on [**Netlify**](https://scheduler-as.netlify.app) that allows users to book and cancel interviews. The app connects to a concise [**API**](https://github.com/aliyasser20/scheduler-api) with a WebSocket server to build a realtime experience. This app also focuses on unit, integration and E2E testing.

## Technologies

* React JS
* HTML
* SASS
* CSS
* Axios JS
* Webpack
* NPM
* Storybook
* Jest
* Cypress
* React Testing Library

## App Preview

![scheduler](./docs/scheduler.png)

---

### Book new appointment

![add](./docs/add.gif)

---

### Edit appointment

![edit](./docs/edit.gif)

---

### Delete appointment

![edit](./docs/delete.gif)


## Dependencies

A **package.json** file has been set up with all the dependencies needed for this app:

```json
{
  "name": "scheduler",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:8001",
  "dependencies": {
    "axios": "^0.19.2",
    "classnames": "^2.2.6",
    "lodash": "^4.17.15",
    "normalize.css": "^8.0.1",
    "prop-types": "^15.7.2",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "storybook": "start-storybook -p 9009 -s public --ci",
    "build-storybook": "build-storybook -s public",
    "cypress": "cypress open -P ."
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^3.2.1",
    "babel-eslint": "^9.0.0",
    "babel-loader": "^8.0.5",
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.1",
    "eslint-config-prettier": "^4.3.0",
    "eslint-config-wesbos": "0.0.19",
    "eslint-plugin-cypress": "^2.10.3",
    "eslint-plugin-html": "^5.0.5",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-prettier": "^3.1.2",
    "eslint-plugin-react": "^7.19.0",
    "eslint-plugin-react-hooks": "^1.7.0",
    "node-sass": "^4.11.0",
    "prettier": "^1.19.1",
    "react-test-renderer": "^16.13.1"
  },
  "jest": {
    "watchPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/.git/"
    ],
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/index.js"
    ]
  }
}
```

## Run Locally

1. Clone git repository
2. Install all dependencies using `npm install`
3. Run the development web server using the `npm start`

---

**Note**: This app was created for demo purposes only.
