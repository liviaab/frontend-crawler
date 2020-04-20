This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is the frontend of an application used to retrieve information of specifics lawsuits from a brazilian court of justice, TJAL.

It is configured with:
- SASS
- Evergreen UI as the UI Framework for components
- Enzyme and Jest as the testing frameworks
- ESLint
- axios for HTTP requests

and uses the [Atomic Design Style Guide](https://github.com/danilowoz/react-atomic-design)

## Getting Started

Clone the repo
```sh
$ git clone https://github.com/liviaab/frontend-crawler.git
$ cd frontend-crawler
```


### Method 1 - Running on your local machine

Install the dependencies
```sh
$ yarn install
```

Run the tests
```sh
$ yarn test
```

Run the application
```sh
$ yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The backend project is [here](https://github.com/liviaab/backend-crawler)


### Method 2 - Running with `docker-compose`

```sh
$ docker-compose up --build
```

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The backend project is [here](https://github.com/liviaab/backend-crawler)


<!--
### To Do
#### Deployment
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Useful links:

https://facebook.github.io/create-react-app/docs/deployment

https://devcenter.heroku.com/articles/github-integration
-->
