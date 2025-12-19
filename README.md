## Progress logs:
2/12 - Started the project.

3/12 - Packages installed and setup was done.

4/12 - Authentication done, mongo db setup and collections were made. User registration, login and logout were setup.

5/12 - Multer was implemented and middle ware were setup


# Debugging logs:
## 5/12
     - Fixed the issue api routes by naming them correctly.
     - Fixed the Image upload issue by importing dotenv in cloudinary.js to properly import keys.
     
## 7/12 
     - Fixed cloudinary import issue.

## 9/7 
- Issue: Cart addition failed because the controller expected menuId but the request body was sending menuItemId, causing Menu.findById() to receive undefined.
Fix: Updated controller to use menuItemId consistently in the request body and database lookup.

## 10/7 - 
### Bug 1 — Invalid URL / Axios Failure

Problem:
Signup request crashed with TypeError: Failed to construct 'URL': Invalid URL.

Root Cause:
The .env variable VITE_BASE_URL included a trailing semicolon and spaces, resulting in an invalid Axios base URL and preventing requests from being constructed properly.

Resolution:
Corrected the environment variable to VITE_BASE_URL=http://localhost:5000 and restarted the Vite dev server to reload environment configs.

### Bug 2 — Toast Notifications Not Visible

Problem:
Successful registration triggered no visual feedback — toast messages were not rendered.

Root Cause:
react-hot-toast requires a globally mounted <Toaster /> component. The app was triggering toast events, but without a <Toaster /> in the component tree, nothing was displayed.

Resolution:
Mounted <Toaster /> in main.jsx (or App.jsx), enabling toast rendering across all routes.

### Bug 3 Issue:
On clicking the Logout button, a toast appeared with only a checkmark icon but no message text.

Cause:
The backend /api/auth/logout endpoint returned a successful response, but the message field was missing or empty. The frontend was calling:

toast.success(data.message);


Since data.message was undefined, the toast displayed only the success icon without text.

Fix:
Ensured that the backend logout route returns a proper message field (e.g., "Logout successful"). With a valid message present, toast.success(data.message) now renders the expected text.




## 16/11 -
### Bug 1- Jest ES Module Import Error
Problem: Jest tests failed with SyntaxError: Cannot use import statement outside a module, preventing any test execution.

Root Cause: The backend used ES Modules (type: module), but Jest was running in CommonJS mode and could not parse import/export syntax by default.

Resolution: Ran Jest with Node’s --experimental-vm-modules flag and updated the Jest configuration to support native ES Modules, enabling successful test execution and coverage reporting.

### Bug 2- Axios 401 Unauthorized on Table Booking

Problem:
Table booking requests consistently failed with 401 Unauthorized, even though form data was valid and the API endpoint was reachable.

Root Cause:
The booking API was protected by authentication middleware and required req.user, but the frontend allowed unauthenticated users to submit the booking form, resulting in missing auth credentials.

Resolution:
Implemented a frontend authentication guard to block booking submission when the user is not logged in, displayed a login prompt, and redirected users to the login page before making the API call.



### BUG 3: Admin APIs returning 401 despite successful login

Problem:
Admin-only APIs returned 401 Unauthorized even after successful authentication.

Root Cause:
JWT cookies were set with sameSite: "strict" which caused browsers to drop cookies during cross-port requests in local development. Additionally, admin JWTs lacked a role field required for authorization checks.

Resolution:
Updated cookie configuration to sameSite: "lax" for local development, corrected cookie expiration, and included role-based claims in JWT payloads to enable proper admin authorization.


### Bug 4 — Menu items not displaying in frontend

Problem:
Menu items existed in MongoDB and the backend API returned data correctly, but the Menu page showed “0 dishes” with no errors in the console.

Root Cause:
The fetchMenus() function was defined in the global AppContext but was never invoked on application load, leaving the menus state empty.

Resolution:
Called fetchMenus() inside AppContext’s useEffect to ensure menu data is fetched and populated before rendering.

### Bug 5 - Items not adding to cart
Problem: Frontend request to /api/cart/add returned 404 despite route and middleware being hit. Logs confirmed cookies and JWT were present, but controller didn’t respond correctly.

Reason: Frontend sent menuItemId while backend expected menuId in the request body. This mismatch left menuId undefined, causing Menu.findById to fail silently.

Solution: Align naming convention between frontend and backend request body fields. Updated frontend to send menuId (or backend to accept menuItemId), fixing the mismatch.


### Bug 6 - Items not deleting from the cart
Problem: Frontend request to DELETE /api/cart/remove/:id returned 404 Not Found. Logs showed route and middleware were hit, but Express couldn’t match the handler.

Reason: Backend route was defined as /remove without :menuId parameter. Controller expected req.params.menuId, causing mismatch between frontend URL and backend route.

Solution: Update route to cartRoutes.delete("/remove/:menuId", protect, removeFromCart);. This aligns frontend call /api/cart/remove/:id with backend controller logic.

Outcome: Delete request now matches correctly and returns 200 OK. Cart items are removed successfully and UI updates as expected.


## 18/12
Bug:
Backend GitHub Actions CI checks failed, blocking PR validation even though the application worked locally.

Root Cause:
CI environment lacked test-specific configuration, attempted to initialize external services, and was missing proper Jest ESM setup and required test dependencies (supertest).

Solution:
Isolated the test environment using .env.test, disabled external services during tests, configured Jest to support ES Modules, added missing dev dependencies, and enforced serial test execution, resulting in stable and passing CI checks.

## 19/12
The production frontend was blocked because backend CORS was restricted to localhost instead of allowing the deployed frontend origin.

