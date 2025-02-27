export const API_PATH_CONSTANT = {
  APP: "app",
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    CHECK_AUTHENTICATED: "auth/check-authenticated",
  },
  USER: {
    LIST: "user/list",
    CREATE: "user/create",
    SHOW: "user/show",
    UPDATE: "user/update",
    DELETE: "user/delete",
    UPDATE_PASSWORD: "user/update-password",
  },
};

export const API_CODE_CONSTANT = {
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_UNAUTHORIZED: 401,
  HTTP_BAD_REQUEST: 400,
  HTTP_NOT_FOUND: 404,
  HTTP_UNPROCESSABLE_ENTITY: 422,
  HTTP_INTERNAL_SERVER_ERROR: 500,
};
