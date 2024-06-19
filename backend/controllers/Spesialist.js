import Spesialist from '../models/SpesialistModel.js';

export const getSpesialist = async (req, res) => {
  try {
    const spesialist = await Spesialist.findAll({
      attributes: ['id', 'uuid', 'name'],
    });
    res.status(200).json(spesialist);
  } catch (error) {
    console.log(error);
  }
};

export const getSpesialistById = async (req, res) => {
  try {
    const spesialist = await Spesialist.findOne({
      attributes: ['uuid', 'name'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(spesialist);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const createSpesialist = async (req, res) => {
  const { name } = req.body;
  try {
    const existingSpesialist = await Spesialist.findOne({where: {name}})
    if(existingSpesialist) return res.status(400).json({message: 'Nama Spesialist sudah ada!'})
    await Spesialist.create({
      name: name,
    });
    res.status(201).json({ message: 'Register berhasil' });
  } catch (error) {
    console.log(error);
  }
};

export const updateSpesialist = async(req, res)  => {
  const spesiaist = await Spesialist.findOne({
      where: {
          uuid: req.params.id
      }
  })
  if (!spesiaist) return res.status(404).json({ message: 'Spesialist tidak ditemukan' });
  const {name} = req.body
  try {
      await Spesialist.update({
        name: name,
      }, {
          where: {
              id: spesiaist.id
          }
      });
      res.status(200).json({ message: 'Spesialist updated!' });
  } catch (error) {
      res.status(400).json({ message: error.message });

  }
}

export const deleteSpesialist = async(req, res) => {
  const spesialist = await Spesialist.findOne({
      where: {
          uuid: req.params.id
      }
  })
  if (!spesialist) return res.status(404).json({ message: 'Spesialist tidak ditemukan' });
  try {
      await Spesialist.destroy({
          where: {
              id: spesialist.id
          }
      })
      res.status(200).json({message: "Spesialist Deleted"});
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}
