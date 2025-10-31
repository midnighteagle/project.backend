// Define a class called ApiResponse — used to send consistent API responses
class ApiResponse {

    // The constructor runs automatically when we create a new ApiResponse object
    constructor (statusCode, message, data = "Success") {

        // ✅ Store the HTTP status code (e.g., 200, 201, 404, 500)
        this.statusCode = statusCode;

        // ✅ Store the message describing the result (e.g., "User created", "Not found")
        this.message = message;

        // ✅ Store the data we want to send back (e.g., user info, list, etc.)
        // Default value is "Success" if no data is passed
        this.data = data;

        // ✅ Indicate whether the response was successful or not
        // Generally: success for codes < 400 (200–399), failure for 400 and above
        this.success = statusCode < 400;
    }
}
export { ApiResponse };
