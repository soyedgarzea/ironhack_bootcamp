const uploadPhoto = async (req, res, next) => {
  const file = req.file;

  try {
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = uploadPhoto;
