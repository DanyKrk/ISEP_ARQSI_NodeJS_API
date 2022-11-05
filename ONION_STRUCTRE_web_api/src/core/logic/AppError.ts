import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GenericAppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(err: any) {
            // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
            super(false, {
                message: `An unexpected error occurred.`,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: An unexpected error occurred`);
            console.error(err);
        }

        public static create(err: any): UnexpectedError {
            return new UnexpectedError(err);
        }
    }
}
