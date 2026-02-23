// ==========================================
// TABLE DE RARETÉ
// ==========================================
const rarityTable = {
"Ferrari F8": 8,
"Ferrari 488": 8,
"Ferrari SF90": 8,
"Lamborghini Huracan": 8,
"Lamborghini Aventador": 8,
"Lamborghini Sian": 8,
"Porsche 911": 5,
"Porsche Cayman": 5,
"Porsche 718 Boxster": 5,
"Toyota Supra": 3,
"BMW M3": 3,
"BMW M4": 3,
"BMW i8": 5,
"Volkswagen Golf GTI": 1,
"Ford Mustang": 3,
"Chevrolet Corvette": 5,
"Chevrolet Camaro": 3,
"Nissan GT-R": 5,
"McLaren 720S": 8,
"McLaren 600LT": 5,
"Bugatti Chiron": 8,
"Bugatti Veyron": 8,
"Aston Martin Vantage": 5,
"Aston Martin DB11": 5,
"Mercedes AMG GT": 5,
"Mercedes SLS AMG": 5,
"Lexus LFA": 8,
"Jaguar F-Type": 3,
"Audi R8": 5,
"Alfa Romeo 4C": 3,
"Maserati GranTurismo": 3,
"Maserati MC20": 5,
"Koenigsegg Jesko": 8,
"Koenigsegg Regera": 8,
"Pagani Huayra": 8,
"Pagani Zonda": 8,
"Honda NSX": 3,
"Lotus Elise": 3,
"Lotus Evora": 3,
"Dodge Challenger": 3,
"Dodge Viper": 5,
"Ferrari Roma": 5,
"Ferrari Portofino": 5,
"Lamborghini Urus": 3,
"Porsche Taycan": 3,
"Tesla Roadster": 5,
"Tesla Model S Plaid": 3,
"Chevrolet Corvette C8": 5,
"Nissan 370Z": 3,
"BMW Z4": 3,
"Audi TT RS": 3,
"Audi RS7": 3,
"Mercedes AMG C63": 3,
"Mercedes AMG E63": 3,
"Ferrari LaFerrari": 8,
"Lamborghini Centenario": 8,
"Porsche 918 Spyder": 8
};

// ==========================================
// GÉNÉRATION MARQUES → MODÈLES
// ==========================================
const carData = {};

Object.keys(rarityTable).forEach(car => {
    const [brand, ...modelParts] = car.split(" ");
    const model = modelParts.join(" ");
    if (!carData[brand]) carData[brand] = [];
    carData[brand].push(model);
});

// ==========================================
// INPUTS
// ==========================================
const brandInput = document.getElementById("carBrand");
const modelInput = document.getElementById("carModel");
const brandList = document.getElementById("brandList");
const modelList = document.getElementById("modelList");
const cityList = document.getElementById("citiesList");

// ==========================================
// OUTILS
// ==========================================
function normalize(text) {
    return text.toLowerCase().trim();
}

// ==========================================
// INIT MARQUES
// ==========================================
function initBrands() {
    brandList.innerHTML = "";
    Object.keys(carData).sort().forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        brandList.appendChild(option);
    });
}

// ==========================================
// GESTION MARQUE → MODÈLE
// ==========================================
brandInput.addEventListener("input", function() {

    const brand = this.value.trim();
    modelList.innerHTML = "";
    modelInput.value = "";
    modelInput.disabled = true;

    if (carData[brand]) {
        carData[brand].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            modelList.appendChild(option);
        });
        modelInput.disabled = false;
    }
});

// ==========================================
// VILLES AUTO SUGGESTION
// ==========================================
function updateCitySuggestions() {
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const uniqueCities = [...new Set(cars.map(car => car.city))];

    cityList.innerHTML = "";
    uniqueCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        cityList.appendChild(option);
    });
}

// ==========================================
// UPLOAD
// ==========================================
function uploadCar() {

    const brand = brandInput.value.trim();
    const model = modelInput.value.trim();
    const color = document.getElementById("carColor").value.trim();
    const year = document.getElementById("carYear").value.trim();
    const city = document.getElementById("carCity").value.trim();
    const country = document.getElementById("carCountry").value.trim();
    const img = document.getElementById("carImg").value.trim();
    const desc = document.getElementById("carDesc").value.trim();

    if(!brand || !model || !color || !city || !country || !img) {
        return alert("Merci de remplir tous les champs obligatoires !");
    }

    if (!carData[brand] || !carData[brand].includes(model)) {
        return alert("Marque ou modèle invalide !");
    }

    const cars = JSON.parse(localStorage.getItem("cars")) || [];

    const duplicate = cars.find(car =>
        normalize(car.brand) === normalize(brand) &&
        normalize(car.model) === normalize(model) &&
        normalize(car.city) === normalize(city)
    );

    if (duplicate) {
        return alert("Cette voiture existe déjà !");
    }

    const key = `${brand} ${model}`;
    let rarity = rarityTable[key] || 1;

    if(brand === "Porsche" && model === "911" && year >= 2022) {
        rarity = 8;
    }

    const newCar = {
        name: key,
        brand,
        model,
        color,
        year: year || null,
        city,
        country,
        img,
        rarity,
        description: desc || "",
        score: 0,
        wins: 0,
        owner: "user"
    };

    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));

    alert(`Upload réussi ! ${key} ajouté avec rareté ${rarity}`);

    document.querySelectorAll(".upload-form input, .upload-form textarea").forEach(el => el.value = "");
    modelInput.disabled = true;

    updateCitySuggestions();
}

// ==========================================
// INIT
// ==========================================
initBrands();
updateCitySuggestions();