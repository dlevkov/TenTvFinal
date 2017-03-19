import { errorObject } from 'rxjs/util/errorObject';
import { ErrorHandler, Injectable } from '@angular/core';
import { WebApiErrorLogger } from './common/services/webapi-error-logger.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    private lastError: any;
    constructor(private logger: WebApiErrorLogger) { }
    public handleError(error) {
        if (!error) {
            console.log('no error');
            return;
        }
        if (!this.lastError)
            this.lastError = error;
        if (error.message === this.lastError.message) { // same error as before
            console.log('same error:', error);
            return;
        }
        this.lastError = error;
        // if ('development' === ENV) {
        //     console.log('Error transferred to custom handler: ' + error);
        // } else {
        this.logger.Log(error);
        // }
    }
}
