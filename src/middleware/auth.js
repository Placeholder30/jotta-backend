const jwt = require("jwt");

function createToken(req, res, next) {
  jwt.sign(
    { data: id },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    },
    function (err, token) {
      console.log(token);
    }
  );
}

function validateToken(req, res, next) {
  const payload = req.headers.authorization;
  const token = payload.split(" ");
  jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: err });
    } else {
      next();
    }
  });
}

module.exports = { validateToken, createToken };
