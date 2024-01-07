const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd, roles } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: 'Username and pwd are required' });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    res.sendStatus(409);
  }
  try {
    //encrypt the pwd
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({ username: user, password: hashedPwd, roles: roles });
    console.log(result);
    res.status(201).json({ message: `${user} has been created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
