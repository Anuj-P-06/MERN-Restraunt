# Full-Stack Restaurant Management System
##  stack: MERN
##  description:
    A production-style full-stack restaurant management application built using
    the MERN stack. The project demonstrates real-world development practices
    including authentication, authorization, testing, CI/CD, logging, debugging,
    and deployment.

## frontend:
  ### tech_stack:
    - React.js
    - Context API
    - Tailwind CSS
    - Axios
    - React Hot Toast
  ### responsibilities:
    - UI rendering
    - Global state management
    - API consumption
    - Role-based UI (User/Admin)
    - Client-side auth guards

## backend:
  ### tech_stack:
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
  ### responsibilities:
    - REST API development
    - Authentication & authorization
    - Business logic
    - Database operations
    - Testing & logging
    - CI/CD integration

## features:
  ### user:
    - User authentication
    - Browse menu and categories
    - Cart management
    - Order placement
    - Table booking
 ### admin:
    - Admin authentication
    - Menu CRUD operations
    - Category management
    - Order management
    - Booking management
    - Role-based API access

### security:
  - JWT authentication
  - HTTP-only cookies
  - Role-based authorization
  - Protected backend routes
  - Environment-based secrets

## how_to_run:
  ### frontend:
    steps:
      - Navigate to frontend directory
      - npm install
      - npm run dev
 ### backend:
    steps:
      - Navigate to backend directory
      - npm install
      - npm run server

### admin_panel:
  - access:
    - description: >
      - Admin panel is accessed using an admin account.
      - Admin privileges are determined via role-based JWT claims.
    - steps:
      - Login using admin credentials
      - Admin-only routes and UI components become accessible
      - Admin can manage menu, categories, orders, and bookings
  - protection:
    - Admin-only middleware on backend
    - Role-based conditional rendering on frontend

## testing_and_quality:
  ### backend_testing:
    tools:
      - Jest
      - Supertest
    features:
      - Unit tests
      - Integration tests
      - Separate test database
      - Code coverage reporting
  ## ci_cd:
    tool: GitHub Actions
    pipeline:
      - Runs tests on push
      - Runs tests on pull requests
      - Blocks merge on failure
      - Uses test-specific environment variables

## logging_and_monitoring:
  - tool: Winston
  - logs:
    - combined: logs/combined.log
    - error: logs/error.log
  - purpose:
    - Debugging
    - Error tracking
    - Production diagnostics

## debugging_logs:
  - "05-12":
    - Fixed API route issues caused by incorrect route naming
    - Fixed Cloudinary image upload by importing dotenv correctly

  - "07-12":
    - Fixed Cloudinary import issue

  - "09-07":
    - issue: Cart addition failed due to mismatched request body field
    - cause: Backend expected menuId while frontend sent menuItemId
    - fix: Standardized field naming across frontend and backend

  - "10-07":
    - bug_1:
      - title: Invalid URL / Axios Failure
      - cause: Trailing semicolon and spaces in VITE_BASE_URL
      - fix: Corrected env variable and restarted Vite server
    - bug_2:
      - title: Toast notifications not visible
      - cause: Missing <Toaster /> component
      - fix: Mounted <Toaster /> globally
    - bug_3:
      - title: Logout toast missing message
      - cause: Backend logout response missing message field
      - fix: Returned proper success message from backend

  - "16-11":
    - bug_1:
      - title: Jest ES Module import error
      - cause: Jest running in CommonJS while backend used ES Modules
      - fix: Enabled experimental VM modules and updated Jest config
    - bug_2:
      - title: 401 Unauthorized on table booking
      - cause: Booking API protected but frontend allowed unauthenticated access
      - fix: Added frontend auth guard and redirect to login
    - bug_3:
      - title: Admin APIs returning 401 after login
      - cause:
        - sameSite strict cookies dropped in cross-port requests
        - Missing role in JWT payload
      - fix:
        - Updated sameSite to lax for local dev
        - Added role-based claims to JWT
    - bug_4:
      - title: Menu items not displaying
      - cause: fetchMenus() not invoked on app load
      - fix: Called fetchMenus() inside AppContext useEffect
    - bug_5:
      - title: Items not adding to cart
      - cause: menuItemId vs menuId mismatch
      - fix: Aligned request body naming
    - bug_6:
      - title: Items not deleting from cart
      - cause: Backend route missing :menuId param
      - fix: Updated route to /remove/:menuId

  - "18-12":
    - issue: GitHub Actions CI failing
    - cause:
      - Missing test env config
      - External services initialized during tests
      - Missing Jest ESM support
    - fix:
      - Added .env.test
      - Disabled external services in tests
      - Configured Jest for ES Modules
      - Installed missing dev dependencies

  - "19-12":
    - issue: Production frontend blocked by CORS
    - cause: Backend CORS restricted to localhost
    - fix: Allowed deployed frontend origin in CORS config

## screenshots_and_media:
  - structure:
    - screenshots/homepage.png
    - screenshots/menu.png
    - screenshots/cart.png
    - screenshots/admin-dashboard.png
    - screenshots/booking.png

## deployment:
  - backend:
    - platform: Render
  - frontend:
    - platform: Render
    - configuration: Environment-based API URL

## repository_structure:
  - root:
    - frontend
    - backend
    - README.md

## learning_outcomes:
  - Real-world MERN architecture
  - Debugging complex production issues
  - Authentication & authorization flows
  - CI/CD with GitHub Actions
  - Logging and monitoring
  - Deployment readiness

## ideal_for:
  - MERN stack interviews
  - Full-stack developer roles
  - Backend-heavy evaluations
