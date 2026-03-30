async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const verifyBtn = document.getElementById("verifyBtn");

  const code = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";

  if (!code) {
    result.textContent = "Enter a code first.";
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

    if (data.success) {
      const generatedCode = generateGameCode();
      localStorage.setItem("generatedGameCode", generatedCode);

      result.textContent = "Verified successfully";
      result.classList.add("success");

      setTimeout(() => {
        window.location.href = "loading.html";
      }, 700);
    } else {
      result.textContent = data.message || "Invalid code.";
      result.classList.add("error");
    }
  } catch (err) {
    console.error(err);
    result.textContent = "Error verifying code.";
    result.classList.add("error");
  } finally {
    verifyBtn.disabled = false;
  }
}

function generateGameCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "GAME-";

  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

async function copyCode() {
  const gameCodeOutput = document.getElementById("gameCodeOutput");
  const copyMsg = document.getElementById("copyMsg");

  try {
    await navigator.clipboard.writeText(gameCodeOutput.value);
    copyMsg.textContent = "Copied.";
  } catch (error) {
    copyMsg.textContent = "Could not copy.";
  }
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
});