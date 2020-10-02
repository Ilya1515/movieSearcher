const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const API_URL = 'http://www.omdbapi.com/?s=';
const API_KEY = '&apikey=3667f6e6';
const resultsSection = document.querySelector('.containter');
const watchLaterSection = document.querySelector('.watch-later');
const watchLaterBtns = document.querySelectorAll('.watch-later-btn');
form.addEventListener('submit', formSubmitted);

async function formSubmitted(event) {
    event.preventDefault();
    const searchTerm = input.value;
    try{const results = await getResults(searchTerm);
    showResults(results);
    }
    catch(error){
        showError(error);
    }
}
async function getResults(searchTerm) {
    const url = `${API_URL}${searchTerm}${API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
        if(data.Error) {
            throw new Error(data.Error);
          }
        else {
            return data.Search;
        }
}
async function getResultsById(id) {
    const API_URL_ID = 'http://www.omdbapi.com/?i=';
    const url = `${API_URL_ID}${id}${API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data , 'data');
        return data;
}
async function btnClicked(event) {
    const { id } = event.target.dataset;
    const movie = await getResultsById(id);
    console.log(movie);
    resultsSection.innerHTML = `<div class="" style="width: 30rem;
    display: flex;">
    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
    <div class="card-body" style="flex-shrink: 0;
    
    ">
      <h1 class="card-text-center">${movie.Title}</h1>
      <p class="">${movie.Year}</p>
      <div class="" style="max-width:500px">${movie.Plot}</div>
      <p>Director:${movie.Director}</p>
      <p>Actors:${movie.Actors}</p>
      <p>Metascore:${movie.Metascore}, IMDB:${movie.imdbRating}</p>
    </div>
  </div>`;
}
function showResults(results) {
    console.log(results);
    let html = '';
    resultsSection.innerHTML = '';
    results.forEach(movie => {
        html += `
        <div class="card " style="width: 18rem;">
  <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
  <div class="card-body">
    <h5 class="card-title">${movie.Title}</h5>
    <p class="card-text">${movie.Year}</p>
    <button onclick="btnClicked(event)" data-id="${movie.imdbID}" 
    type="button" class="btn btn-danger watch-later-btn">Watch later
    </button>
  </div>
</div>
        `;
        resultsSection.innerHTML = html;
    });
}
function showError(error) {
    resultsSection.innerHTML = `
    <div class="alert alert-danger">
    ${error.message}
    </div>
    `;
}



// function buttonClicked(event) {
//     const { id } = event.target.dataset;
//     const movie = results.find(movie => movie.imdbID === id);
//     watchLaterSection.innerHTML = ''
// }