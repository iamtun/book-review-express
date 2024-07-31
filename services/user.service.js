import { fileUserPath } from "../data/index.js";
import { getJsonData, writeJsonFile } from "../utils/func.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  constructor() {}

  async getUsers() {
    try {
      const userData = await getJsonData(fileUserPath);
      const userToArray = Object.entries(userData).map(([key, value]) => {
        return {
          id: key,
          ...value,
        };
      });

      return userToArray;
    } catch (error) {
      return [];
    }
  }

  async checkExistUser(username) {
    const users = await this.getUsers();
    const existedUser = users.some((u) => u.username === username);

    return existedUser;
  }

  async saveUser(user) {
    try {
      const isExist = await this.checkExistUser(user.username);
      if (isExist) {
        throw new Error("Username already exists");
      } else {
        const id = users.length + 1;
        user.password = await bcrypt.hash(user.password, 10);
        const userData = await getJsonData(fileUserPath);
        userData[id] = user;
        await writeJsonFile(fileUserPath, userData);
        return id;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyUser(username, password) {
    const users = await this.getUsers();
    const user = users.find((u) => u.username === username);
    if (!user) {
      throw new Error("User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Wrong password");
      } else {
        let accessToken = jwt.sign(
          {
            data: {
              userId: user.id,
            },
          },
          "access",
          { expiresIn: 60 }
        );
        return { accessToken };
      }
    }
  }
}

const userService = new UserService();
export default userService;
