## Progress logs:
2/12 - Started the project.

3/12 - Packages installed and setup was done.

4/12 - Authentication done, mongo db setup and collections were made. User registration, login and logout were setup.

5/12 - Multer was implemented and middle ware were setup


## Debugging logs:
5/12 - Fixed the issue api routes by naming them correctly.
     - Fixed the Image upload issue by importing dotenv in cloudinary.js to properly import keys.
     
7/12 - Fixed cloudinary import issue.

9/7 - Issue: Cart addition failed because the controller expected menuId but the request body was sending menuItemId, causing Menu.findById() to receive undefined.
Fix: Updated controller to use menuItemId consistently in the request body and database lookup.

10/7 - 
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




16/11 -
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



### BUG 3: Admin-only category creation API returned 401 Unauthorized even after successful admin login.

Root Cause:
The protect authentication middleware was missing from the category routes, causing adminOnly to run without req.user being set.

Resolution:
Added protect middleware before adminOnly in all admin category routes, ensuring JWT verification occurs before role validation.
