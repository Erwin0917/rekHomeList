(function(){
"use strict";

/* Slider */
const slider = {

    slides(wrapper){
        return([].slice.call(document.querySelectorAll(`.${wrapper} .slider__item`)));
    },

    run(wrapper, navWrapper, time){
        const slidesArr = this.slides(wrapper);

        let interval = setInterval(() => {
            slider.next(slidesArr);
        }, time);

        const prevBtn = document.querySelector(`.${navWrapper} .nav__prev`);
        const nextBtn = document.querySelector(`.${navWrapper} .nav__next`);


        prevBtn.addEventListener("click", ()=>{
            clearInterval(interval);
            slider.prev(slidesArr);

            interval = setInterval(() => {
                slider.next(slidesArr);
            }, time);
        },false);

        nextBtn.addEventListener("click", ()=>{
            clearInterval(interval);
            slider.next(slidesArr);

            interval = setInterval(() => {
                slider.next(slidesArr);
            }, time);
        },false);
    },

    prev(slidesList){

        for(let slide in slidesList){
            slidesList[slide].classList.remove("slider__item--off");
        }

        for(let slide in slidesList){

            if(slidesList[slide].classList.contains("slider__item--active")){
                let next = Number.parseInt(slide) + 1 ;
                let before = Number.parseInt(slide) - 1;


                if(slidesList[next] === undefined) next = 0;
                if(slidesList[before] === undefined) before = (slidesList.length - 1);


                slidesList[slide].classList.remove("slider__item--active");
                slidesList[slide].classList.add("slider__item--off");
                slidesList[before].classList.add("slider__item--active");
                slidesList[before].classList.remove("slider__item--off");

                return;
            }

        }
    },

    next(slidesList){

        for(let slide in slidesList){
            slidesList[slide].classList.remove("slider__item--off");
        }

        for(let slide in slidesList){

            if(slidesList[slide].classList.contains("slider__item--active")){
                let next = Number.parseInt(slide) + 1 ;
                let before = Number.parseInt(slide) - 1;


                if(slidesList[next] === undefined) next = 0;
                if(slidesList[before] === undefined) before = (slidesList.length - 1);

                slidesList[next].classList.add("slider__item--active");
                slidesList[slide].classList.add("slider__item--off");
                slidesList[slide].classList.remove("slider__item--active");
                slidesList[before].classList.remove("slider__item--off");

                return;
            }

        }
    }


};



slider.run("main__slider__wrapper", "main__slider__nav", 5500);



/* Mobile menu */

const mobileMenu = {

    btn:document.querySelector(".nav__mobileBtn"),
    menu:document.querySelector(".nav__main ul"),

    init(){
        this.btn.addEventListener("click", ()=>{
            this.btn.classList.toggle("nav__mobileBtn--up");
            if(this.menu.classList.contains("on")){
                this.menu.classList.remove("on");
            }else this.menu.classList.add("on");
        },false);
    }

};

mobileMenu.init();


/* choose list with checkboxes */
let expanded = false;
function showCheckboxes(id){
    let checkboxes = document.querySelector(`#${id} .checkboxes`);

    if(!expanded){
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
const selectBoxes = Array.apply(null, document.querySelectorAll(".multiselect__wrapper"));

for (let box of selectBoxes){
    box.addEventListener("click", ()=>{
        showCheckboxes(box.id);
    }, false);
}



/* table moving mobile */

const tableNavi = {

    leftBtn: document.querySelector(".table__mobileBtn__left"),
    rightBtn: document.querySelector(".table__mobileBtn__right"),
    table: document.querySelector("table.flats__list"),

    run(){
        this.leftBtn.addEventListener("click", this.moveLeft, false);
        this.rightBtn.addEventListener("click", this.moveRight, false);
    },

    moveLeft(){
        if(!tableNavi.active(tableNavi.leftBtn)) return;

        if(tableNavi.table.style.left === ""){
            tableNavi.table.style.left = 0 + "px";
        }

        tableNavi.table.style.left = parseInt(tableNavi.table.style.left)  + 90 + "px" ;

        if( (tableNavi.table.offsetLeft) >= -80 ){
            tableNavi.leftBtn.classList.add("table__mobileBtn--off");
        }

        if( tableNavi.table.offsetLeft <= 10) {
            tableNavi.rightBtn.classList.remove("table__mobileBtn--off");
        }

    },

    moveRight(){
        if(!tableNavi.active(tableNavi.rightBtn)) return;

        if(tableNavi.table.style.left === ""){
            tableNavi.table.style.left = 0 + "px";
        }

        tableNavi.table.style.left = parseInt(tableNavi.table.style.left) - 90 + "px" ;

        if( (tableNavi.table.offsetLeft + 631 ) <= window.innerWidth + 90){
            tableNavi.rightBtn.classList.add("table__mobileBtn--off");
        }

        if( -(tableNavi.table.offsetLeft) >=  -80 ){
            tableNavi.leftBtn.classList.remove("table__mobileBtn--off");
        }
    },

    active(btn){
        if( btn.classList.contains("table__mobileBtn--off") ) return false;
        return true;
    }

};

tableNavi.run();



/* ================ */
/* ================  */
/* ================  */

const showFormBtn = document.querySelector(".showContact");
const formWrapper = document.querySelector(".contact .col--3");

showFormBtn.addEventListener("click",()=>{

    showFormBtn.classList.toggle("showContact--on");
    if(showFormBtn.innerText === "POKAŻ FORMULARZ"){
        showFormBtn.innerHTML = `SCHOWAJ FORMULARZ<span class="arrow"></span>`;
        formWrapper.style.height = "auto";
    }else {
        showFormBtn.innerHTML = `POKAŻ FORMULARZ<span class="arrow"></span>`;
        formWrapper.style.height = "0";
    }
},false);


})();

