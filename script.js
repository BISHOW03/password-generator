const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const passwordDisplay = document.getElementById("passwordDisplay");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const toggleTheme = document.getElementById("toggleTheme");

lengthSlider.oninput = () => {
  lengthValue.textContent = lengthSlider.value;
};

function generatePassword() {
  const len = parseInt(lengthSlider.value);
  let chars = "";
  if (uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers.checked) chars += "0123456789";
  if (symbols.checked) chars += "!@#$%^&*()_+[]{}|;:,.<>?";

  if (chars === "") {
    passwordDisplay.value = "Select options";
    strengthText.textContent = "-";
    return;
  }

  let password = "";
  for (let i = 0; i < len; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordDisplay.value = password;
  evaluateStrength(password);
}

function evaluateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = ["Weak", "Medium", "Strong", "Very Strong"];
  strengthText.textContent = levels[strength - 1] || "-";
  strengthText.style.color = ["red", "orange", "green", "#00e676"][strength - 1] || "black";
}

generateBtn.onclick = generatePassword;

copyBtn.onclick = () => {
  if (passwordDisplay.value) {
    navigator.clipboard.writeText(passwordDisplay.value);
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1000);
  }
};

toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
};
