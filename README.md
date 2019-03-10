# React Course Directory

## Techdegree Unit 10

> Last one, baby.

### Running Locally
To run locally, you'll have to do a bit of configuration.

1. Make sure mongoDB is installed on your system.
2. Make sure mongo uses its default access path (`mongodb://localhost:27017`).
3. Download the repository.
4. Install npm packages, yada yada.
5. In the /api folder, use the command `npm run seed`. This will get your mongo collection ready for the app.
6. Get your mongod running.
7. In the /api folder, use `npm start`.
8. In the /client folder, use `npm start`.

### Description

A React frontend for a course directory API. The course directory API can normally be found at https://github.com/technakal/techdegree-unit-09, but for this assignment, I've also included it in this repo.

The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

 The project will require users to create an account and sign in to make changes to the database.
 
 ### Requirements
 
#### Functional Requirements
1. The user can retrieve a list of courses.
2. The user can retrieve a specific course.
3. Once the user has retrieved a course, the user can view more details about a specific course.
4. The user can create a user account.
5. The user can authenticate to their user account.
6. When the user is authenticated, the user can create a new course.
7. When {the user is authenticated} and {the user is the owner of a course}, the user can update the course details.
8. When {the user is authenticated} and {the user is the owner of a course}, the user can delete the course.

#### Technical Requirements
1. The App shall use `create-react-app` to setup the `client` folder.
2. The App shall {contain all of the code from the Course Directory API} AND {shall store the contents in a folder called `api`}.
3. The API shall allow CORS.
4. The App shall properly render Markdown on the Course_Details `description` and `materials needed` fields.

##### Stateful Components
1. The App shall use the `App.js` file as the main React component.
2. The App shall include the Courses_Component.
3. The Courses_Component shall render the list of Courses, retrieved from the `GET /api/courses` route of the API.
4. When the Authenticated_User accesses the Courses_Component, the Courses_Component shall {render a list of the Authenticated_User's Courses} AND {a list of all other Courses}.
5. When the Courses_Component renders the Course, the Course shall include a link to the Course_Detail_Component.
6. When the User is Authenticated, the Courses_Component shall allow the user to access the Create_Course_Component.
7. The App shall include the Course_Detail_Component.
8. The Course_Detail_Component shall provide details for the Course retrieved from the `GET /api/courses/:id` route.
9. When the Course_Detail_Component includes markdown-formatted content, the App shall properly format the markdown text for display. Use `react-markdown`.
9. When {the User is Authenticated} AND {the User owns the Course}, the Course_Detail_Component shall allow the User to delete the Course, accessing `DELETE /api/courses/:id/`.
10. When {the User is Authenticated} AND {the User owns the Course}, the Course_Detail_Component shall allow users to access the Update_Course_Component.
11. The App shall include the Sign_In_Component.
12. The Sign_In_Component shall allow the user to access an existing Account, accessing `GET api/users`.
13. When the User successfully signs in, the App shall route the user to the Courses_Component.
14. The Sign_In_Component shall allow a user to return to the Courses_Component without signing in.
15. When the User successfully signs in, the App shall persist their Authentication between sessions.
16. When the User successfully signs in, the App shall redirect the User back to the screen they accessed the Sign_In_Component from.
15. The App shall include the Sign_Up_Component.
16. The Sign_Up_Component shall allow the user to create a new Account.
17. When the User submits the Sign_Up_Form, the Sign_Up_Component shall access the `POST /api/users` route.
18. When the User successfully creates the Account, the App shall authenticate the User AND redirect the user to the Courses_Component.
19. The Sign_Up_Component shall allow a user to return to the Courses_Component without creating the Account.
20. The App shall include the Create_Course_Component.
21. The Create_Course_Component shall allow the user to create a new Course, accessing `POST /api/courses`.
22. When the Authenticated_User creates the Course, the App shall route the Authenticated_User to the Course_Detail_Component for the new Course, `GET /api/courses/:id`. 
23. The Create_Course_Component shall allow a user to return to the Courses_Component without creating the Course.
24. The App shall include the Update_Course_Component.
25. The Create_Course_Component shall allow the user to update the Course, accessing `PUT /api/courses`.
26. When the Authenticated_User updates the Course, the App shall route the Authenticated_User to the Course_Detail_Component for the updated Course, `GET /api/courses/:id`. 
27. The Update_Course_Component shall allow a user to return to the Course_Detail_Component without creating the Course.

##### Stateless Components
28. The App shall include the Header_Component.
29. The Header_Component shall display a navigation menu for the App.
30. When the User is not Authenticated, the Header_Component shall display a link to the Sign_In_Component AND a link to the Sign_Up_Component.
31. When the User is Authenticated, the Header_Component shall display the Authenticated_User's first and last name AND shall display the Sign_Out_Component.
32. The App shall include the Sign_Out_Component.
33. When the Authenticated_User accesses the Sign_Out_Component, the App shall {remove the User's authentication status across sessions} AND {redirect the User to the Courses_Component}.
34. The App shall include the Private_Route_Component.
35. The Private_Route_Component shall encompass the following Routes:
    1. `/courses/create`
    2. `/courses/:id/update`

#### Errors
1. When the API returns a Validation_Error, the App shall display the Error_Component.
    1. Sign_In_Component
    2. Sign_Up_Component
    3. Create_Course_Component
    4. Update_Course_Component
2. The App shall display the Not_Found_Component when the User accesses a route that doesn't exist.
    1. Course_Details_Component
    2. Update_Course_Component
    3. Delete_Course_Component
    4. Default React Router `404`
3. The App shall display the Forbidden_Component when the User accesses a route they are not authorized to access.
    1. Update_Course_Component
    2. Delete_Course_Component
4. The App shall display the Unhandled_Error_Component when any error not covered above occurs.
5. When the API responds with a 500 error, the App shall route the User to the Unhandled_Error_Component.

### Design
#### Components
##### Stateful Components
- `App`
- `Courses`
- `CourseDetails`
- `CreateCourse`
- `UpdateCourse`
- `UserSignIn`
- `UserSignUp`

##### Stateless Components
- `PrivateRoute`
- `Header`
- `UserSignOut`
- `NotFound`
- `Forbidden`
- `UnhandledError`

#### Routes
- `/` - Courses
- `/courses/create` - CreateCourse
- `/courses/:id/update` - UpdateCourse
- `/courses/:id` - CourseDetail
- `/signin` - UserSignIn
- `/signup` - UserSignUp
- `/signout` - UserSignOut
- `/notfound` - NotFound
- `/forbidden` - Forbidden
- `/error` - UnhandledError
