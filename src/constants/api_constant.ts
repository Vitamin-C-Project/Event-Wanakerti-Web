export const API_PATH_CONSTANT = {
  APP: "app",
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    CHECK_AUTHENTICATED: "auth/check-authenticated",
    LOGOUT: "auth/logout",
    FORGOT_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
  },
  PARTICIPANT: {
    SCHOOL: {
      LIST: "participant/school/list",
      CREATE: "participant/school/create",
      SHOW: "participant/school/show",
      UPDATE: "participant/school/update",
      DELETE: "participant/school/delete",
    },
    TEAM: {
      LIST: "participant/team/list",
      CREATE: "participant/team/create",
      SHOW: "participant/team/show",
      UPDATE: "participant/team/update",
      DELETE: "participant/team/delete",
      EXPORT: "participant/team/export-excel",
      UPDATE_STATUS_RE_REGISTRATION:
        "participant/team/update-status-re-registration",
    },
    MEMBER: {
      LIST: "participant/team-member/list",
      CREATE: "participant/team-member/create",
      SHOW: "participant/team-member/show",
      UPDATE: "participant/team-member/update",
      DELETE: "participant/team-member/delete",
    },
  },
  USER: {
    LIST: "user/list",
    CREATE: "user/create",
    SHOW: "user/show",
    UPDATE: "user/update",
    DELETE: "user/delete",
    UPDATE_PASSWORD: "user/update-password",
  },
  DIVISION: {
    LIST: "division/list",
    CREATE: "division/create",
    SHOW: "division/show",
    UPDATE: "division/update",
    DELETE: "division/delete",
  },
  SCHOOL_TYPE: {
    LIST: "school-type/list",
    SHOW: "school-type/show",
  },
  CMS: {
    ALL_CONTENT: "cms/contents",
    CONTACT_US: {
      LIST: "cms/contact-us/list",
      CREATE: "cms/contact-us/create",
      SHOW: "cms/contact-us/show",
      DELETE: "cms/contact-us/delete",
    },
    VIDEO: {
      SHOW: "cms/video/show",
      UPDATE: "cms/video/update",
    },
    BRAND: {
      LIST: "cms/brand-and-sponsorship/list",
      CREATE: "cms/brand-and-sponsorship/create",
      SHOW: "cms/brand-and-sponsorship/show",
      DELETE: "cms/brand-and-sponsorship/delete",
    },
    CATEGORY: {
      LIST: "cms/category/list",
      CREATE: "cms/category/create",
      SHOW: "cms/category/show",
      UPDATE: "cms/category/update",
      DELETE: "cms/category/delete",
    },
    AGENDA: {
      SHOW: "cms/agenda/show",
      UPDATE: "cms/agenda/update",
    },
    MASCOT: {
      UPDATE: "cms/mascot-and-logo/update-mascot",
      SHOW: "cms/mascot-and-logo/show-mascot",
    },
    LOGO: {
      UPDATE: "cms/mascot-and-logo/update-logo",
      SHOW: "cms/mascot-and-logo/show-logo",
    },
    ACTIVITY: {
      UPDATE: "cms/mascot-and-logo/update-activity",
      SHOW: "cms/mascot-and-logo/show-activity",
    },
  },
  ROLE: {
    LIST: "role/list",
  },
  MARKING: {
    SAVE: "marking/save",
    UPDATE: "marking/update",
    LIST: "marking/list",
  },
  DASHBOARD: {
    LEADERBOARD: "dashboard/leaderboard",
    COUNTING: "dashboard/counting",
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
