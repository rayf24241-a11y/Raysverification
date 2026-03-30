function verifyCode() {
  const input = document.getElementById("codeInput");
  const result = document.getElementById("result");
  const code = input.value.trim();

  if (!code) {
    result.textContent = "Please enter your code first.";
    result.style.color = "#ffb3b3";
    return;
  }

  if (code === "123456") {
    result.textContent = "Code verified successfully.";
    result.style.color = "#ffffff";
  } else {
    result.textContent = "That code is not correct.";
    result.style.color = "#ffb3b3";
  }
}

function goToHowPage() {
  window.location.href = "how.html";
}

function goBackHome() {
  window.location.href = "index.html";
}