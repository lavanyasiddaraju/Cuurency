const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Load currencies into dropdown
for (let select of dropdowns) {
  for (let currCode in countryList) {

    let option = document.createElement("option");

    option.innerText = currCode;
    option.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }

    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update exchange rate
const updateExchangeRate = async () => {

  let amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

  } catch (error) {

    msg.innerText = "Error fetching exchange rate";
    console.log(error);

  }
};

// Update flag
const updateFlag = (element) => {

  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

// Button click
btn.addEventListener("click", (evt) => {

  evt.preventDefault();
  updateExchangeRate();

});

// Page load
window.addEventListener("load", () => {

  updateExchangeRate();

});

