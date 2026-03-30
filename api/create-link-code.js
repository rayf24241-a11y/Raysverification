const { createClient } = require("@supabase/supabase-js");

function makeLinkCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "GAME-";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

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

    const code = makeLinkCode();

    const { error } = await supabase
      .from("link_codes")
      .insert({
        code,
        used: false
      });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Could not create link code",
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      code
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};