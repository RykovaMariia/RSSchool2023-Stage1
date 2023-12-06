const positions = [, 'position_1', 'position_2'];
const imgs = document.querySelectorAll('.slide__image');
const controls = document.querySelectorAll('.control');
let setId;
let setIdd;


  //Slider
    
    startSlide();
    stopAndContinueScroll();

    // Arrow
    arrowRightClickHandler();
    arrowLeftClickHandler();


function startSlide() {
    setId = setInterval(() => {
        scrollRight();
        autofillControl();
    }, 5000)
}
 
function stopAndContinueScroll() {
imgs.forEach(img => {
    img.addEventListener('mouseenter', () => {
        clearInterval(setId);
    });
    img.addEventListener('mouseleave', () => {
        startSlide();
    });
})
}

const autofillControl = () => {
    let position = determinePosition();

    controls.forEach(control => control.classList.remove('control_checked'));
    controls.forEach((control, index) => {
    if(index == position){

        control.classList.add('control_checked');
    }
})


}

function arrowRightClickHandler() {
  document.querySelector(".slider__arrow:last-child ").addEventListener("click", () => {
    clearInterval(setId);
    scrollRight();
    startSlide();
  })
};

function arrowLeftClickHandler () {
    document.querySelector(".slider__arrow:first-child ").addEventListener("click", () => {
        clearInterval(setId);
      let position = determinePosition();
      if (position > 0) {
          removeClassPosition();
          addClassPosition(position - 1);
      } else {
        removeClassPosition();
        addClassPosition(2);
      }
      startSlide();
    })
};

const scrollRight = () => {
let position = determinePosition();
    if (position < 2) {
        removeClassPosition();
        addClassPosition(position + 1);

    } else {
        removeClassPosition();
    }
}

const determinePosition = () => {
    let position;
    document.querySelector(".slider__line").classList.forEach(clazz => {
        if (positions.includes(clazz)) {
            position = positions.indexOf(clazz);
        } else {
            position = 0;
        }
    })
    return position;
}

const removeClassPosition = () => {
  document.querySelector(".slider__line").classList.remove(...positions);
};

const addClassPosition = (position) => {
    document.querySelector(".slider__line").classList.add(`position_${position}`);
};

