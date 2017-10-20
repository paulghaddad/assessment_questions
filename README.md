# Assessment Questions
A Repository of Questions for Pluralsight Assessments

# Project Description
This is a client-side app built with React.js. It is backed by an API built with Sinatra. You can see the live version of the app [here](https://storage.googleapis.com/react-app-pluralsight/index.html). The API is deployed on Heroku and the Client-Side app is stored on Google Cloud Platform Storage.

# Installation
To install the app:

* Clone the repo and change into the repo's directory: `cd assessment_questions`.
* Run `bundle install` from the top-level of the project. Note that Ruby 2.4.1 is used for the project.
* Run `cd client && npm i` from inside the `client` directory.
* Start the API: `ruby app/main.rb`.
* Start the webpack server: `npm run start:dev-server` (from inside the `client` directory.
* Visit `http://localhost:8080` to see the app!

# Design Decisions

The data store chosen for this application was a simple in-memory data store that persists the data. A different data store, such as Postgres, SQLite or Mongo, could easily be swapped out with the `QuestionStore` class (similar to the repository pattern. The front-end was built using React.js and styled with Bootstrap. Search/Filtering was implemented on the title or answer (a more robust solution would use a document store); sorting is based on title; and pagination was limited to 100 per page for performance.
