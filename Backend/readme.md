# name: Restaurant Management App - Backend
## description:
    Backend service for a full-stack restaurant management system built with
    Node.js, Express, and MongoDB following production-level architecture.

## tech_stack:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - HTTP-only Cookies
  - Multer
  - Cloudinary
  - Winston Logger
  - Jest
  - Supertest
  - GitHub Actions

## features:
  authentication:
    - User login and registration
    - Admin authentication
    - JWT-based auth with cookies
  authorization:
    - Role-based access control
    - Protected routes
  modules:
    - Menu management
    - Category management
    - Cart
    - Orders
    - Table bookings
  utilities:
    - Centralized error handling
    - Secure file uploads
    - Structured logging

## project_structure:
  backend:
    - controllers
    - routes
    - models
    - middlewares
    - config
    - tests
    - logs
    - index.js

## authentication_middleware:
  protect: Ensures authenticated users
  adminOnly: Restricts access to admins

## testing:
  framework: Jest
  api_testing: Supertest
  features:
    - Unit tests
    - Integration tests
    - Separate test database
    - Code coverage reporting
  commands:
    - npm run test
    - npm run test:coverage

## ci_cd:
  tool: GitHub Actions
  pipeline_features:
    - Runs tests on every push
    - Runs tests on pull requests
    - Prevents broken code from merging
    - Uses environment-based configs

## logging:
  tool: Winston
  logs:
    combined: logs/combined.log
    error: logs/error.log

## environment_variables:
  PORT: 5000
  MONGO_URI: your_mongodb_uri
  JWT_SECRET: your_secret
  CLOUDINARY_CLOUD_NAME: xxxx
  CLOUDINARY_API_KEY: xxxx
  CLOUDINARY_API_SECRET: xxxx
  NODE_ENV: development

## run_locally:
  steps:
    - npm install
    - npm run server

## deployment:
  platform: Render
  notes:
    - Production-safe configuration
    - CORS and cookies enabled for frontend
