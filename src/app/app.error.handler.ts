import { ErrorHandler, Injectable } from '@angular/core';
import { WebApiErrorLogger } from './common/services/webapi-error-logger.service';
import { Response } from '@angular/http';
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private logger: WebApiErrorLogger) { }
    handleError(error: Response) {
        if ('development' === ENV) {
            console.log('Error transferred to custom handler: ' + error);
        } else {
            this.logger.Log(error.statusText, error);
        }
    }
}
