import Users from "../models/UserModel.js"
import bcrypt from 'bcrypt'

export const getUser = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'name', 'username', 'role', 'jenis_kelamin', 'divisi', 'alamat', 'no_telp']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req, res) => {
  try {
    const users = await Users.findOne({
      attributes: ['uuid', 'name', 'username', 'role', 'jenis_kelamin', 'divisi', 'alamat', 'no_telp'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async(req, res) => {
    const { name, username, password, confirmPassword, role, jenis_kelamin, divisi, alamat, no_telp } = req.body
    if(password !== confirmPassword) return res.status(400).json({message: 'Password dan Confirm password tidak cocok'})
    if(password === '' || password === null) return res.status(400).json({message: 'Empty Password!'})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            jenis_kelamin: jenis_kelamin,
            divisi: divisi,
            alamat: alamat,
            no_telp: no_telp
        })
        res.status(201).json({message: "Register berhasil"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = async(req, res)  => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    const {name, username, password, role, jenis_kelamin, divisi, alamat, no_telp} = req.body
    let hashPassword;
    if(password ==='' || password === null) {
        hashPassword = user.password 
    } else {
        const salt = await bcrypt.salt()
        hashPassword = await bcrypt.hash(password, salt)
    }
    if (password !== confirmPassword) return res.status(400).json({ message: 'Password dan Confirm password tidak cocok' });
    try {
        await Users.update({
          name: name,
          username: username,
          password: hashPassword,
          role: role,
          jenis_kelamin: jenis_kelamin,
          divisi: divisi,
          alamat: alamat,
          no_telp: no_telp,
        }, {
            where: {
                uuid: user.id
            }
        });
        res.status(200).json({ message: 'User updated!' });
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    try {
        await Users.destroy({
            where: {
                uuid: user.id
            }
        })
        res.status(200).json({message: "User Deleted"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}