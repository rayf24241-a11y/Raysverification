function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const code = input.value.trim();

  if (code === "") {
    result.textContent = "Please enter a code.";
    result.style.color = "#ff6666";
    return;
  }

  if (code === "735345") {
    result.textContent = "Code verified successfully.";
    result.style.color = "#00ff88";
  } else {
    result.textContent = "That code is not correct.";
    result.style.color = "#ff6666";
  }
}

function toggleHowToGet() {
  const howBox = document.getElementById("howBox");
  howBox.classList.toggle("hidden");
}