export const config = {
  port: 3000,
  baseUrl: "http://127.0.0.1:3000",
  jwtExpirationInSeconds: 60 * 60, // 1 hour
};
export const roles = {
  ADMIN: "admin",
  STUDENT: "student",
  TEACHER: "teacher",
};
