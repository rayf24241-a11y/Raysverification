async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const code = input.value.trim();

  if (!code) {
    result.textContent = "Please enter your code first.";
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
      result.textContent = "Code verified successfully.";
      result.style.color = "#ffffff";
    } else {
      result.textContent = data.message || "Invalid code.";
      result.style.color = "#ffb3b3";
    }
  } catch (error) {
    console.error(error);
    result.textContent = "Something went wrong.";
    result.style.color = "#ffb3b3";
  }
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}