let seeds = 1;
let plants = 0;
let money = 0.00;
let price = 0.03;
let marketing = 1;
let marketing_bonus = 1;
let marketing_price = 0.45;
let text_auto_seller = "";
let grow = 3;
let grow_price = 1.00;
let maxSeeds = 20;
let silos = 0;
let siloPrice = 2.00;
let autoPlanting = true;
let autoPlantInterval = null;
let exceptionalSeedGrowing = false;
let exceptionalStartTime = 0;
const exceptionalGrowTime = 20000;
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
const fieldsetProjectAdvertisingCampaign = document.getElementById("fieldset-project-advertising-campaign");
const fieldsetProjectExceptionalSeed = document.getElementById("fieldset-project-exceptional-seed");

const exceptionalSeedLocked = document.getElementById("exceptional-seed-locked");
const exceptionalSeedUnlocked = document.getElementById("exceptional-seed-unlocked");

// cheats
const cheatSeedsBtn = document.getElementById("cheat-seeds-button");
const cheatPlantsBtn = document.getElementById("cheat-plants-button");
const cheatMoneyBtn = document.getElementById("cheat-money-button");

function updateDisplay() {
    seedCount.textContent = seeds;
    plantCount.textContent = plants;
    moneyCount.textContent = "$ " + money.toFixed(2);
    priceCount.textContent = "$ " + (price*marketing_bonus).toFixed(2);
    marketingCount.textContent = "Level " + marketing;
    marketing_priceCount.textContent = "$ " + marketing_price.toFixed(2);
    text_auto_sellerCount.textContent = text_auto_seller;
    growCount.textContent = grow.toFixed(2) + " secs";
    grow_priceCount.textContent = "$ " + grow_price.toFixed(2);
    document.getElementById("storage-count").textContent = `${seeds}/${maxSeeds}`;
    document.getElementById("silo-count").textContent = silos;
    document.getElementById("silo-price").textContent = "$ " + siloPrice.toFixed(2);
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
    const type = seedsType.value;
    let newSeeds = 0;
    if (type === "Classical") {
        newSeeds = Math.floor(Math.random() * 3) + 1;
    } else if (type === "Full of Seeds") {
        newSeeds = Math.floor(Math.random() * 4) + 2;
    }
    const availableSpace = maxSeeds - seeds;
    if (availableSpace <= 0) {
        return
    } else {
        seeds += Math.min(newSeeds, availableSpace);
        if (type === "Classical") {
            plants += 1;
        }
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
        money += (price*marketing_bonus);
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

function buySilo() {
    if (money >= siloPrice) {
        money -= siloPrice;
        silos += 1;
        maxSeeds += 20;
        siloPrice *= 2;
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
    }
}

function projectAutoSeller() {
    if (money > 12) {
        money -= 12;
        sellBtn.disabled = true;
        text_auto_seller = " — Auto-Seller in progress...";
        fieldsetProjectAutoSeller.remove();
        updateDisplay();
    }
}

function projectFullOfSeeds() {
    if (marketing > 2) {
        full_of_seedsCount.hidden = false;
        fieldsetProjectFullOfSeeds.remove();
    }
}

function projectAdvertisingCampaign() {
    if (seeds > 50) {
        seeds -= 50;
        marketing_bonus = 1.5;
        fieldsetProjectAdvertisingCampaign.remove();
        updateDisplay();
    }
}

function projectExceptionalSeed() {
    if (grow < 1.3) {
        exceptionalSeedLocked.hidden = true;
        exceptionalSeedUnlocked.hidden = false;
        fieldsetProjectExceptionalSeed.remove();
    }
}

setInterval(() => {

    if (seeds > 1) {
        fieldsetProjectFirstBuyer.hidden = false;
    }
    if (seeds <= 10) {
        fieldsetProjectFirstBuyer.style.opacity=0.5;
    } else {
        fieldsetProjectFirstBuyer.style.opacity=1;
    }

    if (money > 0) {
        fieldsetProjectAutoSeller.hidden = false;
    }
    if (money <= 12) {
        fieldsetProjectAutoSeller.style.opacity=0.5;
    } else {
        fieldsetProjectAutoSeller.style.opacity=1;
    }

    if (marketing > 1) {
        fieldsetProjectFullOfSeeds.hidden = false;
    }
    if (marketing <= 2) {
        fieldsetProjectFullOfSeeds.style.opacity=0.5;
    } else {
        fieldsetProjectFullOfSeeds.style.opacity=1;
    }

    if (full_of_seedsCount.hidden === false) {
        fieldsetProjectSuperFertilizer.hidden = false;
    }
    if (seeds <= 40) {
        fieldsetProjectSuperFertilizer.style.opacity=0.5;
    } else {
        fieldsetProjectSuperFertilizer.style.opacity=1;
    }

    if (full_of_seedsCount.hidden === false) {
        fieldsetProjectAdvertisingCampaign.hidden = false;
    }
    if (seeds <= 50) {
        fieldsetProjectAdvertisingCampaign.style.opacity=0.5;
    } else {
        fieldsetProjectAdvertisingCampaign.style.opacity=1;
    }

    if (text_auto_seller == " — Auto-Seller in progress...") {
        fieldsetProjectExceptionalSeed.hidden = false;
    }
    if (grow >= 1.3) {
        fieldsetProjectExceptionalSeed.style.opacity=0.5;
    } else {
        fieldsetProjectExceptionalSeed.style.opacity=1;
    }

}, 100); // vérifie toutes les 100 ms

setInterval(() => {
    if (plants > 0 && text_auto_seller == " — Auto-Seller in progress...") {
        plants -= 1;
        money += price;
        updateDisplay();
    }
}, 500); // vérifie toutes les secondes

function plantExceptionalSeed() {
    if (seeds >= 1 && !exceptionalSeedGrowing) {
        seeds -= 1;
        exceptionalSeedGrowing = true;
        exceptionalStartTime = Date.now();
        document.getElementById("exceptional-status").textContent = "Status : Maturation in progress...";
        document.getElementById("plant-exceptional-button").disabled = true;

        setTimeout(() => {
            document.getElementById("harvest-exceptional-button").style.display = "inline";
            document.getElementById("exceptional-status").textContent = "Status : Ready to harvest";
        }, exceptionalGrowTime);

        updateDisplay();
    }
}

function harvestExceptionalSeed() {
    if (exceptionalSeedGrowing) {
        seeds += 1;
        money += 5;
        exceptionalSeedGrowing = false;
        document.getElementById("harvest-exceptional-button").style.display = "none";
        document.getElementById("plant-exceptional-button").disabled = false;
        document.getElementById("exceptional-status").textContent = "Status : None";
        updateDisplay();
    }
}




function cheatSeeds() {
    seeds += 10;
    if (seeds >= maxSeeds) {
        seeds = maxSeeds
    }
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
