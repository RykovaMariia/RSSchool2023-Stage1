import productList from "../products.json" assert { type: "json" };
import { Product } from "./Product.js";

const tabs = document.querySelectorAll(".tab");
console.log(productList);

window.onload = function () {
  //Tabs
  addTabsClickHandler();
};

const addTabsClickHandler = () => {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      removeCheckedTabs();
      addCheckedTabs(tab);

      if (productList) {
        renderProductsToDom(productList, tab.innerText);
      }
    });
  });
};

const removeCheckedTabs = () => {
  tabs.forEach((tab) => tab.classList.remove("tab_checked"));
};

const addCheckedTabs = (tab) => {
  tab.classList.add("tab_checked");
};

const renderProductsToDom = (productList, categoryCard) => {
  let menuContainer = cleanContainer();
  console.log(generateProducts(productList, categoryCard));
  menuContainer.append(...generateProducts(productList, categoryCard));
};

const cleanContainer = () => {
  let container = document.querySelector(".menu-coffee");
  container.innerHTML = "";
  return container;
};

const generateProducts = (productList, categoryCard) => {
  let productCards = [];

  productList.forEach((productCard) => {
    if (productCard.category.toLowerCase() === categoryCard.toLowerCase()) {
      productCards.push(new Product(productCard).generateProduct());
    }
  });
  return productCards;
};
