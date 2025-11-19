// Get DOM elements
const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Unit lists
const units = {
  length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "foot", "inch"],
  weight: ["kilogram", "gram", "pound", "ounce"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  time: ["second", "minute", "hour"]
};

// Populate dropdowns based on category
function populateUnits() {
  const selectedCategory = category.value;
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units[selectedCategory].forEach(u => {
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    opt1.value = opt2.value = u;
    opt1.textContent = opt2.textContent = u;
    fromUnit.appendChild(opt1);
    toUnit.appendChild(opt2);
  });
}
populateUnits();
category.addEventListener("change", populateUnits);

// Conversion Logic
function convert() {
  const value = parseFloat(inputValue.value);
  if (isNaN(value)) {
    result.textContent = "Please enter a valid number!";
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;
  const type = category.value;

  let output;

  switch (type) {
    case "length":
      output = convertLength(value, from, to);
      break;
    case "weight":
      output = convertWeight(value, from, to);
      break;
    case "temperature":
      output = convertTemperature(value, from, to);
      break;
    case "time":
      output = convertTime(value, from, to);
      break;
  }

  result.textContent = `${value} ${from} = ${output} ${to}`;
}

convertBtn.addEventListener("click", convert);

// Length Conversion
function convertLength(value, from, to) {
  const meterRates = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    foot: 3.28084,
    inch: 39.3701
  };
  return (value / meterRates[from] * meterRates[to]).toFixed(4);
}

// Weight Conversion
function convertWeight(value, from, to) {
  const kgRates = {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274
  };
  return (value / kgRates[from] * kgRates[to]).toFixed(4);
}

// Temperature Conversion
function convertTemperature(value, from, to) {
  let celsius;
  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
  else if (from === "Kelvin") celsius = value - 273.15;

  let result;
  if (to === "Celsius") result = celsius;
  else if (to === "Fahrenheit") result = celsius * 9 / 5 + 32;
  else if (to === "Kelvin") result = celsius + 273.15;

  return result.toFixed(2);
}

// Time Conversion
function convertTime(value, from, to) {
  const secRates = {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600
  };
  return (value / secRates[from] * secRates[to]).toFixed(4);
}
