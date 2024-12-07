import Enterprise from "@/page/enterprise";

export const ROLE = {
  ADMIN: "Admin",
  CLIENT: "Client",
};

export const ROUTE = {
  LOGIN: {
    PATH: "/sign-in",
  },
  REGISTER: {
    PATH: "/sign-up",
  },
  FORGOT_PASSWORD: {
    PATH: "/forgot-password",
  },

  HOME: {
    PATH: "/home",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  ENTERPRISE: {
    PATH: "/enterprise",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  ENTERPRISE_DETAIL: {
    PATH: "/enterprise/detail/{id}",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  NEWS: {
    PATH: "/news",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  NEWS_DETAIL: {
    PATH: "/news/deatail/{id}",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  ANALYST: {
    PATH: "/analyst",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },
  ANALYST_EXTRACT: {
    PATH: "/analyst/extract",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  PROFILE: {
    PATH: "/profile",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  ADMIN_INFO: {
    PATH: "/home/admin_info",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },

  ERROR: {
    PATH: "/error",
  },
};
