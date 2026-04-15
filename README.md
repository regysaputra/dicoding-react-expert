# OpenSpace - React Expert Project

[![Continuous Integration](https://github.com/your-username/react-expert/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/react-expert/actions/workflows/ci.yml)

OpenSpace is a forum application built with React, Redux, and Tailwind CSS. It allows users to create threads, comment on discussions, and view a leaderboard of the most active users. This project was developed as part of the "Becoming a React Web Developer Expert" course at Dicoding Academy.

## 🚀 Features

- **Authentication**: Secure Login and Register functionality
- **Thread Management**: Create new threads, view a list of threads, and filter threads by category.
- **Interactions**: Comment on threads and see the latest updates in real-time.
- **Leaderboard**: View top active users based on their engagement.
- **User Profile**: Access and view user information.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Performance**: Optimized with Vite and React 19.
- **Quality Assurance**:
  - Comprehensive Unit Testing with Jest.
  - End-to-End (E2E) testing with Cypress.
  - UI Component documentation with Storybook.
  - Automated CI/CD with GitHub Actions.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Testing**:
  - [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [Cypress](https://www.cypress.io/)
- **Component Documentation**: [Storybook](https://storybook.js.org/)
- **Linting & Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## ⚙️ Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/react-expert.git
   cd react-expert
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📖 Available Scripts

| Script              | Description                                                |
| :------------------ | :--------------------------------------------------------- |
| `npm run dev`       | Runs the app in development mode with HMR.                 |
| `npm run build`     | Builds the app for production to the `dist` folder.        |
| `npm run preview`   | Locally preview the production build.                      |
| `npm test`          | Runs unit tests with Jest and generates a coverage report. |
| `npm run e2e`       | Runs Cypress end-to-end tests in headless mode.            |
| `npm run e2e:ui`    | Opens the Cypress Test Runner.                             |
| `npm run storybook` | Starts the Storybook development server.                   |
| `npm run lint`      | Lints the project files using ESLint.                      |
| `npm run format`    | Formats the project files using Prettier.                  |
| `npm run ci:test`   | Runs both Jest and Cypress tests (used in CI).             |

## 🏗️ Project Structure

```text
.
├── .github/workflows   # GitHub Actions CI configuration
├── .storybook          # Storybook configuration
├── cypress             # Cypress E2E tests
├── public              # Static assets
├── src
│   ├── components      # Reusable UI components
│   ├── pages           # Page components
│   ├── states          # Redux slices and state management
│   ├── stories         # Storybook stories
│   ├── styles          # Global styles
│   ├── utils           # Utility functions
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
└── ...config files     # Vite, ESLint, Jest, etc.
```

## ✅ Testing

### Unit Testing

We use **Jest** and **React Testing Library** for unit and integration testing.

```bash
npm test
```

### End-to-End Testing

We use **Cypress** for E2E testing to ensure the critical paths of the application work as expected.

```bash
npm run e2e
```

## 🧪 Continuous Integration

This project uses **GitHub Actions** for CI. On every pull request to the `main` branch, the `Continuous Integration` workflow runs:

1. `npm install`
2. `npm run ci:test` (Unit tests + E2E tests)

## 👤 Author

- **Egi** - [GitHub](https://github.com/your-username)

---

Developed as part of the Dicoding Academy React Expert Course.
