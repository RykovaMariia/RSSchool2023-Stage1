import productList from "../products.json" assert { type: "json" };
import { Product } from "./Product.js";

const tabs = document.querySelectorAll(".tab");
console.log(productList);

window.onload = function () {
  //Tabs
  addTabsClickHandler();
  addCardsLoadMoreClickHandler();
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

const addCardsLoadMoreClickHandler = () => {
    document.querySelector('.menu__refresh').addEventListener('click', () => {
        document.querySelectorAll('.menu-item:nth-of-type(n+5)').forEach(card => {
            card.style.display = 'block';
        })
        deleteLoadMore();
    })

}

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
  let count = 0;

  productList.forEach((productCard) => {
    if (productCard.category.toLowerCase() === categoryCard.toLowerCase()) {

      productCards.push(new Product(productCard).generateProduct());
      count++;
    }
  });

  if (count <= 4){
    deleteLoadMore();
  } else {
    addLoadMore();
  }

  return productCards;
};

const deleteLoadMore = () => {
    document.querySelector('.menu__refresh').classList.add('menu__refresh_none');
}

const addLoadMore = () => {
    document.querySelector('.menu__refresh').classList.remove('menu__refresh_none');
}
