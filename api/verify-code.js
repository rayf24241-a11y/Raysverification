const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        success: false,
        message: "Missing Supabase env vars"
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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
      .from("verify_codes")
      .select("id, code, used")
      .eq("code", cleanCode)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase lookup error",
        error: error.message
      });
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Invalid code"
      });
    }

    if (data.used) {
      return res.status(400).json({
        success: false,
        message: "Code already used"
      });
    }

    const { error: updateError } = await supabase
      .from("verify_codes")
      .update({ used: true })
      .eq("id", data.id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: "Supabase update error",
        error: updateError.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Verified"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};