const { createClient } = require("@supabase/supabase-js");

function makeCustomCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "SP-";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const code = makeCustomCode();

    const { data, error } = await supabase
      .from("custom_codes")
      .insert([
        {
          code,
          used: false
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase error",
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      code,
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
