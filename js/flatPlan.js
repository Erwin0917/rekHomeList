(function () {
    "use strict";

    const btns = document.querySelectorAll(".plan_desc__buttonsWrapper .btn");

    [].forEach.call(btns, (e) => {
        e.addEventListener('click', (e) => {
            const target = e.target;
            generatePlan(target);
            generateDsc(target);
        }, false);
    });

    function generatePlan(item) {
        const wrapper = document.querySelector(".plan_img");
        const newItemNr = item.dataset.part;

        let newPlan = `<img src="img/plan${newItemNr}.png" alt="Plan nr${newItemNr}">`;

        wrapper.innerHTML = newPlan;

    }

    function generateDsc(item) {
        const wrapper = document.querySelector(".plan_desc__table");
        const newItemNr = item.dataset.part;

        let newDesc = null;

        switch (newItemNr) {
            case "2":

                newDesc = table2;
                break;
            case "3":
                newDesc = table3;
                break;
            case "4":
                newDesc = table4;
                break;

            default:
                newDesc = table1;
                break;
        }
        wrapper.innerHTML = newDesc;

    }

    const zoomBtns = document.querySelectorAll(".zoom__wrapper button");


    [].forEach.call(zoomBtns, (e) => {
        e.addEventListener('click', (e) => {
            const target = e.target;
            zoom(target);

        }, false);
    });

function zoom(item) {
    const plan = document.querySelector(".plan_img img");

    const reg = /([0-9](\.[0-9])?)/g;
    const readZoom = reg.exec(plan.style.transform);


    let zoom = plan.style.transform == "" ? 1.0 : Number(readZoom[0]);



    if(item.classList.contains("zoom-up")){
        if(zoom > 2 ) return;
        zoom += 0.1;
        plan.style.transform = `scale(${zoom})`;


    }else{
        if(zoom <= 1) return;
        zoom -= 0.1;
        plan.style.transform = `scale(${zoom})`;
    }

}

    const table1 = `
<table>
<thead>
    <tr>
        <th>powierzchnia użytkowa</th>
        <th>64,32 m²</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class="circle">1</span> salon z aneksem kuchennym</td>
        <td>25,50 m²</td>
    </tr>
    <tr>
        <td><span class="circle">2</span> łazienka</td>
        <td>6,33 m²</td>
    </tr>
    <tr>
        <td><span class="circle">3</span> pokój</td>
        <td>12,05 m²</td>
    </tr>
    <tr>
        <td><span class="circle">4</span> pokój</td>
        <td>9,53 m²</td>
    </tr>
    <tr>
        <td><span class="circle">5</span> garderoba</td>
        <td>1,62 m²</td>
    </tr>
    <tr>
        <td><span class="circle">6</span> hol</td>
        <td>5,5 m²</td>
    </tr>
    <tr>
        <td><span class="circle">7</span> przedpokój</td>
        <td>3,79 m²</td>
    </tr>
</tbody>
</table>
`;

    const table2 = `
<table>
<thead>
    <tr>
        <th>powierzchnia użytkowa</th>
        <th>50,21 m²</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class="circle">1</span> salon z aneksem kuchennym</td>
        <td>25,50 m²</td>
    </tr>
    <tr>
        <td><span class="circle">2</span> łazienka</td>
        <td>5,33 m²</td>
    </tr>
    <tr>
        <td><span class="circle">3</span> pokój</td>
        <td>10,20 m²</td>
    </tr>
    <tr>
        <td><span class="circle">4</span> pokój</td>
        <td>9,53 m²</td>
    </tr>
    <tr>
        <td><span class="circle">5</span> garderoba</td>
        <td>1,5 m²</td>
    </tr>
    <tr>
        <td><span class="circle">6</span> hol</td>
        <td>3,5 m²</td>
    </tr>
    <tr>
        <td><span class="circle">7</span> przedpokój</td>
        <td>3,79 m²</td>
    </tr>
</tbody>
</table>
`;

    const table3 = `
<table>
<thead>
    <tr>
        <th>powierzchnia użytkowa</th>
        <th>54,32 m²</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class="circle">1</span> salon z aneksem kuchennym</td>
        <td>25,50 m²</td>
    </tr>
    <tr>
        <td><span class="circle">2</span> łazienka</td>
        <td>6,33 m²</td>
    </tr>
    <tr>
        <td><span class="circle">3</span> pokój</td>
        <td>12,05 m²</td>
    </tr>

    <tr>
        <td><span class="circle">4</span> garderoba</td>
        <td>1,62 m²</td>
    </tr>
    <tr>
        <td><span class="circle">5</span> hol</td>
        <td>5,5 m²</td>
    </tr>
    <tr>
        <td><span class="circle">6</span> przedpokój</td>
        <td>3,79 m²</td>
    </tr>
</tbody>
</table>
`;

    const table4 = `
<table>
<thead>
    <tr>
        <th>powierzchnia użytkowa</th>
        <th>34,32 m²</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class="circle">1</span> salon z aneksem kuchennym</td>
        <td>15,50 m²</td>
    </tr>
    <tr>
        <td><span class="circle">2</span> łazienka</td>
        <td>6,33 m²</td>
    </tr>
    <tr>
        <td><span class="circle">3</span> pokój</td>
        <td>12,05 m²</td>
    </tr>
    <tr>
        <td><span class="circle">4</span> garderoba</td>
        <td>1,62 m²</td>
    </tr>
    <tr>
        <td><span class="circle">5</span> hol</td>
        <td>5,5 m²</td>
    </tr>
    <tr>
        <td><span class="circle">6</span> przedpokój</td>
        <td>3,79 m²</td>
    </tr>
</tbody>
</table>
`;


})();