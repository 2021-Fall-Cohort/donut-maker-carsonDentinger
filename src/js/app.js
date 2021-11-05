let humanCount = 0;
let autoCount = 0;
let autoPrice = 100;
let autoMultiplier = 0;
let multiPrice = 100;
let multiMultiplier = 0;
let x = 0;

const abduct = document.querySelector(".abductButton");
const counter = document.querySelector(".counter");
const autoClicker = document.querySelector(".autoClicker");
const autoButton = document.querySelector(".autoButton");
const autoCountDisplay = document.querySelector(".autoCount");
const autoPriceDisplay = document.querySelector(".autoPrice");
const multiPriceDisplay = document.querySelector(".multiPrice");
const multiButton = document.querySelector(".multiButton");
const multiCount = document.querySelector(".multiCount");

autoPriceDisplay.innerText = autoPrice;
multiPriceDisplay.innerText = multiPrice;
setInterval(function(){flashText(x)}, 800);

abduct.addEventListener("click", ()=>{
    
    humanCount += Math.pow(1.2, multiMultiplier);
    UpdateCounter();
});

autoButton.addEventListener("click", ()=>{
    if (humanCount >= autoPrice){
        humanCount -= autoPrice;
        autoMultiplier++;
        Drone();
        UpdateCounter();
        autoPrice = Math.round(autoPrice * 1.1);
        UpdateAutoPrice();
    }
    else{
        alert("Not enough humans!");
    }
});

multiButton.addEventListener("click", ()=>{
    if(humanCount >= multiPrice){ 
        humanCount -= multiPrice;
        multiPrice = Math.ceil(multiPrice * 1.2);
        multiMultiplier++;
        UpdateMultiPrice();
        UpdateCounter();
    }
    else{
        alert("Not enough humans!");
    }
});

flashText = function(){
    var colorCheck = document.getElementById('headline').style.color;
    if(x===0){
        document.getElementById('headline').style.color = "#ff0000";
        x++;
    }
    else if(x===1){
        document.getElementById('headline').style.color = "#00e30f";
        x--;
    }
    else{
        null;
    }
}

Drone = function(){
    setInterval(function autoCount(){
        humanCount += (1 * autoMultiplier);
        UpdateCounter();
    }, 1000);
};

UpdateCounter = function(){
    counter.innerText = Math.ceil(humanCount);
};

UpdateAutoPrice = function(){
    autoPriceDisplay.innerText = autoPrice;
    autoCountDisplay.innerText = autoMultiplier;
};

UpdateMultiPrice = function(){
    multiPriceDisplay.innerText = multiPrice;
    multiCount.innerText = multiMultiplier;
};