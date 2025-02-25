# SocJobs Backend
Backend service for SOC job application and search platform.

## API Endpoints
Description, Input, and Output for every API endpoint.

### Table of Contents
- [Auth Routes](#auth-routes)
  - [POST /auth/login](#post-authlogin)
  - [POST /auth/register](#post-authregister)
  - [POST /auth/admin-register](#post-authadmin-register)
  - [POST /auth/logout](#post-authlogout)
  - [POST /auth/reset](#post-authreset)
  - [POST /auth/reset/{token}](#post-authresettoken)
  - [POST /auth/verify/{token}](#post-authverifytoken)
  - [GET /auth/google](#get-authgoogle)
  - [GET /auth/google/callback](#get-authgooglecallback)
  - [GET /auth/google/protected](#get-authgoogleprotected)
  - [GET /auth/google/success/{token}](#get-authgooglesuccesstoken)
  - [GET /auth/google/failure](#get-authgooglefailure)
  - [GET /auth/google/test](#get-authgoogletest)

- [User Routes](#user-routes)
  - [GET /user](#get-user)
  - [GET /user/profile](#get-userprofile)
  - [GET /user/profile/{id}](#get-userprofileid)
  - [PUT /user/profile/{id}](#put-userprofileid)
  - [GET /user/application/{id}](#get-userapplicationid)
  - [GET /user/application](#get-userapplication)
  - [POST /user/avatar](#post-useravatar)
  - [POST /user/cv](#post-usercv)

- [Job Routes](#job-routes)
  - [GET /job](#get-job)
  - [GET /job/{id}](#get-jobid)
  - [POST /job](#post-job)
  - [PUT /job/{id}](#put-jobid)
  - [DELETE /job/{id}](#delete-jobid)
  - [GET /job/application/{id}](#get-jobapplicationid)
  - [GET /job/application](#get-jobapplication)

- [Application Routes](#application-routes)
  - [GET /application](#get-application)
  - [GET /application/{id}](#get-applicationid)
  - [POST /application](#post-application)
  - [PUT /application/{id}](#put-applicationid)
  - [DELETE /application/{id}](#delete-applicationid)

- [Position Routes](#position-routes)
  - [GET /position](#get-position)

- [Job Type Routes](#job-type-routes)
  - [GET /jobType](#get-jobtype)

- [Experience Routes](#experience-routes)
  - [GET /experience](#get-experience)


### Auth Routes
1. **POST /auth/login**
   - **Description:** Authenticates a user and returns a JWT token.
   - **Input:** 
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Login success",
       "token": "string",
       "name": "string"
     }
     ```

2. **POST /auth/register**
   - **Description:** Registers a new user and sends a verification email.
   - **Input:** 
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Verification email sent"
     }
     ```

3. **POST /auth/admin-register**
   - **Description:** Registers a new admin user and sends a verification email.
   - **Input:** 
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Verification email sent"
     }
     ```

4. **POST /auth/logout**
   - **Description:** Logs out the user.
   - **Output:**
     ```json
     {
       "message": "Logout success"
     }
     ```

5. **POST /auth/reset**
   - **Description:** Sends a password reset email.
   - **Input:** 
     ```json
     {
       "email": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Password reset email sent"
     }
     ```

6. **POST /auth/reset/{token}**
   - **Description:** Resets the user's password using the provided token.
   - **Input:** 
     ```json
     {
       "password": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Password reset success"
     }
     ```

7. **POST /auth/verify/{token}**
   - **Description:** Verifies the user's email and completes the registration.
   - **Input:** 
     ```json
     {
       "gender": "string",
       "address": "string",
       "contact": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Register and email verification success",
       "token": "string",
       "name": "string"
     }
     ```

8. **GET /auth/google**
   - **Description:** Redirects to the Google login page.
   - **Output:** Redirect to Google login page

9. **GET /auth/google/callback**
   - **Description:** Handles the callback from Google after authentication.
   - **Output:** Redirect to `/auth/google/success/{token}`

10. **GET /auth/google/protected**
    - **Description:** Endpoint called after successful Google authentication.
    - **Output:**
      ```json
      {
        "message": "Login success",
        "token": "string"
      }
      ```

11. **GET /auth/google/success/{token}**
    - **Description:** Endpoint called after successful Google authentication.
    - **Output:**
      ```json
      {
        "message": "Login success",
        "token": "string"
      }
      ```

12. **GET /auth/google/failure**
    - **Description:** Endpoint called when Google authentication fails.
    - **Output:**
      ```json
      {
        "message": "Failed to login"
      }
      ```

13. **GET /auth/google/test**
    - **Description:** Test endpoint for authentication with Google.
    - **Output:** HTML link to authenticate with Google

### User Routes

1. **GET /user**
   - **Description:** Retrieves all users.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Users",
       "data": [...]
     }
     ```

2. **GET /user/profile**
   - **Description:** Retrieves the profile of the authenticated user.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting User",
       "data": {...}
     }
     ```

3. **GET /user/profile/{id}**
   - **Description:** Retrieves the profile of a user by ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting User",
       "data": {...}
     }
     ```

4. **PUT /user/profile/{id}**
   - **Description:** Updates the profile of a user by ID.
   - **Input:** 
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string",
       "avatar": "string",
       "gender": "string",
       "address": "string",
       "contact": "string",
       "cv": "string",
       "role": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success updating User",
       "data": {...}
     }
     ```

5. **GET /user/application/{id}**
   - **Description:** Retrieves all applications of a user by user ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Applications",
       "data": [...]
     }
     ```

6. **GET /user/application**
   - **Description:** Retrieves all applications of the authenticated user.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Applications",
       "data": [...]
     }
     ```

7. **POST /user/avatar**
   - **Description:** Uploads a profile picture for the authenticated user.
   - **Input:** Form-data with `avatar` file
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Profile picture uploaded successfully.",
       "avatarPath": "string"
     }
     ```

8. **POST /user/cv**
   - **Description:** Uploads a CV for the authenticated user.
   - **Input:** Form-data with `cv` file
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "CV uploaded successfully.",
       "cvPath": "string"
     }
     ```

### Job Routes

1. **GET /job**
   - **Description:** Retrieves all jobs.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Jobs",
       "data": [...]
     }
     ```

2. **GET /job/{id}**
   - **Description:** Retrieves a job by ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Job",
       "data": {...}
     }
     ```

3. **POST /job**
   - **Description:** Creates a new job.
   - **Input:** 
     ```json
     {
       "title": "string",
       "job_desc": "string",
       "requirement": "string",
       "logo": "string",
       "quota": "number",
       "applicant": "number",
       "expId": "number",
       "typeId": "number",
       "positionId": "number",
       "closedAt": "date"
     }
     ```
   - **Output:**
     ```json
     {
       "code": 201,
       "status": "Created",
       "message": "Success creating Job",
       "data": {...}
     }
     ```

4. **PUT /job/{id}**
   - **Description:** Updates a job by ID.
   - **Input:** 
     ```json
     {
       "title": "string",
       "job_desc": "string",
       "requirement": "string",
       "logo": "string",
       "quota": "number",
       "applicant": "number",
       "expId": "number",
       "typeId": "number",
       "positionId": "number",
       "closedAt": "date"
     }
     ```
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success updating Job",
       "data": {...}
     }
     ```

5. **DELETE /job/{id}**
   - **Description:** Deletes a job by ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success deleting Job"
     }
     ```

6. **GET /job/application/{id}**
   - **Description:** Retrieves all applications for a job by job ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Applications",
       "data": [...]
     }
     ```

7. **GET /job/application**
   - **Description:** Retrieves all applications for all jobs.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Applications",
       "data": [...]
     }
     ```

### Application Routes

1. **GET /application**
   - **Description:** Retrieves all applications.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Applications",
       "data": [...]
     }
     ```

2. **GET /application/{id}**
   - **Description:** Retrieves an application by ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Application",
       "data": {...}
     }
     ```

3. **POST /application**
   - **Description:** Creates a new application.
   - **Input:** 
     ```json
     {
       "userId": "number",
       "jobId": "number",
       "status": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "code": 201,
       "status": "Created",
       "message": "Success creating Application",
       "data": {...}
     }
     ```

4. **PUT /application/{id}**
   - **Description:** Updates an application by ID.
   - **Input:** 
     ```json
     {
       "status": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success updating Application",
       "data": {...},
       "emailStatus": "string"
     }
     ```

5. **DELETE /application/{id}**
   - **Description:** Deletes an application by ID.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success deleting Application"
     }
     ```

### Position Routes

1. **GET /position**
   - **Description:** Retrieves all positions.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Positions",
       "data": [...]
     }
     ```

### Job Type Routes

1. **GET /jobType**
   - **Description:** Retrieves all job types.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Job Types",
       "data": [...]
     }
     ```

### Experience Routes

1. **GET /experience**
   - **Description:** Retrieves all experiences.
   - **Output:**
     ```json
     {
       "code": 200,
       "status": "OK",
       "message": "Success getting Experiences",
       "data": [...]
     }
     ```
