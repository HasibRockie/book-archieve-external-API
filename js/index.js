const searchText = document.getElementById("searchText");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("search-result");
const spinner = document.getElementById("spinner");

//  handle click function for search button 
const handleClick = () => {
    spinner.style.display = 'block';
    const searchName = searchText.value;
    const cards = document.getElementById("cards");

    // clear previous result 
    cards.textContent = '';

    // hide found results number in loading time 
    searchResult.style.display='none';

    const searchBooks = books => {
        const booksFound = books.docs;
        const searchResultFound = books.numFound;
  
        for(const book of booksFound){
            const div = document.createElement("div");
            div.innerHTML= `
            <div id="card" class="card" style="width: 18rem; height: 600px">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" style="height: 300px">
            <div class="p-1">
              <h5 class="card-title"><span class="title-text">Book Title:</span> ${book.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="title-text">Author Name:</span> ${book.author_name}</li>
              <li class="list-group-item"><span class="title-text">First Published:</span> ${book.first_publish_year}</li>
              <li class="list-group-item"><span class="title-text">Book Publisher:</span> ${book.publisher}</li>
            </ul>
            </div>
            `;

            document.getElementById("cards").appendChild(div);
        }

        // spinning in loading time 
        setTimeout(spinning, 300)

        
        if(searchResultFound === 0){
          searchResult.innerText =`No result found!`;
        }
        else{
        searchResult.innerText =`${books.numFound} results found!`;
        }

        searchResult.style.display= 'block';
    }
    
    // fetching data from API 
    const url = `https://openlibrary.org/search.json?q=${searchName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => searchBooks(data));

    // clearing input field 
    document.getElementById("searchText").value = '';
};

// function for spinning 
const spinning = () => {
  spinner.style.display = 'none';
}

searchBtn.addEventListener('click', handleClick);





