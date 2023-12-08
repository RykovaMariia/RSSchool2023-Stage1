const burgerMenu = document.querySelector(".burger__menu");

window.onload = function () {
  //Burger
  buttonBurgerClickHandler();
  linksClickHandler();
  
};

const buttonBurgerClickHandler = () => {
  document.querySelector(".burger").addEventListener("click", () => {
    if (burgerMenu.classList.contains("burger__menu_opened")) {
      closeBurgerMenu();
      closeButtonBurger();
      addScroll();
    } else {
      openBurgerMenu();
      openButtonBurger();
      removeScroll();
    }
  });
};

const linksClickHandler = () => {
  const links = document.querySelectorAll(".navigation a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
        closeBurgerMenu();
        closeButtonBurger();
        addScroll();
    });
  });
};

const openBurgerMenu = () => {
  burgerMenu.classList.add("burger__menu_opened");
};

const closeBurgerMenu = () => {
  burgerMenu.classList.remove("burger__menu_opened");
};

const openButtonBurger = () => {
  document.querySelector(".burger").classList.add("burger_opened");
};

const closeButtonBurger = () => {
  document.querySelector(".burger").classList.remove("burger_opened");
};

const removeScroll = () => {
  document.body.classList.add("lock");
};

const addScroll = () => {
  document.body.classList.remove("lock");
};
