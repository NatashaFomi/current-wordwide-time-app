import { cities } from "./utils/cities.js";

let selectedTimeZone = null;

function updateTime() {
  cities.forEach((city) => {
    const cityElement = document.querySelector(`#${city.id}`);

    if (cityElement) {
      displayCityTime(cityElement, city.timeZone);
    }
  });

  if (selectedTimeZone) {
    const cityElement = document.querySelector("#cities .city");

    if (cityElement) {
      displayCityTime(cityElement, selectedTimeZone);
    }
  }
}

function displayCityTime(element, timeZone) {
  const dateElement = element.querySelector(".date");
  const timeElement = element.querySelector(".time");

  const cityTime = moment().tz(timeZone);

  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
}

function updateCity(event) {
  selectedTimeZone = event.target.value;
  if (selectedTimeZone === "current") {
    selectedTimeZone = moment.tz.guess();
  }

  const cityTime = moment().tz(selectedTimeZone);
  const cityName = selectedTimeZone.replace("_", " ").split("/")[1];

  const citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `<div class="city">
          <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${cityTime.format("h:mm:ss")}<small> ${cityTime.format("A")} </small></div>
        </div><div class="back-link"><a href="index.html">👈 Back to cities</a></div>`;

  updateTime();
}

updateTime();

setInterval(updateTime, 1000);

const citiesSelectElement = document.querySelector("#city");

citiesSelectElement.addEventListener("change", updateCity);
