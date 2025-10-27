class Apierror extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error =[],
        Statck = ""

    ){
        super(message);
        this.statusCode = ststusCode;
        this .data = null;
        this. message = message;
        this .sucess = false;
        this.error = error;

        if(statck ){
            this.statck = statck
        }
        else{
            Error.captureStackTrace (this , this.constructor)
        }
    }
}
export { ApiError };
