const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

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

    const { data, error } = await supabase
      .from("next_bot_codes")
      .select("*")
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
        message: "Invalid next bot code"
      });
    }

    if (data.used) {
      return res.status(400).json({
        success: false,
        message: "Code already used"
      });
    }

    await supabase
      .from("next_bot_codes")
      .update({ used: true })
      .eq("id", data.id);

    return res.status(200).json({
      success: true
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
