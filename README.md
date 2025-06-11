# Node.js TypeScript Express.js API

A RESTful API built with Node.js, TypeScript, and Express.js.

## Features

- TypeScript support
- Express.js for handling HTTP requests
- Environment configuration using dotenv
- CORS support
- Error handling middleware
- Organized project structure

## Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory (use `.env.example` as a template)

```
PORT=3000
NODE_ENV=development
```

## Development

To start the development server with hot-reload:

```bash
npm run dev
```

## Building for Production

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
.
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request controllers
│   ├── models/        # Data models
│   ├── routes/        # Route definitions
│   └── index.ts       # Application entry point
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## API Endpoints

- `GET /`: Welcome message
- `GET /api`: API status

## License

This project is licensed under the MIT License.
