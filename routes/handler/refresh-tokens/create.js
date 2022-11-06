//Memanggil model
const { 
    User,
    RefreshToken
  } = require('../../../models');
  const Validator = require('fastest-validator');
  const v = new Validator();
  
  module.exports = async(req, res) => {
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_token;
    //Skema validasi
    const schema = {
      refresh_token: 'string',
      user_id: 'number'
    }
  
    const validate = v.validate(req.body, schema);
    //Jika validasi error status 400 (error)
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate
      });
    }

    //Melakukan cek apakah ada user
    const user = await User.findByPk(userId);
    //Jika user tidak ada melakukan return 404 (not found)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      });
    }
    //Menyimpan refreshtokens didatabase
    const createdRefreshToken = await RefreshToken.create({ 
      token: refreshToken, 
      user_id: userId 
    });
  
    return res.json({
      status: 'success',
      data: {
        id: createdRefreshToken.id
      }
    });
  }