const positions = [, "position_1", "position_2"];
const controls = document.querySelectorAll(".control");
const arrows = document.querySelectorAll(".slider__arrow");

let startId;
let contId;
let autofillId;

let timeline = 49;

start(0);
arrowRightClickHandler();
arrowLeftClickHandler();
mouseMoveHandler();

//Auto scroll
function start(position) {
  autofill(position, 49, 0);

  startId = setInterval(() => {
    clearAutofill();

    position = scrollRight();
    let value = controls[position].querySelector("progress").value;
    autofill(position, 49, value);
  }, 5000);
}

function continueFill(position, timeline, value) {
  autofill(position, 49, value);

  contId = setTimeout(() => {

    clearAutofill();
    position = scrollRight();

    start(position);

  }, timeline);
}

//Autofill
function autofill(position, time, value) {
  autofillId = setInterval(() => {
    if (value <= 100) {
      value++;
    }
    controls[position].querySelector("progress").value = value;
  }, time);
}

//Clear
function clearAutofill() {
  clearInterval(autofillId);
  controls.forEach((el) => (el.querySelector("progress").value = 0));
}

function clearAutofillPause() {
  clearInterval(autofillId);
  let position = determinePosition();
  let value = controls[position].querySelector("progress").value;
  console.log(value);
  return value;
}

//Arrow
function arrowRightClickHandler() {
  arrows[1].addEventListener("click", () => {
    clearInterval(startId);
    clearInterval(contId);
    clearAutofill();
    

    let position = scrollRight();

    start(position);
  });
}

function arrowLeftClickHandler() {
  arrows[0].addEventListener("click", () => {
    let position = determinePosition();

    clearInterval(startId);
    clearInterval(contId);
    clearAutofill();

    if (position > 0) {
      removeClassPosition();
      position -= 1;
    } else {
      removeClassPosition();
      position = 2;
    }

    addClassPosition(position);

    start(position);
  });
}

function mouseMoveHandler() {
  document.querySelectorAll(".slide__image").forEach((img) => {
    let value;

    img.addEventListener("mouseenter", () => {
      clearInterval(startId);
      clearInterval(contId);
      value = clearAutofillPause();
    });

    img.addEventListener("mouseleave", () => {
      let position = determinePosition();
      console.log(position);
      timeline = (100 - value) * 50;

      continueFill(position, timeline, value);
    });

  });
}


//
function scrollRight() {
  let position = determinePosition();

  if (position < 2) {
    removeClassPosition();
    addClassPosition(++position);
  } else {
    removeClassPosition();
    position = 0;
  }

  return position;
}

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
