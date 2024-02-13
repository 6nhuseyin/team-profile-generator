# Team Profile Generator

## Description

This Node.js command-line application takes in information about employees on a software engineering team and generates an HTML webpage that displays summaries for each team member. It's designed to make managing team information easier and more accessible.

## Installation

To get started, clone this repository to your local machine and install the necessary dependencies.
git clone [\[repo\]](https://github.com/6nhuseyin/team-profile-generator)
cd team-profile-generator
npm install

## Usage

To use the application, run the following command in your terminal:
node index.js

Follow the on-screen prompts to enter the team manager's information, and then choose to add engineers, interns, or finish building your team. Once completed, the application will generate an HTML file named `team.html` in the `output` directory, displaying your team's information.

## Features

- Interactive command-line prompts using Inquirer
- Object-oriented programming with classes for Manager, Engineer, and Intern
- Unit tests for each class using Jest
- Dynamic HTML generation based on user input

## Tests

To run the unit tests for the application, use the following command:

npm run test
