
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

    //Go to each phone details and print
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `p-4 shadow-xl w-80 border border-slate-400`
        phoneCard.innerHTML = `<figure class="bg-gray-100"><img src="${phone.image}" alt="${phone.slug}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>`;
        phoneContainer.appendChild(phoneCard);
    })
}


//handle search button
const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}




