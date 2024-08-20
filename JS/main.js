let elCountryList = document.querySelector(".country-list");
let elCountrySelect = document.querySelector(".country-select");
let elSearchInput = document.querySelector(".search-input");
let elModalContent = document.querySelector(".modal-content");

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInnner = document.querySelector(".modal-inner");


let likeCount = document.querySelector(".like-count");
let saveCount = document.querySelector(".save-count");

const countrys = [
    {
        id: 1,
        name: "Wallis and Futuna",
        capital: "Mata-Utu",
        population: 11750,
        flag: "https://flagcdn.com/wf.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 2,
        name: "Iceland",
        capital: "Reykjavik",
        population: 366425,
        flag: "https://flagcdn.com/is.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 3,
        name: "Luxembourg",
        capital: "Luxembourg",
        population: 632275,
        flag: "https://flagcdn.com/lu.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 4,
        name: "Mali",
        capital: "Bamako",
        population: 20250834,
        flag: "https://flagcdn.com/ml.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 5,
        name: "Comoros",
        capital: "Moroni",
        population: 869595,
        flag: "https://flagcdn.com/km.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 6,
        name: "Australia",
        capital: "Canberra",
        population: 25687041,
        flag: "https://flagcdn.com/au.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 7,
        name: "Estonia",
        capital: "Tallinn",
        population: 1331057,
        flag: "https://flagcdn.com/ee.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 8,
        name: "Canada",
        capital: "Ottawa",
        population: 38005238,
        flag: "https://flagcdn.com/ca.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 9,
        name: "Belarus",
        capital: "Minsk",
        population: 9398861,
        flag: "https://flagcdn.com/by.svg",
        isLiked: false,
        isBasked: false
    },
    {
        id: 10,
        name: "Guyana",
        capital: "Georgetown",
        population: 786559,
        flag: "https://flagcdn.com/gy.svg",
        isLiked: false,
        isBasked: false
    }
]



function renderCountry(arr){
    elCountryList.innerHTML = null
    arr.forEach(item => {
        let countryItem  = document.createElement("li")
        countryItem.className ='w-[300px] bg-slate-300 p-2 rounded-md'
        countryItem.innerHTML= `
        <img src=${item.flag} class="h-[200px] alt="Flag" width="100%" height="200"/>
        <h2>Country: ${item.name}</h2>
        <p>Capital: ${item.capital}</p>
        <p>Population: ${item.population}</p>
        <div>
        <button onclick="handleLikeBtnClick(${item.id})" class="${item.isLiked ? "bg-red-500 text-white":"bg-white text-black"} bg-white p-1 px-2 rounded-[7px]"><img src="./Images/heart.svg" alt="Like" width="20" height="20"></button>
        <button onclick="handleSaveBtnClick(${item.id})" class="${item.isBasked ? "bg-blue-500 text-white":"bg-white text-black"} bg-white p-1 px-2 rounded-[7px]"><img src="./Images/edit.svg" alt="Save" width="20" height="20"></button>
        <button class="more-btn bg-green-500 p-1 px-2 rounded-[7px]" onclick="handleMoreBtnClick(${item.id})"><img src="./Images/more-horizontal-svgrepo-com.svg" alt="More" width="20" height="20"></button>
        </div>
        `
        elCountryList.appendChild(countryItem)
    })
    
    likeCount.textContent = arr.filter(item => item.isLiked == true).length
    saveCount.textContent = arr.filter(item => item.isBasked == true).length
}
renderCountry(countrys)


// modal start 
function handleMoreBtnClick(id){
    elModalWrapper.classList.remove("scale-0")
    const findedObj = countrys.find(item => item.id == id)
    elModalContent.innerHTML = `
    <div class="flex justify-between items-center gap-10 p-[10px]">
        <div class="w-[50%]">
            <img src=${findedObj.flag} class="h-[200px] alt="Flag" width="100%" height="200"/>
        </div>
        <div class="w-[50%] text-white font-semibold text-[20px]">
            <h2>Country: ${findedObj.name}</h2>
            <p>Capital: ${findedObj.capital}</p>
            <p>Population: ${findedObj.population}</p>
        </div>
    </div>`
}

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})

function closeBtnClick(){
    elModalWrapper.classList.add("scale-0")
}
// modal end 


function handleLikeCountBtnClick(){
    const filterdArr = countrys.filter(item => item.isLiked == true)
    renderCountry(filterdArr)
}

function handleSaveCountBtnClick(){
    const filterdArr = countrys.filter(item => item.isBasked == true)
    renderCountry(filterdArr)
}



function handleLikeBtnClick(id){
    const findedObj = countrys.find(item => item.id == id)
    findedObj.isLiked =!findedObj.isLiked
    renderCountry(countrys)
}

function handleSaveBtnClick(id){
    const findedObj = countrys.find(item => item.id == id)
    findedObj.isBasked =!findedObj.isBasked
    renderCountry(countrys)
}


elSearchInput.addEventListener("keyup", function(evt){
    let value = evt.target.value.toLowerCase()
    const filteredCountry = countrys.filter(item => item.name.toLowerCase().includes(value))
    renderCountry(filteredCountry)
})


countrys.forEach(item => {
    let elOption = document.createElement("option")
    elOption.value = item.capital
    elOption.textContent = item.capital
    elCountrySelect.appendChild(elOption)
})

elCountrySelect.addEventListener("change", (e) => {
    if (e.target.value === "all"){
        renderCountry(countrys)
    }
    else{
        const filteredCapital = countrys.filter(item => item.capital === e.target.value)
        renderCountry(filteredCapital)
    }
})