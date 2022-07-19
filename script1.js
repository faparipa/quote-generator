const quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuotBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = [];

// Show newQuote, one quote of the array
function newQuote() {
    //pick a random quotes from apiQuots array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // console.log(quote);
    if (!quote.author) {
        quoteText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length and change the style
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    // set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSinner();
}

// Get Quote From API
const apiUrl = "https://type.fit/api/quotes";
async function getQuotes() {
    showLoadingSpinner();

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        newQuote();
    } catch (error) {
        alert("error");
        //Catch error here
    }
}
getQuotes();

/*
//lokal

function newQuote() {
    
    //pick a random quotes from apiQuots array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

    // console.log(quote);
    // console.log(quote.text);
    // console.log(quote.author);
    //Check if author fiel is blank and replace it with "Unknown"
    if (!quote.author) {
        quoteText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length and change the style
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    // set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
*/
//Tweeet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, "*blank");
}

//Event listeners
newQuotBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
//newQuote();
//loading();

// Get Quote From API így ne
/*
async function getQuote() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
        "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        getQuote();
        console.log(data);
    } catch (error) {
        alert("error");
        //Catch error here
    }
}
getQuote();*/
