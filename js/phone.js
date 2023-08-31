
//fetch data
const loadPhone = async (searchText) => {
    let searchLink;
    if (searchText) {
        searchLink = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    } else {
        searchLink = "https://openapi.programming-hero.com/api/phones?search=iphone";
    }
    
    const res = await fetch(searchLink);
    const data = await res.json();
    displayPhones(data.data);
}


const displayPhones = phones => {

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = " "

    const showAllContainer = document.getElementById("show-all-container");
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 12);

    //Go to each phone details and print
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `p-4 shadow-xl w-80 border border-purple-600 rounded-xl`
        phoneCard.innerHTML = `<figure class="bg-gray-100"><img src="${phone.image}" alt="${phone.slug}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center mt-3">
                <button class="btn btn-primary text-white">Show Details</button>
              </div>
            </div>`;
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleSpinner(false);
}


//handle search button
const handleSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
    
}



