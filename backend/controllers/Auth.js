import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"

export const Login = async (req, res) => {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log('user: ', user)
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong Password' });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const username = user.username;
    const role = user.role;
    const jenis_kelamin = user.jenis_kelamin;
    const divisiId = user.divisiId;
    const alamat = user.alamat;
    const no_telp = user.no_telp;
    res.status(200).json({ uuid, name, username, role, jenis_kelamin, divisiId, alamat, no_telp });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Mohon login ke akun Anda!' });
  }
  const user = await Users.findOne({
    attributes: ['uuid', 'name', 'username', 'role', 'jenis_kelamin', 'divisiId', 'alamat', 'no_telp'],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: 'Tidak dapat logout' });
    res.status(200).json({ message: 'Anda telah logout' });
  });
};
