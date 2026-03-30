const codes = globalThis.codes || (globalThis.codes = new Map());

module.exports = (req, res) => {
  try {
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
        success: true,
        message: "Verified"
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid code"
    });
  } catch (err) {
    console.error("verify-code error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};