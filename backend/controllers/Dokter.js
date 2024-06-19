import { Sequelize } from "sequelize";
import Dokter from "../models/DokterModel.js"
import bcrypt from 'bcrypt'
import Spesialist from "../models/SpesialistModel.js";

export const getDokter = async(req, res) => {
    try {
        const docters = await Dokter.findAll({
            attributes: [
              'uuid',
              'name',
              'username',
              'role',
              'jenis_kelamin',
              'pengalaman',
              'visi',
            ],
            include: {
              model: Spesialist,
              as: 'spesialist',
              attributes: ['name'], // Include only the necessary attributes from Spesialist
            },
          });
        res.status(200).json(docters);
    } catch (error) {
        console.log(error)
    }
}

export const getDokterBySpesialist = async (req, res) => {
    try {
      const docters = await Dokter.findAll({
        attributes: ['uuid', 'name', 'username', 'role', 'jenis_kelamin', 'pengalaman', 'visi'],
        include: {
          model: Spesialist,
          as: 'spesialist',
          attributes: ['name'],
        },
        where: {spesialistId: req.params.spesialistId},
      });
      res.status(200).json(docters);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching doctors' });
    }
  };

export const getDokterById = async (req, res) => {
  try {
    const dokter = await Dokter.findOne({
      attributes: ['uuid', 'name', 'username', 'role', 'spesialistId', 'jenis_kelamin', 'pengalaman', 'visi'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(dokter);
  } catch (error) {
    console.log(error);
  }
};

export const createDokter = async(req, res) => {
    const { name, username, password, confirmPassword, role, spesialistId, jenis_kelamin, pengalaman, visi } = req.body
    const existingDokter = await Dokter.findOne({where: {username: username}})
    if(existingDokter) return res.status(400).json({message: 'Username sudah digunakan!'})
    if(password !== confirmPassword) return res.status(400).json({message: 'Password dan Confirm password tidak cocok'})
    if(password === '' || password === null) return res.status(400).json({message: 'Empty Password!'})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Dokter.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            spesialistId: spesialistId,
            jenis_kelamin: jenis_kelamin,
            pengalaman: pengalaman,
            visi: visi
        })
        res.status(201).json({message: "Register berhasil"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateDokter = async (req, res) => {
    const dokter = await Dokter.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!dokter) return res.status(404).json({ message: 'Dokter tidak ditemukan' });

    const { name, username, password, confirmPassword, role, spesialistId, jenis_kelamin, pengalaman, visi } = req.body;
    let hashPassword;

    if (password === '' || password === null) {
        hashPassword = dokter.password;
    } else {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
    }

    if (password !== confirmPassword) return res.status(400).json({ message: 'Password dan Confirm password tidak cocok' });

    try {
        // Log spesialistId yang diterima dari frontend
        console.log('Received spesialistId:', spesialistId);

        // Validasi apakah spesialistId ada di tabel spesialist
        const spesialist = await Spesialist.findByPk(spesialistId);

        // Log hasil pencarian di tabel spesialist
        console.log('Spesialist found:', spesialist);

        if (!spesialist) {
            return res.status(400).json({ message: 'Spesialist ID tidak valid' });
        }

        await Dokter.update({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            spesialistId: spesialistId,
            jenis_kelamin: jenis_kelamin,
            pengalaman: pengalaman,
            visi: visi,
        }, {
            where: {
                id: dokter.id
            }
        });

        res.status(200).json({ message: 'Dokter updated!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteDokter = async(req, res) => {
    const dokter = await Dokter.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if (!Dokter) return res.status(404).json({ message: 'Dokter tidak ditemukan' });
    try {
        await Dokter.destroy({
            where: {
                id: dokter.id
            }
        })
        res.status(200).json({message: "Dokter Deleted"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}