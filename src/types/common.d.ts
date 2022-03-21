export interface BaseResponse<T = any> {
    message: string;
    status: number;
    timestamp: number;
    data: T;
}

export interface Page<T> {
    content: Array<T>
    size: number
    totalElements: number
    totalPages: number
}