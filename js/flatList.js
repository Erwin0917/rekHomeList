(function () {
    "use strict";

    const sortBtns = document.querySelectorAll("[data-sort]");

    const config = {
        url: "https://erwin0917.github.io/rekHomeList/flats_list.JSON",
        wrapper: ".flats__list tbody",
        perPage: 10,
        system: {
            filtered: false
        }
    };

    class flatList {

        constructor(listContainer, urlList, perPage) {
            this.listContainer = listContainer;
            this.urlList = urlList;
            this.perPage = perPage;
        }

        init() {
            this.generateList();
        }

        getList(url) {
            const xhr = new XMLHttpRequest();

            let data = null;

            xhr.open("GET", url);

            let p = new Promise(function (resolve, reject) {

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                        data = JSON.parse(xhr.response);
                        resolve(data);
                    }
                };

                xhr.onerror = function () {
                    reject(new Error("Wystąpił błąd pobierania danych"));
                };
            });

            xhr.send(null);

            return p;
        }

        generateList() {
            this.getList(this.urlList)
                .then(
                    (list) => {
                        filterList.init(list);

                        [].forEach.call(sortBtns, (e) => {
                            e.addEventListener("click", (e) => {
                                if (!config.system.filtered) {
                                    list = sortList.init(list, e.target);

                                    if ( Array.isArray(list)) {
                                        return DOMcreator.pagination(DOMcreator.generateDOM(list), this.perPage);

                                    }
                                }
                            }, false);
                        });

                        DOMcreator.pagination(DOMcreator.generateDOM(list), this.perPage);
                    }
                ).catch();
        }






    }

    const DOMcreator = {
        generateDOM(listObject) {

            let flatArr = [];

            for (let flat in listObject) {

                let statusClass = ""; //css class for flor status html elem

                const price = () => {// format price

                    const part1 = (listObject[flat].price).split("").slice(0, 3).join("");
                    const part2 = (listObject[flat].price).split("").slice(3).join("");

                    return `${part1} ${part2}`;
                };


                switch (listObject[flat].status) {
                    case "wolny":
                        statusClass = "flats__list--available";
                        break;

                    case "rezerwacja":
                        statusClass = "flats__list--reservation";
                        break;
                    case "sprzedany":
                        statusClass = "flats__list--sold";
                        break;
                }


                const flatTableElement = `<tr>
            <td>${listObject[flat].flat_nr}</td>
            <td>${listObject[flat].floor}</td>
            <td>${listObject[flat].main_size} m²</td>
            <td>${listObject[flat].adds} ${listObject[flat].adds_size} m²</td>
            <td>${price()} zł</td>
            <td>
                <a class="flats__list--link" href="${listObject[flat].plan}">pobierz</a>
            </td>
            <td class="${statusClass}">${listObject[flat].status}</td>
        </tr>`;

                flatArr.push(flatTableElement);
            }
            return flatArr;
        },

        pagination(list, perPage) {

            const pages = Math.ceil(list.length / perPage);

            const paginationWrapper = document.querySelector(".flats__pagination ol");

            paginationWrapper.innerHTML = "";


            let thePage = null;

            if (pages !== 1) {
                for (let i = 1; i <= pages; i++) {
                    let nodeWrapper = document.createElement("li");
                    nodeWrapper.classList.add("flats__pagination__item");
                    nodeWrapper.dataset.page = i;
                    nodeWrapper.innerText = i;

                    paginationWrapper.appendChild(nodeWrapper);

                }

                let links = [...paginationWrapper.querySelectorAll(".flats__pagination__item")];

                links[0].classList.add("flats__pagination__item--active");
                //set page after click
                for (let link of links) {
                    link.addEventListener("click", () => {
                        thePage = this.setPage(link.dataset.page, list, perPage);
                        this.renderPage(thePage);
                        for (let link of links) {
                            link.classList.remove("flats__pagination__item--active");
                        }
                        link.classList.add("flats__pagination__item--active");

                    }, false);
                }

            }
            //set first page
            thePage = this.setPage(1, list, perPage);
            this.renderPage(thePage);


        },

        setPage(pageNr, list, perPage) {

            let thePage = null;
            let cutFrom = (pageNr * perPage) - perPage;
            thePage = list.slice(cutFrom, perPage * pageNr);

            return thePage;
        },

        renderPage(page) {
            const container = document.querySelector(".flats__list tbody");

            let renderPage = "";
            for (let item of page) {
                renderPage += item;
            }

            container.innerHTML = renderPage;
        }
    };


    const filterList = {

        init(RAWlist) {

            this.filtrBtn = document.querySelector(".options__filtrBtn");
            this.options = document.querySelectorAll(".options__wrapper .multiselect__wrapper input");

            this.filtrBtn.addEventListener("click", () => {
                let filterList = {};

                const checkboxes = document.querySelectorAll(".checkboxes");
                //hide all checkboxes
                for (let box of checkboxes) {
                    box.style.display = "none";
                }

                //find checked
                for (let input of this.options) {

                    if (input.checked) {

                        // if more then one select option for same property
                        if (filterList[input.dataset.filter]) {
                            let newArrey = [];

                            if (typeof (filterList[input.dataset.filter]) === "object" && filterList[input.dataset.filter].length > 1) {
                                newArrey = [...filterList[input.dataset.filter], input.id];
                            } else {
                                newArrey = [filterList[input.dataset.filter]];
                                newArrey.push(input.id);
                            }
                            filterList[input.dataset.filter] = newArrey;
                        } else {
                            // if select only one option for property
                            filterList[input.dataset.filter] = input.id;
                        }
                    }
                }

                this.generateList(filterList, RAWlist);
            }, false);
        },

        generateList(tags, RAWlist) {

            if (Object.keys(tags).length === 0) {
                config.system.filtered = false;
                return DOMcreator.pagination(DOMcreator.generateDOM(RAWlist), config.perPage);
            }

            config.system.filtered = true;

            let filteredList = Object.assign({}, RAWlist);

            let flatList = [];
            let tagsList = [];
            //generate flat list as array
            for (let item in RAWlist) {
                let tempArray = [];
                for (let prop in RAWlist[item]) {

                    tempArray.push(prop + " " + RAWlist[item][prop]);
                }
                flatList.push(tempArray);
            }
            //generate tags to filtering list as array
            for (let key in tags) {
                let tempArray = [];

                if (typeof tags[key] === "string") {
                    tempArray = [key + " " + tags[key]];
                } else {
                    for (let tag in tags[key]) {
                        tempArray.push(key + " " + tags[key][tag]);
                    }
                }
                tagsList.push(tempArray);
            }

            // filtration

            for (let i in tags) {

                //more then one filetred option ex => status:wolny, price:lvl1
                if (tags[i].length > 1) {
                    for (let j in filteredList) {
                        if (i === "price") {
                            switch (tags[i]) {
                                case "price1":
                                    if (filteredList[j][i] >= "150000") {
                                        delete filteredList[j];
                                    }
                                    break;

                                case "price2":
                                    if (filteredList[j][i] <= "150000" || filteredList[j][i] >= "200000") {
                                        delete filteredList[j];
                                    }
                                    break;
                                case "price3":
                                    if (filteredList[j][i] <= "200000" || filteredList[j][i] >= "300000") {
                                        delete filteredList[j];
                                    }
                                    break;
                                case "price4":
                                    if (filteredList[j][i] <= "300000" || filteredList[j][i] >= "400000") {
                                        delete filteredList[j];
                                    }
                                    break;
                                case "price5":
                                    if (filteredList[j][i] <= "400000") {
                                        delete filteredList[j];
                                    }
                                    break;
                            }


                        } else if (!(removeAccents(filteredList[j][i]) === tags[i])) {
                            delete filteredList[j];

                        }

                    }
                } else {
                    for (let flat of flatList) {
                        for (let tag of tagsList) {

                            //simply ex=> status: wolny
                            for (let inFlat of flat) {
                                if (removeAccents(inFlat) === tag.toString()) {
                                    filteredList.push(flat);
                                }
                            }

                        }
                    }
                }
            }



            if (isEmpty(filteredList)) {
                alert("Brak mieszkań - prosze wybrać inne opcje filtrowania");
                filteredList = RAWlist;
            }

            let list = DOMcreator.generateDOM(filteredList);

            [].forEach.call(sortBtns, (e) => {
                e.addEventListener("click", (e) => {
                    if (config.system.filtered) {
                        list = sortList.init(filteredList, e.target);
                        if (Array.isArray(list)) {
                            DOMcreator.pagination(DOMcreator.generateDOM(list), config.perPage);
                        }

                    }
                }, false)
            });


            DOMcreator.pagination(list, config.perPage);

        }

    };

    const sortList = {

        init(list, target) {

            [].forEach.call(sortBtns, (item)=>item.classList.remove("sort--active"));

            let newArr = [];
            for(let item in list ){
                newArr.push(list[item]);
            }

            if(target.dataset.sort === "adds_size"){
                switch (target.classList.contains("sort__up")) {
                    case false:
                    console.log(newArr.sort(this.dynamicSort("-adds_size")));
                    target.classList.add("sort--active");
                        break;

                    case true:
                    console.log(newArr.sort(this.dynamicSort("adds_size")));
                    target.classList.add("sort--active");
                        break;
                }
            }else{
                switch (target.classList.contains("sort__up")) {
                    case false:

                    newArr.sort(this.dynamicSort(`-${target.dataset.sort}`) );
                    target.classList.add("sort--active");

                        break;

                    case true:

                    newArr.sort(this.dynamicSort(target.dataset.sort));
                    target.classList.add("sort--active");

                        break;
                }
            }

            return newArr;
        },

        dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
    };


    function removeAccents(string) {
        const accents =
            "ĄąĆćĘęŁłÓóŚśŻżŹźŃń";
        const accentsOut =
            "AAaaEeLlOoSsZzZzNn";
        return string
            .split("")
            .map((letter) => {
                const accentIndex = accents.indexOf(letter);
                return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
            })
            .join("");
    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    const mainList = new flatList(config.wrapper, config.url, config.perPage);

    mainList.init();

})();

