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

    if (data.success) {
      result.textContent = "✅ Verified successfully!";
      result.style.color = "#ffffff";
    } else {
      result.textContent = "❌ Invalid code.";
      result.style.color = "#ffb3b3";
    }

  } catch (error) {
    console.error(error);
    result.textContent = "❌ Error verifying code.";
    result.style.color = "#ffb3b3";
  }
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}