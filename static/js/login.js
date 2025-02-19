// document.querySelector("#showPassword").change = (e) => {
//   e.t

// };
document.addEventListener("DOMContentLoaded", (e) => {
  let form = document.querySelector("form");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let resultDivS = document.querySelector(".response.success");
  let resultDivF = document.querySelector(".response.failed");
  let showPasswordCheckbox = document.querySelector("#showPassword");

  email.focus();

  showPasswordCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) password.attributes[0].nodeValue = "text";
    else password.attributes[0].nodeValue = "password";
  });

  resultDivS.children[0].onclick = (e) => {
    resultDivS.style.display = "none";
  };

  resultDivF.children[0].onclick = (e) => {
    resultDivF.style.display = "none";
  };

  // Post Process
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value.toLowerCase(),
        password: password.value.toLowerCase(),
      }),
    }).then((res) => {
      if (!res.ok) {
        resultDivF.style.display = "flex";
        resultDivS.style.display = "none";
      } else {
        resultDivS.style.display = "flex";
        resultDivF.style.display = "none";
      }
    });
  });
});
