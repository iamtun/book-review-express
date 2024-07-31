import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) => {
  const authorization = req.session.authorization;
  if (authorization) {
    const { accessToken } = authorization;
    try {
      const { data } = jwt.verify(accessToken, "access");
      const { userId } = data;
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
