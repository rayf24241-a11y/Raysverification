const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { code } = req.body || {};
    const cleanCode = String(code || "").trim().toUpperCase();

    if (!cleanCode) {
      return res.status(400).json({ message: "No code provided" });
    }

    const { error } = await supabase
      .from("verify_codes")
      .insert({
        code: cleanCode,
        used: false
      });

    if (error) {
      return res.status(500).json({
        message: "Supabase save error",
        error: error.message
      });
    }

    return res.json({ message: "Code saved" });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
