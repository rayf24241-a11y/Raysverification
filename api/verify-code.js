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

    const { data, error } = await supabase
      .from("verify_codes")
      .select("id, code, used")
      .eq("code", code)
      .single();

    if (error || !data) {
      console.error("Lookup error:", error);
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    if (data.used) {
      return res.status(400).json({ success: false, message: "Code already used" });
    }

    const { error: updateError } = await supabase
      .from("verify_codes")
      .update({ used: true })
      .eq("id", data.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return res.status(500).json({ success: false, message: "Failed to verify code" });
    }

    return res.status(200).json({ success: true, message: "Verified" });
  } catch (err) {
    console.error("verify-code error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};