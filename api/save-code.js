module.exports = async (req, res) => {
  return res.status(200).json({
    test: "HELLO_FROM_NEW_FILE"
  });
};
