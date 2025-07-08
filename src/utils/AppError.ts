export default class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor( statusCode: number,message: any) {
        super(message); this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}