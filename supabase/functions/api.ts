export const DEFAULT_HEADERS = {
    headers: {
        'Content-Type': 'application/json',
    },
};

/**
 *
 * @param data
 * @returns
 */
export const successResponse = <T>(
    data: T,
) => {
    console.log(`[SUCCESS] ${JSON.stringify(data)}`);
    return new Response(JSON.stringify(data), {
        ...DEFAULT_HEADERS,
        status: 200,
        statusText: 'Ok',
    });
};

/**
 *
 * @param error
 * @param operation
 * @returns
 */
export const serverErrorResponse = <T>(
    error: T,
    operation: string,
) => {
    console.error(`[${operation}] ${JSON.stringify(error)}`);
    return new Response(JSON.stringify(error), {
        ...DEFAULT_HEADERS,
        status: 500,
        statusText: 'Server Error',
    });
};

///////////////////////////////////////////////////////////
// api response
///////////////////////////////////////////////////////////

export type APIResponse<D, E> = APISuccessResponse<D> | APIErrorResponse<E>;

export interface APISuccessResponse<T> {
    data: T;
    error: null;
}

export interface APIErrorResponse<T> {
    data: null;
    error: T;
}
