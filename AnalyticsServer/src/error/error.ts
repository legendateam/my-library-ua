import { MessageEnum, StatusEnum } from '../enums';

export class ErrorHandler extends Error {
    status: StatusEnum;

    error: MessageEnum;

    constructor(message: string, status: StatusEnum, error: MessageEnum) {
        super(message);

        this.status = status;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}
