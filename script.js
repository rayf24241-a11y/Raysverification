async function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const verifyBtn = document.getElementById("verifyBtn");
  const btnText = verifyBtn.querySelector(".btn-text");
  const btnLoader = verifyBtn.querySelector(".btn-loader");
  const successBox = document.getElementById("successBox");

  const code = input.value.trim().toUpperCase();

  result.textContent = "";
  result.className = "result";
  successBox.classList.add("hidden");

  if (!code) {
    result.textContent = "Enter a code first.";
    result.classList.add("error");
    return;
  }

  verifyBtn.disabled = true;
  verifyBtn.classList.add("loading");
  btnText.textContent = "Verifying...";
  btnLoader.classList.remove("hidden");

  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (data.success) {
      result.textContent = "Verified successfully.";
      result.classList.add("success");
      successBox.classList.remove("hidden");
      input.value = "";
    } else {
      result.textContent = data.message || "Invalid code.";
      result.classList.add("error");
    }
  } catch (error) {
    result.textContent = "Error verifying code.";
    result.classList.add("error");
    console.error(error);
  } finally {
    verifyBtn.disabled = false;
    verifyBtn.classList.remove("loading");
    btnText.textContent = "Verify";
    btnLoader.classList.add("hidden");
  }
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const active = document.activeElement;
    if (active && active.id === "codeInput") {
      verifyCode();
    }
  }
});
