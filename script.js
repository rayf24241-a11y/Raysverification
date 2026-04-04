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

    const linkResponse = await fetch("/api/create-link-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const linkData = await linkResponse.json();
    console.log("create-link-code response:", linkData);

    if (!linkData.success || !linkData.code) {
      result.textContent = "Code worked, but link code creation failed.";
      result.classList.add("error");
      return;
    }

    localStorage.setItem("linkVerificationCode", linkData.code);

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

async function submitNextBotCode() {
  const input = document.getElementById("nextBotCodeInput");
  const result = document.getElementById("finalResult");

  if (!input || !result) return;

  const code = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";

  if (!code) {
    result.textContent = "Paste the next bot code first.";
    result.classList.add("error");
    return;
  }

  try {
    const response = await fetch("/api/verify-next-bot-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (!data.success) {
      result.textContent = data.message || "Invalid next bot code.";
      result.classList.add("error");
      return;
    }

    result.textContent = "Next bot code accepted.";
    result.classList.add("success");

    setTimeout(() => {
      window.location.href = "steam-mods.html";
    }, 700);
  } catch (err) {
    console.error(err);
    result.textContent = "Error checking next bot code.";
    result.classList.add("error");
  }
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

function goToSteam() {
  window.location.href = "steam-mods.html";
}

function goToVr() {
  const status = document.getElementById("pickStatus");
  if (status) {
    status.textContent = "VR has nothing yet.";
    status.className = "result error";
  }
}

function goBackToPick() {
  window.location.href = "pick-mod.html";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement?.id === "codeInput") {
    verifyCode();
  }

  if (event.key === "Enter" && document.activeElement?.id === "nextBotCodeInput") {
    submitNextBotCode();
  }
});
