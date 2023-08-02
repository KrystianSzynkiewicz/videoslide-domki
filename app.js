
const arrowRight = document.querySelector(".arrow__right");
const arrowLeft = document.querySelector(".arrow__left");
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const slide4 = document.querySelector(".slide4");
const body = document.querySelector("body");

let currentSlideNumber = 1;

const hideSlide = () => {
    let nowActiveSlide = document.querySelector(".active");
    nowActiveSlide.classList.remove("fade__up");
    nowActiveSlide.classList.add("fade__down");
    setTimeout(() => {
        nowActiveSlide.classList.remove("active");
        setTimeout(()=> {
            nowActiveSlide.classList.remove("fade__down");
        }, 1000)
    }, 1000)

};

const activeSlide = (slideNumber) => {
    hideSlide();
    document.querySelector("#slide"+slideNumber).classList.add("active");
    document.querySelector("#slide"+slideNumber).classList.add("fade__up");
}

const showNextSlide = () => {

    console.log(currentSlideNumber);
    if (currentSlideNumber === 4 ) {
        currentSlideNumber = 1;
    } else {
        currentSlideNumber++;
    }
    activeSlide(currentSlideNumber);
    //waiting after right arrow click
    arrowRight.removeEventListener("click", showNextSlide);
    setTimeout(arrowRightFunctionON, 1100)

    //waiting after right keyboard click
    document.removeEventListener("keydown", keyboardArrowFunction);
    setTimeout(keyboardArrowFunctionOn, 1100);
    
    //waiting after touchmove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.removeEventListener("touchstart", startTouch);
    setTimeout(startTouchON, 1000);
    //waiting after touchmove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.removeEventListener("touchend", endTouch);
    setTimeout(endTouchON, 1000);
}
const showPreviousSlide = () => {

    console.log(currentSlideNumber);
    if (currentSlideNumber === 1 ) {
        currentSlideNumber = 4;
    } else {
        currentSlideNumber--;
    }
    activeSlide(currentSlideNumber);
    //waiting after left arrow click
    arrowLeft.removeEventListener("click", showPreviousSlide);
    setTimeout(arrowLeftFunctionON, 1100)

    //waiting after left keyboard click
    document.removeEventListener("keydown", keyboardArrowFunction);
    setTimeout(keyboardArrowFunctionOn, 1100);

    //waiting after touchmove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.removeEventListener("touchstart", startTouch);
    setTimeout(startTouchON, 1000);
    //waiting after touchmove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.removeEventListener("touchend", endTouch);
    setTimeout(endTouchON, 1000);

};

//function on buttons
const arrowRightFunctionON = () => {
    arrowRight.addEventListener("click", showNextSlide);
}
arrowRightFunctionON();


const arrowLeftFunctionON = () => {
    arrowLeft.addEventListener("click", showPreviousSlide);
};
arrowLeftFunctionON();
//end -- functions on buttons

//function on keybord arrows
const keyboardArrowFunction = (e) => {
    if (e.code === "ArrowRight" || e.keyCode === 39) {

        showNextSlide();
    }
    if (e.code === "ArrowLeft" || e.keyCode === 37) {
        showPreviousSlide();
    }
}
const keyboardArrowFunctionOn = () => {
    document.addEventListener("keydown", keyboardArrowFunction);
};
keyboardArrowFunctionOn();
//end -- function on keybord arrows

// function on scroll 
// after scroll wait 1100 ms -> delet addEvent and add again
// TRZEBA SPRAWDZIĆ WARTOŚCI E - deltaY !!! było 125 teraz jest 20
const scrollFunction = (e) => {
    // console.log(e)
    if (e.deltaY > 20) {
        console.log("body scroll DOWN");
        showNextSlide();
    } else if (e.deltaY < -20) {
        console.log("body scroll UP");
        showPreviousSlide();
    }
    body.removeEventListener("wheel", scrollFunction);
    setTimeout(addScroll, 1100);
};

const addScroll = () => {
    body.addEventListener("wheel", scrollFunction);
}
addScroll();
//end -- function on scroll

let coordinatesStart = null;
let coordinatesEnd = null;
let coordinatesResult = null;

//function on move
    const startTouch = (e) => {
        [...e.changedTouches].forEach(touch => {
            // console.log("start touch");
            // console.log(touch.pageY);
            coordinatesStart = touch.pageY; 
        });
    }
    const startTouchON = () => {
        document.addEventListener("touchstart", startTouch);
    }
    startTouchON();

    const endTouch = (e) => {
        [...e.changedTouches].forEach(touch => {
            // console.log("end touch");
            // console.log(touch.pageY);
            coordinatesEnd = touch.pageY;
            coordinatesResult=coordinatesEnd-coordinatesStart;
            // console.log(coordinatesResult);
        });
    };

    const endTouchON = () => {
        document.addEventListener("touchend", endTouch);
    };
    endTouchON();

const checkerCoor = () => {
    if (coordinatesResult<-150) {
        showNextSlide();

        coordinatesResult = null;
    } else if (coordinatesResult>150) {
        showPreviousSlide();

        coordinatesResult = null;
    } else if (coordinatesResult==null) {
        // console.log("null / reset null");
    };
};
setInterval(checkerCoor, 1000);

// END OF SLIDES SCROLLING --------------
