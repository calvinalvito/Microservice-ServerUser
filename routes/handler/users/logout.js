//Tujuan dari logout ini adalah untuk menghapus refresh token user
const {
    User,
    RefreshToken
  } = require('../../../models');
  
  module.exports = async (req, res) => {
    const userId = req.body.user_id;
    //Melakukan cek user id didatabase
    const user = await User.findByPk(userId);

    //Jika user id tidak ada maka akan merespon 404(not found)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }
    //Melakukan hapus refresh token
    await RefreshToken.destroy({
      where: { user_id: userId }
    });
    //Berhasil dihapus merespon success
    return res.json({
      status: 'success',
      message: 'refresh token deleted'
    });
  }