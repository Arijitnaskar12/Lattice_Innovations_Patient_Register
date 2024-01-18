# Psychiatric Patient Registration System

A web backend for a psychiatric patient registration system. Psychiatrists can register patients through a mobile/web portal, and various functionalities are provided, including patient registration and fetching hospital details.

## Major Libraries/Frameworks Used

- **Express.js**: Used as the web framework for handling HTTP requests and routing.
- **Mongoose**: ODM library for MongoDB, used for data modeling and interactions with the database.
- **Joi**: Library for input validation.
- **Dotenv**: Library for loading environment variables.
- **Bcrypt**: Library for password hashing.
- **Nodemon**: Development utility that automatically restarts the server when changes are detected.

## API Endpoints

### Register Patient

- **Endpoint**: `/patient/registerPatient`
- **Method**: `POST`
- **Request Body**:
  - Name (String, required)
  - Address (String, required, at least 10 characters)
  - Email (String, required, valid email)
  - PhoneNumber (String, required, at least 10 numbers + country code)
  - Password (String, required, one upper, one lower, one number, 8-15 characters)
  - Photo (String, required)
  - PsychiatristId (String, required)

- **Response**: 200 OK,201 created,400 Bad Request, 404 Not Found,409 Conflict,422 Unprocessable Content,500 Internal Server Error

### Get Hospital Details

- **Endpoint**: `/hospital/getHospitalDetails`
- **Method**: `GET`
- **Request Body**:
  - HospitalId (String, required)

- **Response**: 
  - HospitalName (String)
  - PsychiatristCount (Number)
  - TotalPatientsCount (Number)
  - PsychiatristsDetails (Array)

## Postman Documentation

- [Postman Collection Link](Lattice_Patient.postman_collection.json)
## Database
  - Database Name: `lattice_patient`
  - Collections: `patients`, `hospitals`, `psychiatrists`
  - Data files for MongoDB collections:
    - [patients.json](database/patients.json)
    - [hospitals.json](database/hospitals.json)
    - [psychiatrists.json](database/psychiatrists.json)
