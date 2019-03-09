import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* TESTS

|- GENERaAL 
Uses provided CSS and HTML
Generally matches the mockups
No syntax errors
Detailed comments
Uses create-react-app
React is in `client` folder
No console warnings about missing/unused assets
Running npm start launches the app
Global state is handled in Context API
A signIn() method is globally available that signs the user in globally..
A signOut() method is globally available that signs the user out globally.
Authentication state persists across sessions.
REST API is in `api` folder
REST API is updated for CORS
The following higher order component exists:
  PrivateRoute
The following are stateful components:
  Courses
  CourseDetail
  UserSignIn
  UserSignUp
  CreateCourse
  UpdateCourse
The following are stateless components:
  Header
  UserSignOut
  NotFound
  Forbidden
  UnhandledError
All components redirect to the /error page if the server responds with a 500.
react-router-dom is a dependency and is listed in package.json
Router is configured so that any unknown route redirects to /notfound
Clicking a link navigates to the correct Route.
The URL always reflects the current route.
The following routes exist:
  / - Courses
  /courses/create - CreateCourse
  /courses/:id/update - UpdateCourse
  /courses/:id - CourseDetail
  /signin - UserSignIn
  /signup - UserSignUp
  /signout - UserSignOut
  /notfound - NotFound
  /forbidden - Forbidden
  /error - UnhandledError

|- Components
  |- PrivateRoute
    Handles the /courses/create and /courses/:id/update routes
  |- Courses
    Courses displays a list of courses. Each course is a link to a CourseDetail page.
    Courses displays a link to the CreateCourse page.
  |- CourseDetail
    CourseDetail calls the API GET /courses/:id route and displays the results.
    CourseDetail displays an UpdateCourse and Delete Course option if the user is authenticated and owns the course.
    Displays description and materials needed values using markdown rendering.
    Redirects to /notfound if the course isn't returned from the API.
  |- UserSignIn
    UserSignIn displays a form for signing in, a submit button, and a cancel button.
    After successful sign in, routes back to the previous page the user was visiting.
    Sign In signs in.
    Cancel returns to the Courses page.
  |- UserSignUp
    UserSignUp displays a form for creating a user account, a submit button, and a cancel button.
    Sign Up button creates the user account and signs the user in.
    Cancel returns to the Courses page.
    Displays validation errors from the server.
  |- CreateCourse
    CreateCourse displays a form for creating a new course.
    Submit button creates the new course.
    Cancel returns to the Courses page.
    Displays validation errors from the server.
  |- UpdateCourse
    UpdateCourse displays a form for updating an existin course.
    Submit button calls the API put route.
    Cancel returns the user to the CourseDetail for the course.
    Displays validation errors from the server.
    Redirects to /notfound if the course isn't returned from the API.
    Redirects to the /forbidden if the user doesn't own the course.
  |- Header
    Displays sign in and sign up if user is not authenticated.
    Displays user name and sign out if user is authenicated.
  |- UserSignOut
    Signs the user out and redirects to the Courses page.
  |- NotFound
    Displays a message letting the user know the page can't be found.
  |- Forbidden
    Displays a message letting the user know the action is not allowed.
  |- UnhandledException
    Displays a message letting the user know something unexpected went wrong.
 */
