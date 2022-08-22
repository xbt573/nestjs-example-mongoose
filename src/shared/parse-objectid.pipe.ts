import { Injectable,
         Optional,
         HttpStatus,
         ArgumentMetadata,
         PipeTransform } from '@nestjs/common';
import { ErrorHttpStatusCode,
         HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ObjectId } from 'bson';

export interface ParseObjectIdPipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
}

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
    protected exceptionFactory: (error: string) => any;

    constructor(@Optional() options?: ParseObjectIdPipeOptions) {
        options = options || {};
        const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
            options;

        this.exceptionFactory =
            exceptionFactory ||
            (error => new HttpErrorByCode[errorHttpStatusCode](error));
    }

    async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
        if (!ObjectId.isValid(value)) {
            throw this.exceptionFactory(
                'Validation failed (objectId is expected)',
            );
        }
        return value;
    }
}
