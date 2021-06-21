import API from './fetchCountries.js';
import countryCard from '../templates/countryCard.hbs';
import countriesList from '../templates/countriesList.hbs';
var debounce = require('lodash.debounce');

const containerForCard = document.querySelector('.js-container');
const inputEl = document.querySelector('.input');

inputEl.addEventListener('input', debounce(onInputEvent, 500));
containerForCard.addEventListener('click', onListOfCountryClick);

function onListOfCountryClick(event) {
  if (event.target.classList.contains('js-country-item')) {
    inputEl.value = event.target.textContent;
    containerForCard.innerHTML = '';
    onInputEvent();
  }
}

function onInputEvent() {
  if (inputEl.value.trim()) {
    API.fetchCountries(inputEl.value)
      .then(data => {
        if (data.length < 10) {
          renderListOfCountries(data);
        }
        return data;
      })
      .then(data => {
        if (data.length === 1) renderCountryCard(data);
      });
  } else {
    containerForCard.innerHTML = '';
  }
}

function renderCountryCard(country) {
  const markUp = countryCard(country);
  containerForCard.innerHTML = markUp;
}

function renderListOfCountries(arr) {
  const merlUpListOfCountries = countriesList(arr);
  containerForCard.innerHTML = merlUpListOfCountries;
}
