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
      result.textContent = data.message || "That bot code is invalid.";
      result.classList.add("error");
      return;
    }

    const linkResponse = await fetch("/api/create-link-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const linkData = await linkResponse.json();

    if (!linkData.success || !linkData.code) {
      result.textContent = "Bot code worked, but website code could not be created.";
      result.classList.add("error");
      return;
    }

    localStorage.setItem("generatedGameCode", linkData.code);

    result.textContent = "Bot code verified successfully.";
    result.classList.add("success");

    setTimeout(() => {
      window.location.href = "loading.html";
    }, 700);
  } catch (err) {
    console.error(err);
    result.textContent = "Error checking bot code.";
    result.classList.add("error");
  } finally {
    verifyBtn.disabled = false;
  }
}

async function copyCode() {
  const gameCodeOutput = document.getElementById("gameCodeOutput");
  const copyMsg = document.getElementById("copyMsg");

  if (!gameCodeOutput || !copyMsg) return;

  try {
    await navigator.clipboard.writeText(gameCodeOutput.value);
    copyMsg.textContent = "Copied. Now paste it into /linkverify in Discord.";
  } catch (error) {
    copyMsg.textContent = "Could not copy.";
  }
}

function submitNextBotCode() {
  const input = document.getElementById("nextBotCodeInput");
  const result = document.getElementById("finalResult");
  const box = document.getElementById("finalThingBox");
  const text = document.getElementById("finalThingText");
  const codeBox = document.getElementById("finalThingCode");

  if (!input || !result || !box || !text || !codeBox) return;

  const nextCode = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";
  box.classList.add("hidden");

  if (!nextCode) {
    result.textContent = "Paste the next bot code first.";
    result.classList.add("error");
    return;
  }

  // For now this accepts any non-empty code.
  // Later you can connect this to Supabase or another API.
  result.textContent = "Codes correct";
  result.classList.add("success");

  text.textContent = "Codes correct. Discord user linked. Your actual thing is ready.";
  codeBox.textContent = "REAL-" + makeFinalThingCode();

  box.classList.remove("hidden");
}

function makeFinalThingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement?.id === "codeInput") {
    verifyCode();
  }

  if (event.key === "Enter" && document.activeElement?.id === "nextBotCodeInput") {
    submitNextBotCode();
  }
});