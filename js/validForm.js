(function () {
    "use strict";

    const btn = document.querySelector(".contact form .sendForm");

    btn.addEventListener("click", (e) => {

        const isOk = valid();

        if(!isOk){
            e.preventDefault();
        }
    }, false);

    function valid() {
        const valideNode = document.querySelectorAll("[data-valide]");

        for(let input of valideNode){
            input.classList.remove("error");

            if(input.value == ""){
                input.classList.add("error");

                return false;
            }

            if(input.dataset.valide === "capta"){
                if(input.value !== "AXK65GH"){
                    input.classList.add("error");
                    return false;
                }
            }
        }

        return true;

    }


})();