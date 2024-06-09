import bcrypt from 'bcrypt';
import Divisi from '../models/DivisiModel.js';

export const getDivisi = async (req, res) => {
  try {
    const users = await Divisi.findAll({
      attributes: ['uuid', 'name'],
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getDivisiById = async (req, res) => {
  try {
    const users = await Divisi.findOne({
      attributes: ['uuid', 'name'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const createDivisi = async (req, res) => {
  const { name } = req.body;
  try {
    await Divisi.create({
      name: name,
    });
    res.status(201).json({ message: 'Register berhasil' });
  } catch (error) {
    console.log(error);
  }
};
