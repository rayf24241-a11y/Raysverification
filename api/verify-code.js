const codes = globalThis.codes || (globalThis.codes = new Map());

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.body || {};

  if (!code) {
    return res.status(400).json({ message: "No code provided" });
  }

  if (codes.has(code)) {
    codes.delete(code);

    return res.status(200).json({
      success: true
    });
  }

  res.status(400).json({
    success: false
  });
};