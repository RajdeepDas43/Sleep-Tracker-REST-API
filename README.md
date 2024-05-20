
# Sleep Tracker API

## Overview

The Sleep Tracker API allows users to track their sleep duration and timestamps. It supports creating, retrieving, and deleting sleep records for each user.

## Features

- **POST `/api/sleep`**: Create a new sleep record.
- **GET `/api/sleep/:userId`**: Retrieve all sleep records for a given user, sorted by date.
- **DELETE `/api/sleep/:recordId`**: Delete a specific sleep record by its ID.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation Steps

1. **Clone the Repository**

    ```sh
    git clone https://github.com/RajdeepDas43/Sleep-Tracker-REST-API.git
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory of the project and add the following variables:

    ```
    DB_URI=mongodb://localhost:27017/sleep-tracker
    PORT=3000
    ```

    Adjust the `DB_URI` to match your MongoDB configuration.

4. **Run the Server**

    ```sh
    npm start
    ```

    The server will start on the port specified in the `.env` file (default is `3000`).

5. **Run Tests**

    To run the test suite, use the following command:

    ```sh
    npm test
    ```

## API Endpoints

### 1. Create a Sleep Record

- **Endpoint**: `POST /api/sleep`
- **Description**: Adds a new sleep record.
- **Request Body**:

    ```json
    {
        "userId": "string",     // MongoDB ObjectId
        "hours": "number",      // Number of hours slept
        "timestamp": "string"   // ISO 8601 format date
    }
    ```

- **Response**:

    - **201 Created**:

        ```json
        {
            "_id": "string",
            "userId": "string",
            "hours": "number",
            "timestamp": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
        ```

    - **400 Bad Request**:

        ```json
        {
            "message": "Invalid input data"
        }
        ```

### 2. Retrieve Sleep Records by User

- **Endpoint**: `GET /api/sleep/:userId`
- **Description**: Retrieves all sleep records for a given user, sorted by date.
- **Parameters**:

    - `userId`: MongoDB ObjectId of the user

- **Response**:

    - **200 OK**:

        ```json
        [
            {
                "_id": "string",
                "userId": "string",
                "hours": "number",
                "timestamp": "string",
                "createdAt": "string",
                "updatedAt": "string"
            }
        ]
        ```

    - **400 Bad Request**:

        ```json
        {
            "message": "Invalid user ID"
        }
        ```

### 3. Delete a Sleep Record

- **Endpoint**: `DELETE /api/sleep/:recordId`
- **Description**: Deletes a specific sleep record by its ID.
- **Parameters**:

    - `recordId`: MongoDB ObjectId of the sleep record

- **Response**:

    - **204 No Content**: Successfully deleted the record.

    - **404 Not Found**:

        ```json
        {
            "message": "Record not found"
        }
        ```

    - **400 Bad Request**:

        ```json
        {
            "message": "Invalid record ID"
        }
        ```

## Error Handling

The API uses consistent error handling for various scenarios:

- **400 Bad Request**: For invalid inputs or parameters.
- **404 Not Found**: For non-existing records.
- **500 Internal Server Error**: For unexpected server errors.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please open an issue on GitHub or contact the maintainer.

