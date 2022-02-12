"use strict";

const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
const elLoading = document.querySelector(".site-body");
const elLoadingimg = document.querySelector(".loading");
const elTemplate = document.querySelector(".template").content;
const elBtn = document.querySelector(".buttons");
const elBtnTenNext = document.querySelector(".btnten");
const elBtnTenPrev = document.querySelector(".btn-minus-ten");

const API_KEY = "b1566df1";
let search = "spider";
let page = 1;
let btnId = 1;

// RENDER
const renderMovies = function (arr, element) {
  setTimeout(() => {
    if (arr.length > 0) {
      elLoading.style.display = "block";
      elLoadingimg.style.display = "none";

      const filmsFragment = document.createDocumentFragment();

      arr.forEach((item) => {
        const clonedFilmTemplate = elTemplate.cloneNode(true);

        clonedFilmTemplate.querySelector(".film__img").src = item.Poster;
        clonedFilmTemplate.querySelector(".film__title").textContent =
          item.Title;
        clonedFilmTemplate.querySelector(".film__year").textContent = item.Year;
        clonedFilmTemplate.querySelector(".film__type").textContent = item.Type;

        filmsFragment.appendChild(clonedFilmTemplate);
      });

      element.appendChild(filmsFragment);
    } else {
      alert("Malumotlar topilmadi!!!");
    }
  }, 500);
};

// API
const getMovies = async function () {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );

  const data = await response.json();

  if (data.Response === "True" && data.Search.length > 0) {
    renderMovies(data.Search, elList);

    let result = Math.floor(data.totalResults / 10 + 1);

    for (let index = 1; index <= result; index++) {
      let newBtn = document.createElement("button");

      newBtn.textContent = index;

      newBtn.setAttribute("class", "page__btn");
      newBtn.setAttribute("id", index);

      elBtn.appendChild(newBtn);
    }

    if (page == 1) {
      elNextBtn.disabled = false;
      elPrevBtn.disabled = true;
    } else if (page == result) {
      elNextBtn.disabled = true;
      elPrevBtn.disabled = false;
    } else {
      elPrevBtn.disabled = false;
      elNextBtn.disabled = false;
    }
  }
};

getMovies();

// SEARCH BTN
elInput.addEventListener("change", function (evt) {
  elLoading.style.display = "none";
  elLoadingimg.style.display = "block";
  elBtnTenNext.setAttribute("href", "#1");
  btnId = 1;

  setTimeout(() => {
    elList.innerHTML = null;
    elBtn.innerHTML = null;

    search = evt.target.value;
    getMovies();
  }, 500);
});

// NEXT BTN
elNextBtn.addEventListener("click", function () {
  elList.innerHTML = null;
  elBtn.innerHTML = null;

  elLoading.style.display = "none";
  elLoadingimg.style.display = "block";

  setTimeout(() => {
    btnId++;
    elBtnTenNext.setAttribute("href", `#${btnId}`);
    page++;
    getMovies();
  }, 500);
});

// PREV BTN
elPrevBtn.addEventListener("click", function () {
  elList.innerHTML = null;
  elBtn.innerHTML = null;

  elLoading.style.display = "none";
  elLoadingimg.style.display = "block";

  setTimeout(() => {
    btnId--;
    elBtnTenNext.setAttribute("href", btnId);
    page--;
    getMovies();
  }, 500);
});

// PAGE BTN
elBtn.addEventListener("click", function (e) {
  elList.innerHTML = null;
  elBtn.innerHTML = null;

  elLoading.style.display = "none";
  elLoadingimg.style.display = "block";

  setTimeout(() => {
    page = e.target.textContent;
    getMovies();
  }, 500);
});

// NEXT and PREV 10 page btn
elBtnTenPrev.setAttribute("class", "none btn-top prev-ten");

elBtnTenNext.addEventListener("click", function () {
  let btnPlus = btnId++ * 10;
  console.log(btnPlus);
  if (btnPlus > 0) {
    elBtnTenNext.setAttribute("href", `#${btnPlus}`);
    elBtnTenPrev.setAttribute("href", `#${btnPlus}`);
  } else {
    elBtnTenNext.disabled = true;
  }

  elBtnTenPrev.classList.remove("none");
});

elBtnTenPrev.addEventListener("click", function () {
  let btnPluss = btnId-- * 10;
  console.log(btnPluss);
  if (btnPluss > 0) {
    elBtnTenNext.setAttribute("href", `#${btnPluss}`);
    elBtnTenPrev.setAttribute("href", `#${btnPluss}`);
  } else {
    elBtnTenPrev.setAttribute("class", "none btn-top prev-ten");
  }
});
