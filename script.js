async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const verifyBtn = document.getElementById("verifyBtn");

  if (!input || !result || !verifyBtn) return;

  const code = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";

  if (!code) {
    result.textContent = "Paste the bot code first.";
    result.classList.add("error");
    return;
  }

  verifyBtn.disabled = true;

  try {
    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (!data.success) {
      result.textContent = data.message || "That code is invalid.";
      result.classList.add("error");
      return;
    }

    const customCode = makeCustomAccessCode();
    localStorage.setItem("customAccessCode", customCode);

    result.textContent = "Code accepted.";
    result.classList.add("success");

    setTimeout(() => {
      window.location.href = "loading.html";
    }, 700);
  } catch (err) {
    console.error(err);
    result.textContent = "Error checking code.";
    result.classList.add("error");
  } finally {
    verifyBtn.disabled = false;
  }
}

function makeCustomAccessCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "SP-";

  for (let i = 0; i < 12; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

async function copyCode() {
  const output = document.getElementById("licenseOutput");
  const copyMsg = document.getElementById("copyMsg");

  if (!output || !copyMsg) return;

  try {
    await navigator.clipboard.writeText(output.value);
    copyMsg.textContent = "Copied.";
  } catch (error) {
    copyMsg.textContent = "Could not copy.";
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement?.id === "codeInput") {
    verifyCode();
  }
});