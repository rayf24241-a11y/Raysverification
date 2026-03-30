let codes = global.codes || (global.codes = new Map());

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "No code provided" });
  }

  codes.set(code, true);

  res.status(200).json({ message: "Code saved" });
}