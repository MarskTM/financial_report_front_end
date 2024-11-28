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
  PROFILE: {
    PATH: "/profile",
    ROLE: [ROLE.ADMIN, ROLE.CLIENT],
  },
  ERROR: {
    PATH: "/error",
  },
};
