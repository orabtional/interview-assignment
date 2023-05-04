export const successResponse = (data: any, message?: string) => {
    return {
        success: true,
        message,
        data,
    };
};

export const errorResponse = (message: string, status: number) => {
    return {
        success: false,
        message,
        status,
    };
};
