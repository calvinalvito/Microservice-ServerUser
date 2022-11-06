const { RefreshToken } = require('../../../models');

module.exports = async (req, res) => {
  const refreshToken = req.query.refresh_token;
  //Melakukan cek apakah token ada di database
  const token = await RefreshToken.findOne({
    where: { token: refreshToken }
  });
  //Jika tidak ada akan mengembalikan 400 (error)
  if (!token) {
    return res.status(400).json({
      status: 'error',
      message: 'invalid token'
    });
  }
  //Jika ada didatabase akan mengembalikan sukses
  return res.json({
    status: 'success',
    token
  });
}