import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { settings } from "../config/settings.js";
import { authRepository } from "../repositories/auth.repository.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

function message(text) {
  return `AuthService. ${text}`;
}

class AuthService {
  getPasswordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  async register({ firstName, lastName, email, password, dateOfBirth }) {
    logger.info(message("Got register request"), {
      firstName,
      lastName,
      email,
      dateOfBirth,
    });
    const existingUser = await authRepository.findOneByEmail(email);

    if (existingUser) {
      logger.warn(message("User already exist"), { email });
      throw new HTTPError("Email aready in use", 400);
    }

    const user = await authRepository.create({
      firstName,
      lastName,
      email,
      password: this.getPasswordHash(password),
      dateOfBirth,
    });
    logger.info(message("User created successfully"), { id: user._id });

    return user.getPublickProfile();
  }
  #validate(token) {
    jwt.verify(token);
  }
  async login({ email, password }) {
    const user = await authRepository.findOneByEmail(email);
    if (!user) {
      logger.warn(message("User not found"), { email });
      throw new HTTPError("Wrond email or password", 401);
    }
    const isMach = bcrypt.compareSync(password, user.password);
    if (!isMach) {
      logger.warn(message("Wrong user password"), { email });
      throw new HTTPError("Wrond email or password", 401);
    }
    logger.warn(message("Login request success"), { email });

    return { access_token: jwt.sign({ id: user._id }, settings.jwtSecret) };
  }
}

export const authService = new AuthService();
