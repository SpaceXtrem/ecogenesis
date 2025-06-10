let seeds = 1;
let plants = 0;
let money = 0.00;
let price = 0.03;
let marketing = 1;
let marketing_price = 0.45;
let text_auto_seller = "";
let grow = 3;
let grow_price = 1.00;
let autoPlanting = true;
let autoPlantInterval = null;
const seedCount = document.getElementById("seed-count");
const plantCount = document.getElementById("plant-count");
const moneyCount = document.getElementById("money-count");
const priceCount = document.getElementById("price-count");
const marketingCount = document.getElementById("marketing-count");
const marketing_priceCount = document.getElementById("marketing-price");
const text_auto_sellerCount = document.getElementById("text-auto-seller");
const growCount = document.getElementById("grow-count");
const grow_priceCount = document.getElementById("grow-price-count");
const full_of_seedsCount = document.getElementById("full-of-seeds");
const seedsType = document.getElementById("seeds-type");

const plantBtn = document.getElementById("plant-button");
const harvestBtn = document.getElementById("harvest-button");
const marketingBtn = document.getElementById("marketing-button");
const sellBtn = document.getElementById("sell-button");
const growBtn = document.getElementById("grow-button");

const fieldsetProjectFirstBuyer = document.getElementById("fieldset-project-first-buyer");
const fieldsetProjectSuperFertilizer = document.getElementById("fieldset-project-super-fertilizer");
const fieldsetProjectAutoSeller = document.getElementById("fieldset-project-auto-seller");
const fieldsetProjectFullOfSeeds = document.getElementById("fieldset-project-full-of-seeds");

// cheats
const cheatSeedsBtn = document.getElementById("cheat-seeds-button");
const cheatPlantsBtn = document.getElementById("cheat-plants-button");
const cheatMoneyBtn = document.getElementById("cheat-money-button");

function updateDisplay() {
    seedCount.textContent = seeds;
    plantCount.textContent = plants;
    moneyCount.textContent = "$ " + money.toFixed(2);
    priceCount.textContent = "$ " + price.toFixed(2);
    marketingCount.textContent = "Level " + marketing;
    marketing_priceCount.textContent = "$ " + marketing_price.toFixed(2);
    text_auto_sellerCount.textContent = text_auto_seller;
    growCount.textContent = grow.toFixed(2) + " secs";
    grow_priceCount.textContent = "$ " + grow_price.toFixed(2);
}

function plantSeed() {
    if (seeds > 0) {
        seeds -= 1;
        updateDisplay();
        plantBtn.disabled = true;
        setTimeout(() => {
            harvestBtn.style.display = "inline";
        }, grow*1000);
    } else {
        return
    }
}

function harvest() {
    const selectedType = seedsType.value;
    if (selectedType === "Classical") {
        seeds += Math.floor(Math.random() * 3) + 1;
        plants += 1;
    } else if (selectedType === "Full of Seeds") {
        seeds += Math.floor(Math.random() * 4) + 3;
    }
    updateDisplay();
    harvestBtn.style.display = "none";
    plantBtn.disabled = false;
}

function upgradeMarketing() {
    if (money > marketing_price) {
        money -= marketing_price;
        marketing += 1;
        price *= 2;
        marketing_price *= 4;
        updateDisplay();
    } else {
        return
    }
}

function sell() {
    if (plants > 0) {
        plants -= 1;
        money += price;
        updateDisplay();
    }
}

function upgradeGrow() {
    if (money > grow_price) {
        money -= grow_price;
        grow *= 0.75;
        grow_price *= 3;
        updateDisplay();
    }
}

function projectFirstBuyer() {
    if (seeds > 10) {
        seeds -= 10;
        money += 10;
        fieldsetProjectFirstBuyer.remove();
        updateDisplay();
    }
}

function projectSuperFertilizer() {
    if (seeds > 40) {
        seeds -= 40;
        plants += 40;
        fieldsetProjectSuperFertilizer.remove();
        updateDisplay();
    } else {
        return
    }
}

function projectAutoSeller() {
    if (money > 20) {
        money -= 20;
        sellBtn.disabled = true;
        text_auto_seller = " — Auto-Seller in progress...";
        fieldsetProjectAutoSeller.remove();
        updateDisplay();
    } else {
        return
    }
}

function projectFullOfSeeds() {
    if (marketing > 2) {
        full_of_seedsCount.hidden = false;
        fieldsetProjectFullOfSeeds.remove();
    }
}

setInterval(() => {
    if (seeds <= 10) {
        fieldsetProjectFirstBuyer.style.opacity=0.5;
    } else {
        fieldsetProjectFirstBuyer.style.opacity=1;
    }
    if (seeds <= 40) {
        fieldsetProjectSuperFertilizer.style.opacity=0.5;
    } else {
        fieldsetProjectSuperFertilizer.style.opacity=1;
    }
    if (money <= 20) {
        fieldsetProjectAutoSeller.style.opacity=0.5;
    } else {
        fieldsetProjectAutoSeller.style.opacity=1;
    }
    if (marketing <= 2) {
        fieldsetProjectFullOfSeeds.style.opacity=0.5;
    } else {
        fieldsetProjectFullOfSeeds.style.opacity=1;
    }
}, 100); // vérifie toutes les 100 ms

setInterval(() => {
    if (plants > 0 && text_auto_seller == " — Auto-Seller in progress...") {
        plants -= 1;
        money += price;
        updateDisplay();
    }
}, 500); // vérifie toutes les secondes




function cheatSeeds() {
    seeds += 10;
    updateDisplay();
}

function cheatPlants() {
    plants += 50;
    updateDisplay();
}

function cheatMoney() {
    money += 50;
    updateDisplay();
}
