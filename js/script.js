window.addEventListener("load", () => {

    const content = document.getElementById("content");
    const star = document.getElementById("star")
    const counter = document.getElementById("counter");
    const point = document.getElementsByClassName("point");
    const nav = document.getElementById("nav-placeholder");

    
    let count = parseInt(localStorage.getItem("points")) || 0;
    counter.innerText = count;

    let unlocked=[];

    let canClick = true;

    function addPoint(){
        if (!canClick) return;

        canClick = false;
        count++;
        localStorage.setItem("points", count);
        counter.textContent = count;

        setTimeout(() => {
            canClick = true;
        }, 2000);
    }

    window.buy=function(id, price){

        if (count < price){
            showPopup();
            return;
        }

        if (unlocked.includes(id)) return;


        count -= price;
        localStorage.setItem("points", count);
        counter.textContent = count;

        unlocked.push(id);

        document.querySelector(`[data-id="${id}"] .lock`).style.display = "none";
        
    };

    function showPopup() {
        document.getElementById("popup").style.display = "flex";
    }

    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }



    for (let i = 0; i < point.length; i++) {
        point[i].addEventListener("click", addPoint);
    }
    
});



