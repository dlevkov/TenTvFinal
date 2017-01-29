import { ErrorHandler, Injectable } from '@angular/core';
import { WebApiErrorLogger } from './common/services/webapi-error-logger.service';
import { Response } from '@angular/http';
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    private lastError: Response;
    constructor(private logger: WebApiErrorLogger) { }
    public handleError(error) {
        if (error === this.lastError) // same error as before
        {
            console.log('same error:' + error);
            return;
        }
        this.lastError = error;
        // if ('development' === ENV) {
        //     console.log('Error transferred to custom handler: ' + error);
        // } else {
            this.logger.Log(error.statusText, error);
        // }
    }
}
