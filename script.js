const version = "v2.0.0";

function setActive(button) {
  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

function showPage(page) {
  const content = document.getElementById("content");

  // set active tab
  const buttons = document.querySelectorAll(".tabs button");
  buttons.forEach(btn => {
    if (btn.innerText.toLowerCase() === page) {
      setActive(btn);
    }
  });

  if (page === "home") {
    content.innerHTML = `
      <h1>Updates</h1>

      <div class="card">
        <h3>🚀 Website V2</h3>
        <p>New UI, animations, and tabs added.</p>
      </div>

      <div class="card">
        <h3>🔧 Coming Soon</h3>
        <p>Discord verification system + AI tools.</p>
      </div>
    `;
  }

  if (page === "market") {
    content.innerHTML = `
      <h1>Animal Company</h1>

      <div class="card">
        <h3>Max Money</h3>
        <p>9.99M Coins</p>
        <button class="button">Purchase</button>
      </div>
    `;
  }

  if (page === "verify") {
    content.innerHTML = `
      <h1>Verify</h1>

      <div class="card">
        <p>Enter your Discord code:</p>
        <input id="codeInput" placeholder="Enter code">
        <br>
        <button class="button" onclick="fakeVerify()">Verify</button>
        <p id="result"></p>
      </div>
    `;
  }

  if (page === "creation") {
    content.innerHTML = `
      <h1>Creation Tools</h1>

      <div class="card">
        <h3>🧠 AI Builder</h3>
        <p>Generate scripts, mods, and tools.</p>
        <button class="button">Open</button>
      </div>

      <div class="card">
        <h3>⚙️ Mod Creator</h3>
        <p>Create mods for Unity, Steam, and VR games.</p>
        <button class="button">Start</button>
      </div>
    `;
  }

  // version display
  document.body.innerHTML += `<div class="version">${version}</div>`;
}

// fake verify for now
function fakeVerify() {
  const code = document.getElementById("codeInput").value;
  const result = document.getElementById("result");

  if (code === "123456") {
    result.innerText = "Verified ✅";
  } else {
    result.innerText = "Invalid code ❌";
  }
}

// load default
showPage("home");