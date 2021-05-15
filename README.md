# node-firebase-api
NodeJS proyect located on firebase that connect with firestore database.

# Base URL :  
https://us-central1-fir-api-4d9a5.cloudfunctions.net/app

# Test with UI :
1. Download the UI foler.
2. Unzip Public folder
3. Open index.html file on the browser.
4. With the UI:
    - You can see the users on the firestore data base.
    - Create new users.
    - Update users.
    - Delete users.

# Test with Postman
You can test the proyect with postman with the follow methods:

## User Collection

1. Get all users:
    - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/users/allUsers
    - method: GET

2. Create new user: 
    - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/users/createUser
    - Method: POST
    - Body: { name, email, password }

3. Find user:
    - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/users/findUser/:userID
    - Method: GET

 4. Delete user:
    - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/users/deleteUser/:userID
    - Method: DELETE
 
 5. Update user:
    - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/users/updateUser/:userID  
    - Method: PUT
    - Body: { name, email, password }


  ## Point Collection
  This is a subcollection inside an user.
  
  1. Create point inside an user:
      - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/subCollection/:userID/createNew
      - Method: POST
      - Body: { quantity, reason }
  
  2. Update a point inside an user 
     - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/subCollection/update/:userID/:pointID
     - Method: PUT
     - Body: { quantity, reason }

  3. Delete a point inside an user:
     - URL: https://us-central1-fir-api-4d9a5.cloudfunctions.net/app/api/subCollection/delete/:userID/:pointID 
     - Method: DELETE
