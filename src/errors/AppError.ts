export class AppError extends Error {
    statusCode : number
    error?: unknown
    constructor(statusCode: number, message: string, error?: unknown){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}