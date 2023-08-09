module.exports = (message,statusCode)=>{
    console.log(statusCode);
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    throw error;
}

