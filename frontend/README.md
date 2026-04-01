# name: Restaurant Management App - Frontend
## description: 
    Frontend of a full-stack restaurant management application built using React.
    Provides a responsive and role-based UI for users and admins.

## tech_stack:
  - React.js
  - Context API
  - React Router
  - Axios
  - Tailwind CSS
  - React Hot Toast

## features:
### user:
    - User authentication (login/logout)
    - Browse menu and categories
    - Add and remove items from cart
    - Table booking
    - Place orders
    - Protected routes
### admin:
    - Admin authentication
    - Menu CRUD operations
    - Category management
    - View orders and bookings
    - Role-based UI rendering

## project_structure:
### src:
    - components
    - pages
    - context
    - services
    - utils
    - App.jsx
    - main.jsx

## state_management:
  ### type: Context API
  ### stores:
    - Auth state
    - Cart state
    - Axios instance
    - Navigation helpers

## api_integration:
  communication: REST APIs
  client: Axios
  base_url: Environment based

## environment_variables:
  VITE_BASE_URL: http://localhost:5000

## run_locally:
  ### steps:
    - npm install
    - npm run dev

## notes:
  - Backend must be running
  - Uses cookie-based authentication
  - Fully responsive design
