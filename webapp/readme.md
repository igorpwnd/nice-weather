# Weather App Frontend

This is the frontend for the Weather App built with:

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

To run the frontend application, follow these steps:

1. Clone the repository to your local machine.
2. Ensure you have Node.js and npm installed.

## Running the Application

1. Navigate to the frontend directory:

```bash
cd webapp
```

2. Install the required dependencies:

```bash
npm install
````

3. Start the development server:

```bash
npm run dev
```

The frontend will be set up and available after this command completes.

## Accessing the Application

- Open your browser and go to `http://localhost:5173`.
- You can type directly the city name or click the pin button to use JS's geolocation API.


## Improvements

In this project, several improvements have been implemented to enhance code quality and maintainability:

- **Prettier**: Integrated to enforce consistent code formatting across the project.
- **ESLint**: Added for identifying and fixing problems in JavaScript code, ensuring adherence to best practices.
- **Git Hooks**: Utilized to enforce quality gates, allowing for checks before commits and pushes.
- **Aliases**: Implemented to simplify and fix import statements, improving the readability and structure of the code.
-- **Test**: I was going to implement tests with @testing-library + vitest, but got short on time.

These enhancements contribute to a cleaner and more efficient development experience.

## Project Limitations

This project has a simple flaw related to the city search functionality. The API query directly searches for cities by name, which can lead to inaccuracies since many cities share the same name across different countries. This repetition can cause confusion for users, as searching for a city like "Springfield" may return results from multiple locations without additional context. Enhancements to the search functionality, such as including geographical filters or additional parameters, could improve the accuracy of search results.