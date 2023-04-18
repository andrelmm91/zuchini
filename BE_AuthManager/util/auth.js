const { sign, verify } = require("jsonwebtoken");
const KEY = "supersecret";

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function verifyToken(token) {
  return verify(token, KEY);
}

function validateJSONToken(token) {
  try {
    const validatedToken = verifyToken(token);
    return { val: true, token: validatedToken };
  } catch (error) {
    return { val: false, token: token };
  }
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;

// // validate Token
// function checkAuthMiddleware(req, res, next) {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   if (!req.headers.authorization) {
//     console.log("NOT AUTH. AUTH HEADER MISSING.");
//     return next(new NotAuthError("Not authenticated."));
//   }
//   const authFragments = req.headers.authorization.split(" ");

//   if (authFragments.length !== 2) {
//     console.log("NOT AUTH. AUTH HEADER INVALID.");
//     return next(new NotAuthError("Not authenticated."));
//   }
//   const authToken = authFragments[1];
//   try {
//     const validatedToken = validateJSONToken(authToken);
//     req.token = validatedToken;
//   } catch (error) {
//     console.log("NOT AUTH. TOKEN INVALID.");
//     return next(new NotAuthError("Not authenticated."));
//   }

//   next();
// }
