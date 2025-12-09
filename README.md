## Progress logs:
2/12 - Started the project.
3/12 - Packages installed and setup was done.
4/12 - Authentication done, mongo db setup and collections were made. User registration, login and logout were setup
5/12 - Multer was implemented and middle ware were setup


## Debugging logs:
5/12 - Fixed the issue api routes by naming them correctly.
     - Fixed the Image upload issue by importing dotenv in cloudinary.js to properly import keys.
     
7/12 - Fixed cloudinary import issue.

9/7 - Issue: Cart addition failed because the controller expected menuId but the request body was sending menuItemId, causing Menu.findById() to receive undefined.
Fix: Updated controller to use menuItemId consistently in the request body and database lookup.
