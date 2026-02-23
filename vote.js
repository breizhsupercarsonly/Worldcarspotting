const cars = JSON.parse(localStorage.getItem("cars")) || [];
let currentDuel = [];

function getRandomCar(exclude=[]) {
const filtered = cars.filter(c => !exclude.includes(c.name));
return filtered[Math.floor(Math.random() * filtered.length)];
}

function startDuel() {
if(cars.length < 2) return alert("Pas assez de voitures!");
let car1 = getRandomCar();
let car2 = getRandomCar([car1.name]);
currentDuel = [car1, car2];

document.querySelector("#car1 img").src = car1.img;
document.querySelector("#car2 img").src = car2.img;
}

function voteCurrent(carId) {
const winner = currentDuel[carId==="car1"?0:1];
const basePoints = 5;
const rarityBonus = winner.rarity || 0;

winner.score = (winner.score||0) + basePoints + rarityBonus;
winner.wins = (winner.wins||0) + 1;

localStorage.setItem("cars", JSON.stringify(cars));
alert(`${winner.name} gagne ${basePoints + rarityBonus} points !`);

startDuel();
}

document.addEventListener("DOMContentLoaded", startDuel);