import jwt from "jsonwebtoken";

const generateAccessToken = (id, role) => {
  const token = jwt.sign(
    {
      data: { id, role },
    },
    process.env.JWT_KEY,
    { expiresIn: "60s" }
  );
  return token;
};

const generateRefreshToken = (id) => {
  const token = jwt.sign(
    {
      data: { id },
    },
    process.env.JWT_KEY,
    { expiresIn: "7d" }
  );
  return token;
};

export { generateAccessToken, generateRefreshToken };
