# shareoh-backend
backend for the shareoh app

# How to run?
- Checkout to dev branch
- npm install
- npm start

# changelog
- Configured Nodemon.
- Added the routes for user collection along with schema.

# Route Details

## User Collection

1.  Register a New User

    -   Route: `POST /register`
    -   Description: This route is used to register a new user.

    Sample Usage:

    httpCopy code

    `POST /register
    Content-Type: application/json

    {
      "username": "new_user",
      "email": "newuser@example.com",
      "password": "password123",
      "role": "user",
      "profile_picture": "profile.jpg",
      "location": "New York",
      "bio": "A new user's bio."
    }`

2.  User Login

    -   Route: `POST /login`
    -   Description: This route is used for user authentication and login.

    Sample Usage:

    httpCopy code

    `POST /login
    Content-Type: application/json

    {
      "email": "newuser@example.com",
      "password": "password123"
    }`

    This request will return a JSON Web Token (JWT) if the login is successful.

3.  Admin-Protected Route

    -   Route: `GET /admin-protected`
    -   Description: This route is protected and requires admin authorization.

    Sample Usage: To access this route, you need to include the JWT obtained after login in the `Authorization` header of your request.

    httpCopy code

    `GET /admin-protected
    Authorization: Bearer your-jwt-token`

    If the user associated with the token has the `admin` role, they will be granted access; otherwise, an access denied error will be returned.

4.  Get a List of All Users

    -   Route: `GET /all`
    -   Description: This route retrieves a list of all registered users.

    Sample Usage:

    httpCopy code

    `GET /all`

5.  Get a Specific User by ID

    -   Route: `GET /users/:id`
    -   Description: This route retrieves a specific user by their unique ID.

    Sample Usage:

    httpCopy code

    `GET /users/your-user-id`

6.  Update a User by ID

    -   Route: `PUT /users/:id`
    -   Description: This route updates a specific user's information by their unique ID.

    Sample Usage:

    httpCopy code

    `PUT /users/your-user-id
    Content-Type: application/json

    {
      "username": "updated_username",
      "location": "Updated Location"
    }`

7.  Delete a User by ID

    -   Route: `DELETE /users/:id`
    -   Description: This route deletes a specific user by their unique ID.

    Sample Usage:

    httpCopy code

    `DELETE /users/your-user-id`