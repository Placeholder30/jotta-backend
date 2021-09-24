const jwt = require("jsonwebtoken");

function createToken(email, name) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: email, name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

function validateToken(req, res, next) {
  const payload = req.headers.authorization;
  const token = payload.split(" ");
  jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: err });
    } else {
      req.token = decoded;
      next();
    }
  });
}

module.exports = { validateToken, createToken };
