## Seaspan’s Font end assessment:

> The goal of this exercise is to build a React.js app that communicates with a local json API to build a couple of features.

### Getting Started:

To get going first clone this project, and then navigate into both `client` and `server`. In each run `yarn && yarn start`. Make sure to navigate your way around the port collision between the client and server apps.

Once you have the server going, you can find the server documentation at: https://seaspan.postman.co/collections/211236-3f4dff9b-26eb-fc72-9f2b-6ce473e2340d?workspace=da1653bd-d7ab-4654-8309-efe7aaf2c062#e18d53e7-7077-6c48-8c86-767bad616b4b

## Assement Aim:

The goal of this assement is to complete as many of the features defined in the acceptance criteria as possible. Do not worry about testing your code.

### Acceptance Criteria:
1. The react app should have a login page with a login form that has: 
	- name input, 
	- password input
	- and submit button.
2. Clicking submit on the login button should send a POST request to `http://localhost:3000/auth` with the body `{ 'name': 'captain', 'password': 'hook' }`. Submitting any other credentials will return `{ "error": "Incorrect credentials" }`
3.Once the JWT is returned from the `/auth` request, the react app should redirect the user to a vessels component. 

	Note: the JWT containes claims about the user which speicfy the user's `role` and `permissions`. One **very** important thing to know about this API is that the user `role` and `permissions` are randomly assigned with every `/auth` request. As such, the user `role` and `permissions` will change throughout your development. To access the claims of the JWT, you will need to decode the token. Please use this library to do so: https://www.npmjs.com/package/jwt-simple. The token secret is `"superdupersecret"`

4. On mount, vessels component should make a `GET` request to `http://localhost:3000/vessels`. 
5. The `GET` request must pass the JWT in the `Authorization` request header. If the JWT is not passed, no vessels will be returned. Instead the developer will see an error.
6. Once the json payload of vessels is returned, the react app should iterate over the vessels and display them as a list. Vessels component should also include a create new vessel form.
7. Depending on the user's role, the vessels component should show or not show the vessels list and create vessel form. The user role has three tiers: `admin`, `read-only`, `write-only`. `Admin` can read and write, `read-only` users can read info but not update it, and `write-only` users cannot see the vessels list. `Write-only` users should, however, be able to add a new vessel to the list. To recap:
	- If a user role is `Admin` they should see the list as well as an input form, allowing them to create a new vessel
	- If a user has the role `read-only`, they should only see the list of vessels and no create vessel input form
	- If a user has the role `write-only`, they should only see the create vessel form and not see the list
8. The app should allow users with write permissions to create a new vessel. The create new vessel form should consist of two input fields `name` and `size` (each field can be a string) and a submit button. 
9. Clicking on create new vessel submit button should send a POST request to `http://localhost:3000/add-vessel`. The request should consist of a JWT passed in the `Authorization` header, as well as a request body of `{"name": "your ship name", "size": "your ship size"}`. If this post is successful, the API will return the updated ist of vessels.
10. The react app should handle this response gracefully but rerendeing the list to show the new vessel, and showing a success or fail message to the user.

Bonus:

Sensible UX and UI choices. Use of color, animation, interactive feedback, form validation, and font choices will count towards the overall evaluation. 

Questions: 

Please call Alex with any questions (303-518-5032)

Tips:

We highly recommend using react router v4 for client side routing and navigation and redux for state management.