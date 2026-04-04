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
    console.log("verify-code response:", data);

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
    console.log("verify-next-bot-code response:", data);

    if (!data.success) {
      result.textContent = data.message || "Invalid next bot code.";
      result.classList.add("error");
      return;
    }

    result.textContent = "Next bot code accepted.";
    result.classList.add("success");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 700);
  } catch (err) {
    console.error(err);
    result.textContent = "Error checking next bot code.";
    result.classList.add("error");
  }
}

async function generateUnturnedCode() {
  const output = document.getElementById("licenseOutput");
  const status = document.getElementById("licenseStatus");

  if (!output || !status) return;

  output.value = "";
  status.textContent = "Generating code...";
  status.className = "result";

  try {
    const response = await fetch("/api/create-custom-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("create-custom-code response:", data);

    if (!data.success || !data.code) {
      status.textContent = data.message || "Failed to generate code.";
      status.classList.add("error");
      return;
    }

    localStorage.setItem("customAccessCode", data.code);
    output.value = data.code;
    status.textContent = "Code ready.";
    status.classList.add("success");
  } catch (err) {
    console.error(err);
    status.textContent = "Error generating code.";
    status.classList.add("error");
  }
}

async function generateCookieClickerCode() {
  const output = document.getElementById("cookieCodeOutput");
  const status = document.getElementById("cookieCodeStatus");

  if (!output || !status) return;

  output.value = "";
  status.textContent = "Generating code...";
  status.className = "result";

  try {
    const response = await fetch("/api/create-cookie-clicker-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("create-cookie-clicker-code response:", data);

    if (!data.success || !data.code) {
      status.textContent = data.message || "Failed to generate code.";
      status.classList.add("error");
      return;
    }

    localStorage.setItem("cookieClickerCode", data.code);
    output.value = data.code;
    status.textContent = "Code ready.";
    status.classList.add("success");
  } catch (err) {
    console.error(err);
    status.textContent = "Error generating code.";
    status.classList.add("error");
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

async function copyCookieCode() {
  const output = document.getElementById("cookieCodeOutput");
  const copyMsg = document.getElementById("cookieCopyMsg");

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
  window.location.href = "vr-mods.html";
}

function goToUnturnedCode() {
  window.location.href = "unturned-code.html";
}

function goToCookieClickerCode() {
  window.location.href = "cookie-clicker-code.html";
}

function goHome() {
  window.location.href = "home.html";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement?.id === "codeInput") {
    verifyCode();
  }

  if (event.key === "Enter" && document.activeElement?.id === "nextBotCodeInput") {
    submitNextBotCode();
  }
});
