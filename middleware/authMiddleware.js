// middleware/authMiddleware.js
const validAuthKey = '8a60348b-d4a4-564a-9b45-aab518adb7f4';

const authMiddleware = (req, res, next) => {
  const apiauthkey = req.headers['apiauthkey'];

  if (!apiauthkey) {
    return res.status(403).json({ error: "apiauthkey is missing or invalid" });
  }

  if (apiauthkey !== validAuthKey) {
    return res.status(403).json({ error: "Failed to authenticate apiauthkey" });
  }

  next();
};

module.exports = authMiddleware;
