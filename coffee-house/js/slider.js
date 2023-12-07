const positions = [, "position_1", "position_2"];
const controls = document.querySelectorAll(".control");

let startId;
let contId;
let checkedId;
let position = 0;
let timeline = 49;
let value;

//Slider
start();

// Arrow
arrowRightClickHandler();
arrowLeftClickHandler();
mouseMoveHandler();

//Auto scroll
function start() {
  checked(position, 49);

  startId = setInterval(() => {
    position = scrollRight();
    value = controls[position].querySelector("progress").value;
    checked(position, 49);
  }, 5000);

}

function cont(timeline) {
  checked(position, 49);

  contId = setTimeout(() => {
    clearChecked();
    position = scrollRight();
    start();
  }, timeline);
}

//Autofill
function checked(position, time) {
  checkedId = setInterval(() => {
    if (value <= 100) {
      value++;
    } else {
      value = 0;
    }
    controls[position].querySelector("progress").value = value;
  }, time);
}

//Clear
function clearChecked() {
  clearInterval(checkedId);
  controls.forEach((el) => (el.querySelector("progress").value = 0));
}

function clearCheck() {
  clearInterval(checkedId);
  value = controls[position].querySelector("progress").value;
  console.log(value);
}

function clearStart() {
  clearInterval(startId);
}

function clearCont() {
    clearInterval(contId);
  }

//Arrow
function arrowRightClickHandler() {
  document
    .querySelector(".slider__arrow:last-child ")
    .addEventListener("click", () => {
      clearStart();
      scrollRight();
      position = determinePosition();
      value = 0;
      start();
    });
}

function arrowLeftClickHandler() {
  document
    .querySelector(".slider__arrow:first-child ")
    .addEventListener("click", () => {
      clearStart();
      clearChecked();
      position = determinePosition();
      if (position > 0) {
        removeClassPosition();
        position -= 1;
      } else {
        removeClassPosition();
        position = 2;
      }
      addClassPosition(position);
      value = 0;
      start();
    });
}

function mouseMoveHandler() {
    document.querySelectorAll(".slide__image").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      clearStart();
      clearCont(); 
      clearCheck();
    });
    img.addEventListener("mouseleave", () => {
      position = determinePosition();
      timeline = (100 - value) * 50;
      cont(timeline);
    });
  });
}

//
const scrollRight = () => {
  position = determinePosition();
  clearChecked();
  if (position < 2) {
    removeClassPosition();
    addClassPosition(++position);
  } else {
    removeClassPosition();
    position = 0;
  }
  return position;
};

const determinePosition = () => {
  let position;
  document.querySelector(".slider__line").classList.forEach((clazz) => {
    if (positions.includes(clazz)) {
      position = positions.indexOf(clazz);
    } else {
      position = 0;
    }
  });
  return position;
};

const removeClassPosition = () => {
  document.querySelector(".slider__line").classList.remove(...positions);
};

const addClassPosition = (position) => {
  document.querySelector(".slider__line").classList.add(`position_${position}`);
};
