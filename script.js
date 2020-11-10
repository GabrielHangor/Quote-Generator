const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Array with quotes we fetch from the API
let apiQuotes = [];
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Picks a random quote from apiQuotes array and inserting into the DOM
function newQuote() {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  !quote.author
    ? (authorText.innerText = "Unknown")
    : (authorText.innerText = quote.author);

  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.innerText = quote.text;
  hideLoadingSpinner();
}

// Fectching quotes from the API and inserting to the DOM
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    hideLoadingSpinner();
  } catch (error) {
    errorCounter < 10
      ? (getQuotes(), errorCounter++, console.log(errorCounter))
      : (console.error(`Error: ${error}`),
        hideLoadingSpinner(),
        (quoteText.innerText = `Error: ${error}`),
        (authorText.innerText = ""));
  }
}

// Twitter button
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
