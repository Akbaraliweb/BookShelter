"use strict";

let elForm = document.querySelector(".form");
let elUsernameInput = document.querySelector(".input-username");
let elPasswordInput = document.querySelector(".input-password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const usernameValue = elUsernameInput.value;
  const passwordValue = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("index.html");
      }
    });

  //   console.log(usernameValue, passwordValue);
});
