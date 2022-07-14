import { HTTPError } from "../utils/HttpError.js";

export function shouldHaveRole(role) {
  return (req, res, next) => {
    if (!req.user.hasRole(role)) {
      throw new HTTPError("Forbidden", 403);
    }
    next();
  };
}
