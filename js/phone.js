
//fetch data
const loadPhone = async (searchText, isShowAll) => {
    let searchLink;
    if (searchText) {
        searchLink = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    } else {
        searchLink = "https://openapi.programming-hero.com/api/phones?search=iphone";
    }
    
    const res = await fetch(searchLink);
    const data = await res.json();
    displayPhones(data.data, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = " ";

    const showAllContainer = document.getElementById("show-all-container");

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    //Go to each phone details and print
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `p-4 shadow-xl w-80 border border-purple-600 rounded-xl`
        phoneCard.innerHTML = `<figure class="bg-gray-100"><img src="${phone.image}" alt="${phone.slug}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center mt-3">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
              </div>
            </div>`;
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleSpinner(false);
}


const handleShowDetails = async (id) => {
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

console.log(phone);

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `<img class="my-4" src="${phone.image}" alt="" />
    <p><span class="font-bold">Brand: </span>${phone?.brand}
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS Available'}</p>
    <p><span class="font-bold">NFC: </span>${phone?.others?.NFC}</p>
    <p><span class="font-bold">Release Date: </span>${phone?.releaseDate}`
    
    
    showModals.showModal();
}

//handle search button
const handleSearch = (isShowAll) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
    
}


const handleShowAll = () => {
    handleSearch(true);
}


