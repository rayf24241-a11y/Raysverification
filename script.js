async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const successBox = document.getElementById("successBox");
  const gameCodeBox = document.getElementById("gameCodeBox");
  const gameCodeOutput = document.getElementById("gameCodeOutput");

  const code = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";
  successBox.classList.add("hidden");
  gameCodeBox.classList.add("hidden");

  if (!code) {
    result.textContent = "Enter a code first.";
    result.classList.add("error");
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
      result.textContent = "Verified successfully";
      result.classList.add("success");

      successBox.classList.remove("hidden");

      // Show game code after delay
      setTimeout(() => {
        gameCodeBox.classList.remove("hidden");

        // fake code generator (you can upgrade later)
        const randomCode = "GAME-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        gameCodeOutput.value = randomCode;

      }, 1000);

    } else {
      result.textContent = data.message || "Invalid code.";
      result.classList.add("error");
    }

  } catch (err) {
    console.error(err);
    result.textContent = "Error verifying code.";
    result.classList.add("error");
  }
}

function copyCode() {
  const input = document.getElementById("gameCodeOutput");
  input.select();
  document.execCommand("copy");
}

function goToHowPage() {
  window.location.href = "how.html";
}
