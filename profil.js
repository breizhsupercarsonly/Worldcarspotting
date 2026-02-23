let user = JSON.parse(localStorage.getItem("user")) || {username:"Invité", points:0, streak:0, premium:false};
document.getElementById("username").textContent = user.username;
document.getElementById("points").textContent = user.points;
document.getElementById("streak").textContent = user.streak;
document.getElementById("premium").textContent = user.premium?"Oui":"Non";

// Afficher ses uploads
const cars = JSON.parse(localStorage.getItem("cars")) || [];
const uploads = cars.filter(c=>c.owner==="user");
const myUploads = document.getElementById("myUploads");
uploads.forEach(c=>{
const li = document.createElement("li");
li.textContent = `${c.name} (${c.city}, ${c.country}) - Rareté: ${c.rarity}`;
myUploads.appendChild(li);
});