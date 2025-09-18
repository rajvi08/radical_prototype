# React with TypeScript - Getting Started Tutorial

This tutorial will guide you through setting up a basic React application using TypeScript from scratch.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (optional)
- A code editor like **VS Code** (recommended)

## What is Node.js?

**Node.js** is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It's built on Chrome's V8 JavaScript engine and is essential for modern web development because it:

- **Enables server-side JavaScript**: Run JavaScript on your computer/server
- **Provides package management**: Use npm (Node Package Manager) to install libraries and tools
- **Powers build tools**: Create React apps, bundlers, and development servers
- **Supports modern development**: Hot reloading, TypeScript compilation, and more

### Why do we need Node.js for React?

React applications need to be:
1. **Compiled**: JSX and TypeScript need to be converted to regular JavaScript
2. **Bundled**: Multiple files need to be combined into optimized bundles
3. **Served**: A development server is needed to run your app locally
4. **Built**: Production-ready files need to be generated

Node.js provides all these capabilities through various tools and packages.

## Installing Node.js

### Method 1: Official Installer (Recommended)

1. **Visit the official website**: Go to [nodejs.org](https://nodejs.org/)
2. **Download the LTS version**: Click the green "LTS" button (Long Term Support)
3. **Run the installer**: 
   - **Windows**: Download the `.msi` file and run it
   - **macOS**: Download the `.pkg` file and run it
   - **Linux**: Download the appropriate package for your distribution
4. **Follow the installation wizard**: Accept the license agreement and use default settings
5. **Restart your terminal/command prompt** after installation


## Verifying Your Installation

After installing Node.js, verify that everything is working correctly:

### Step 1: Check Node.js Version
Open your terminal/command prompt and run:

```bash
node --version
```

**Expected output**: `v18.x.x` or higher (version numbers may vary)

### Step 2: Check npm Version
```bash
npm --version
```

**Expected output**: `9.x.x` or higher (npm comes bundled with Node.js)

### Step 3: Check Installation Path
```bash
# Windows
where node
where npm

# macOS/Linux
which node
which npm
```

**All checks should pass before proceeding with React TypeScript setup.**

## Method 1: Using Create React App (Recommended for Beginners)

### Step 1: Create a New React App with TypeScript

Open your terminal/command prompt and run:

```bash
npx create-react-app my-react-ts-app --template typescript
```

This command will:
- Create a new React application
- Set up TypeScript configuration
- Install all necessary dependencies
- Create a basic project structure

### Step 2: Navigate to Your Project

```bash
cd my-react-ts-app
```

### Step 3: Start the Development Server

```bash
npm start
```

Your app will open in the browser at `http://localhost:3000`

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Create React App Documentation](https://create-react-app.dev/docs/adding-typescript/)

Happy coding! 🚀
