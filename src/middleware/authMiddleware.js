const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === 'aimeeiscool') {
    next();
  } else {
    res.status(401);
    res.send('Not permitted');
  }
};
exports.authMiddleware = authMiddleware;
