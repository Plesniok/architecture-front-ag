export type ServiceResponse<T> = {
    status: string;
    httpStatus: number;
    message: string;
    internalCode: string;
    data: T
}

