import { Users } from "../models/user.model.js";
import { logger } from "../utils/logger.js";

class AuthRepository {
  async create({ firstName, lastName, email, password, dateOfBirth }) {
    logger.info(`AuthRepository. Got create User request`);
    const user = new Users({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
    });
    return user.save();
  }
  async findOneByEmail(email) {
    logger.info(`AuthRepository. FindOneByEmail request`);
    return Users.findOne({ email });
  }
}

export const authRepository = new AuthRepository();
