const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { code } = req.body || {};

    if (!code) {
      return res.status(400).json({ success: false, message: "No code provided" });
    }

    const { error } = await supabase
      .from("verify_codes")
      .upsert(
        {
          code,
          used: false,
          created_at: new Date().toISOString()
        },
        { onConflict: "code" }
      );

    if (error) {
      console.error("Supabase save error:", error);
      return res.status(500).json({ success: false, message: "Failed to save code" });
    }

    return res.status(200).json({ success: true, message: "Code saved" });
  } catch (err) {
    console.error("save-code error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};