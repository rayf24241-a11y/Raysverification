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
        message: "Invalid next bot code"
      });
    }

    if (data.used) {
      return res.status(400).json({
        success: false,
        message: "That code was already used"
      });
    }

    const { error: updateError } = await supabase
      .from("next_bot_codes")
      .update({ used: true })
      .eq("id", data.id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: "Could not mark code used",
        error: updateError.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Code accepted"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};
