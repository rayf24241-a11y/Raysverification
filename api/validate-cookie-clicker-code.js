const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
    }

    const { code } = req.body || {};
    const cleanCode = String(code || "").trim().toUpperCase();

    if (!cleanCode) {
      return res.status(400).json({
        success: false,
        message: "No code provided"
      });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("cookie_clicker_codes")
      .select("id, code, used")
      .eq("code", cleanCode)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Lookup error",
        error: error.message
      });
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Invalid code"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Valid code"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};
