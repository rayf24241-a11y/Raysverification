async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const code = input.value.trim();

  if (!code) {
    result.textContent = "Enter a code first.";
    result.style.color = "#ffb3b3";
    return;
  }

  try {
    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    result.textContent = data.message || "No message returned.";
    result.style.color = data.success ? "#ffffff" : "#ffb3b3";
  } catch (error) {
    result.textContent = `Error verifying code: ${error.message}`;
    result.style.color = "#ffb3b3";
  }
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}