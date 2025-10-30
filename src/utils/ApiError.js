// Define a custom error class called ApiError that extends the built-in Error class
class ApiError extends Error { 

    // The constructor is called whenever we create a new ApiError instance
    constructor(
        statusCode,                         // HTTP status code (e.g., 404, 500, etc.)
        message = "Something went wrong",    // Default error message if not provided
        error = [],                          // Optional: an array to store detailed errors
        stack = ""                           // Optional: stack trace (for debugging)
    ){ 
        // Call the parent class (Error) constructor with the message
        super(message);

        // ✅ Assign the HTTP status code to the object
        this.statusCode = statusCode;

        // ✅ You can store extra data if needed (null by default)
        this.data = null;

        // ✅ Store the main error message
        this.message = message;

        // ✅ Indicate that this operation was not successful
        this.success = false;

        // ✅ Store detailed errors (array of error details)
        this.error = error;

        // ✅ If a stack trace is provided, use it
        if(stack){
            this.stack = stack;
        }
        // ✅ Otherwise, capture the stack trace automatically for debugging
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// ✅ Export the class so it can be imported in other files
export { ApiError };
