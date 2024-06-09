import bcrypt from 'bcrypt';
import Kehadiran from '../models/KehadiranModel.js';
import Users from '../models/UserModel.js';

export const getKehadiran = async (req, res) => {
  try {
    let response;
    if(role === 'admin') {
        response = await Kehadiran.findAll({
          attributes: ['uuid', 'tanggal', 'jam_masuk', 'jam_keluar', 'jenis_kelamin', 'userId'],
          include: [{
            model: Users,
            attributes: ['name', 'username']
          }]
        });
    } else {
        response = await Kehadiran.findAll({
          attributes: ['uuid', 'tanggal', 'jam_masuk', 'jam_keluar', 'jenis_kelamin', 'userId'],
          where: {
            userId: req.userId
          },
          include: [
            {
              model: Users,
              attributes: ['name', 'username'],
            },
          ],
        });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const getKehadiranById = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if(!kehadiran) return res.send(403).json({message: "Kehadiran tidak ditemukan"})
    let response;
    if (role === 'admin') {
      response = await Kehadiran.findOne({
        attributes: ['uuid', 'tanggal', 'jam_masuk', 'jam_keluar', 'jenis_kelamin', 'userId'],
        where: {
          id: kehadiran.id,
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'username'],
          },
        ],
      });
    } else {
      response = await Kehadiran.findAll({
        attributes: ['uuid', 'tanggal', 'jam_masuk', 'jam_keluar', 'jenis_kelamin', 'userId'],
        where: {
          [Op.and]: [{ id: kehadiran.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ['name', 'username'],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createKehadiran = async (req, res) => {
  const { tanggal, jam_masuk, jam_keluar } = req.body;
  try {
    await Kehadiran.create({
      tanggal: tanggal,
      jam_masuk: jam_masuk,
      jam_keluar: jam_keluar,
      userId: req.userId,
    });
    res.status(201).json({ message: 'Kehadiran berhasil ditambahkan' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateKehadiran = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kehadiran) return res.status(404).json({ message: 'Data tidak ditemukan' });
    const { tanggal, jam_masuk, jam_keluar } = req.body;
    if (req.role === 'admin') {
      await Kehadiran.update(
        { tanggal, jam_masuk, jam_keluar },
        {
          where: {
            id: kehadiran.id,
          },
        }
      );
    } else {
      if (req.userId !== kehadiran.userId) return res.status(403).json({ message: 'Akses terlarang' });
      await Kehadiran.update(
        { tanggal, jam_masuk, jam_keluar },
        {
          where: {
            [Op.and]: [{ id: kehadiran.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ message: 'Kehadiran updated successfuly' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteKehadiran = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kehadiran) return res.status(404).json({ msg: 'Data tidak ditemukan' });
    const { tanggal, jam_masuk, jam_keluar } = req.body;
    if (req.role === 'admin') {
      await Kehadiran.destroy({
        where: {
          id: kehadiran.id,
        },
      });
    } else {
      if (req.userId !== kehadiran.userId) return res.status(403).json({ msg: 'Akses terlarang' });
      await Kehadiran.destroy({
        where: {
          [Op.and]: [{ id: kehadiran.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: 'Kehadiran deleted successfuly' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
