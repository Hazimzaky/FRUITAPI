"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = exports.noContentResponse = exports.deletedResponse = exports.updatedResponse = exports.createdResponse = exports.paginatedResponse = exports.successResponse = void 0;
const successResponse = (res, data = null, message, statusCode = 200) => {
    const response = {
        success: true,
        data,
        message
    };
    res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const paginatedResponse = (res, data, pagination, message) => {
    const response = {
        data,
        pagination
    };
    const apiResponse = {
        success: true,
        data: response,
        message
    };
    res.status(200).json(apiResponse);
};
exports.paginatedResponse = paginatedResponse;
const createdResponse = (res, data, message = 'Resource created successfully') => {
    (0, exports.successResponse)(res, data, message, 201);
};
exports.createdResponse = createdResponse;
const updatedResponse = (res, data, message = 'Resource updated successfully') => {
    (0, exports.successResponse)(res, data, message, 200);
};
exports.updatedResponse = updatedResponse;
const deletedResponse = (res, message = 'Resource deleted successfully') => {
    (0, exports.successResponse)(res, null, message, 200);
};
exports.deletedResponse = deletedResponse;
const noContentResponse = (res) => {
    res.status(204).end();
};
exports.noContentResponse = noContentResponse;
const responseHandler = (req, res, next) => {
    res.success = (data, message, statusCode = 200) => {
        (0, exports.successResponse)(res, data, message, statusCode);
    };
    res.paginated = (data, pagination, message) => {
        (0, exports.paginatedResponse)(res, data, pagination, message);
    };
    res.created = (data, message) => {
        (0, exports.createdResponse)(res, data, message);
    };
    res.updated = (data, message) => {
        (0, exports.updatedResponse)(res, data, message);
    };
    res.deleted = (message) => {
        (0, exports.deletedResponse)(res, message);
    };
    res.noContent = () => {
        (0, exports.noContentResponse)(res);
    };
    next();
};
exports.responseHandler = responseHandler;
//# sourceMappingURL=responseHandler.js.map