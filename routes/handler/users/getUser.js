//Menampilkan data user dengan parameter tertentu
const { User } = require('../../../models');

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    //atribute yang akan ditampilkan
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
  });
  //Jika user tidak ditemukan maka akan error
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  //Jika id ditemukan
  return res.json({
    status: 'success',
    data: user
  });
}