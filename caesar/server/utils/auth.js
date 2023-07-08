const jwt = require("jsonwebtoken");
const { AuthenticationError } = require('apollo-server-express');

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    console.log(req.body)
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log("token1")
    console.log(token)

    // Extract the token value from the "Bearer" scheme
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    console.log('token2')
    console.log(token)

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log('data')
      console.log(data)
      req.user = data;
      // Check if token is about to expire 
      const currentTime = Math.floor(Date.now() / 1000);
      const { exp } = jwt.decode(token);
      const timeUntilExpiration = exp - currentTime;

      // If token is about to expire, generate a new token and send it as a response header
      if (timeUntilExpiration < 300) {
        const newToken = this.signToken(data);
        res.set('Authorization', newToken);
      }

    } catch (err) {
      console.log("Invalid token");
      throw new AuthenticationError("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};