const loginForm = document.getElementById("loginForm");
const sqlQuery = document.getElementById("sqlQuery");
const result = document.getElementById("result");
const secureToggle = document.getElementById("secureToggle");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const secureMode = secureToggle.checked;

  let query;
  let output;

  if (secureMode) {
    query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    output = "✅ Secure Mode: SQL Injection Prevented. Using Parameterized Query.";
  } else {
    query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    if (
      username.includes("' OR") ||
      password.includes("' OR") ||
      username.includes("'--") ||
      password.includes("'--") ||
      username === "admin' --" ||
      username === "' OR '1'='1"
    ) {
      output = "🔓 SQL Injection Successful: Logged in as admin!";
    } else {
      output = "❌ Login Failed: Invalid credentials.";
    }
  }

  sqlQuery.textContent = query;
  result.textContent = output;
});