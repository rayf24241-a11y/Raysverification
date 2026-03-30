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
      .upsert(
        {
          code: cleanCode,
          used: false,
          created_at: new Date().toISOString()
        },
        { onConflict: "code" }
      )
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase save error",
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Code saved",
      saved: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};