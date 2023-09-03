// *******************JS Start**********************//

// globale //
let rowId = document.getElementById('rowId');
let searchContainer = document.getElementById("searchContainer");
let submit= document.getElementById("submit")
//****************Start Loading*****************// 
$(document).ready(() => {
    searchByName("").then(() => {
        $('#spinner').fadeOut(1000, function () {
            $('body').css('overflow', 'auto')
        })
    })
});


//Open Menu
let navTab = $('.nav-tab').outerWidth()
let left = true;
function openSideNav() {
    $('.side-nav-menu').animate({ left: 0 }, 1000)
    $('.open-close-icon').removeClass("fa-align-justify");
    $('.open-close-icon').addClass("fa-x");
    left = true;
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 200)
    }
}

//Close Menu
function closeSideNav() {
    $('.side-nav-menu').animate({ left: `-${navTab}` }, 1000)
    left = false;
    $('.open-close-icon').addClass("fa-align-justify");
    $('.open-close-icon').removeClass("fa-x");

    $(".links li").animate({
        top: 300
    }, 500)
}
closeSideNav()
$('.side-nav-menu .nav-header .open-close-icon').click(() => {
    if ($('.side-nav-menu').css('left') == '0px') {
        closeSideNav()
    } else {
        openSideNav()
    }
})

//****************End Loading*****************// 


//****************Main Display*****************// 

function displayMeals(array) {
    let box = "";
    for (let i = 0; i < array.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="meal position-relative cursor-pointer overflow-hidden rounded-2" onclick="getMealDetails('${array[i].idMeal}')">
                <img class="w-100"  src="${array[i].strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                    <h3>${array[i].strMeal}</h3>
                </div>
            </div>
      </div>
        `
    }
    rowId.innerHTML = box;
}
// *******************Start Categories**********************
// Categories

async function getCategories() {
    rowId.innerHTML = "";
    $('#spinner').fadeIn(1000);
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await respone.json();
    displayCategories(data.categories)
    $('#spinner').fadeOut(1000)
}

function displayCategories(array) {
    let box = "";
    for (let i = 0; i < array.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer text-center" onclick="getCategoryMeals('${array[i].strCategory}')"  >
                <img class="w-100"  src="${array[i].strCategoryThumb}" alt="">
                <div class="meal-layer position-absolute align-items-center text-black ">
                    <h3>${array[i].strCategory}</h3>
                    <p>${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `
    }
    rowId.innerHTML = box;
}

async function getCategoryMeals(category) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await respone.json();
    displayMeals(data.meals.slice(0, 20))
    $('#spinner').fadeOut(1000)
}

// *******************End Categories**********************


// *******************Start Area**********************

//Area

async function getArea() {
    rowId.innerHTML = "";
    $('#spinner').fadeIn(1000);
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await respone.json();
    displayArea(data.meals)
    $('#spinner').fadeOut(1000)
}


function displayArea(array) {
    let box = "";
    for (let i = 0; i < array.length; i++) {
        box += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${array[i].strArea}</h3>
            </div>
        </div>
        `
    }
    rowId.innerHTML = box;
}
async function getAreaMeals(area) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await respone.json();
    displayMeals(data.meals.slice(0, 20))
    $('#spinner').fadeOut(1000)
}

// *******************End Area**********************

// *******************Start Ingredients**********************

async function getIngredients() {
    rowId.innerHTML = "";
    $('#spinner').fadeIn(1000);
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await respone.json();
    displayIngredients(data.meals.slice(0, 20))
    $('#spinner').fadeOut(1000)
}

function displayIngredients(array) {
    let box = "";
    for (let i = 0; i < array.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="meal position-relative text-center" onclick="getIngredientsMeals('${array[i].strIngredient}')"  >
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${array[i].strIngredient}</h3>
                <p>${array[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
        `
    }
    rowId.innerHTML = box;
}

async function getIngredientsMeals(ingredients) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let data = await respone.json();
    displayMeals(data.meals.slice(0, 20))
    $('#spinner').fadeOut(1000)
}
// *******************End Ingredients**********************


// *******************Start Meal Details**********************

async function getMealDetails(mealID) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let data = await respone.json();
    displayMealDetails(data.meals[0])
    $('#spinner').fadeOut(1000)
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let box = "";
    let ingredients = ``;
    let tags;
    let tagsStr = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    if (meal.strTags == true) {
        tags = meal.strTags.split(",");
    }
    
    if (!tags) {
        tags = [];
    }
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    box += `
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="meal Photo">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span>Area : </span>${meal.strArea}</h3>
      <h3><span>Category : </span>${meal.strCategory}</h3>
      <h3><span>Recipes : </span></h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
      <h3>Tags : </h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
         ${tagsStr}
      </ul>
      <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
      <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
    `
    rowId.innerHTML = box;
}

// *******************End Meal Details**********************

// *******************Start Search Part**********************
function displaySearch() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input type="text" placeholder="Search By Name" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white">
        </div>
        <div class="col-md-6">
            <input type="text" placeholder="Search By First Letter" maxlength="1" onkeyup="searchByFLetter(this.value)" class="form-control bg-transparent text-white">
        </div>
    </div>
    `
    rowId.innerHTML = "";

}


async function searchByName(name) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await respone.json();
    if (data.meals) {
        displayMeals(data.meals)
    } else {
        displayMeals([])
    }
    $('#spinner').fadeOut(1000)
}


async function searchByFLetter(letter) {
    rowId.innerHTML = ""
    $('#spinner').fadeIn(1000);
    if (letter == "") {
        letter = "a";
    } else {
        letter = "";
    }
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data = await respone.json();
    if (data.meals) {
        displayMeals(data.meals)
    } else {
        displayMeals([])
    }
    $('#spinner').fadeOut(1000)
}




// *******************End Search Part**********************//


// *******************Start Contacts Part**********************//

function displayContacts() {
    rowId.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
          <div class="container text-center w-75">
            <div class="row g-4">
              <div class="col-md-6 ">
                <input type="email" class="form-control bg-white text-black" id="userName" onkeyup="isValid()" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                 Special characters and numbers not allowed
                </div>
              </div>
              <div class="col-md-6 ">
                <input type="text" class="form-control bg-white text-black" id="userEmail" onkeyup="isValid()" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
                </div>
              </div>
              <div class="col-md-6 ">
                <input type="text" class="form-control bg-white text-black" id="userPhone" onkeyup="isValid()" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
                </div>
              </div>
              <div class="col-md-6 ">
                <input type="number" class="form-control bg-white text-black" id="userAge" onkeyup="isValid()" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
                </div>
              </div>
              <div class="col-md-6 ">
                <input type="password" class="form-control bg-white text-black" id="userPassword" onkeyup="isValid()" placeholder="Enter Your Password">
                <div  id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
              </div>
              <div class="col-md-6 ">
                <input type="password" class="form-control bg-white text-black" id="userRepassword" onkeyup="isValid()"  placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
                </div>
              </div>
            </div>
            <button id="submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
          </div>
        </div>
    `
    document.getElementById('userName').addEventListener('focus', () => {
        userNameTouched = true;
    });
    document.getElementById('userEmail').addEventListener('focus', () => {
        userEmailTouched = true;
    });
    document.getElementById('userPhone').addEventListener('focus', () => {
        userPhoneTouched = true;
    });
    document.getElementById('userAge').addEventListener('focus', () => {
        userAgeTouched = true;
    });
    document.getElementById('userPassword').addEventListener('focus', () => {
        userPasswordTouched = true;
    });
    document.getElementById('userRepassword').addEventListener('focus', () => {
        userRepasswordTouched = true;
    });


}

// *******************End Contacts Part**********************//

let userNameTouched = false;
let userEmailTouched = false;
let userPhoneTouched = false;
let userAgeTouched = false;
let userPasswordTouched = false;
let userRepasswordTouched = false;

// *******************Start Validation Part**********************//

function isValid() {
    if(userNameTouched){
        if(userNameValid()){
            document.getElementById('nameAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('nameAlert').classList.replace('d-none','d-block');
        }
    } 
    if(userEmailTouched){
        if(userEmailValid()){
            document.getElementById('emailAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('emailAlert').classList.replace('d-none','d-block');
        }
    } 
    if(userPhoneTouched){
        if(userPhoneValid()){
            document.getElementById('phoneAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('phoneAlert').classList.replace('d-none','d-block');
        }
    } 
    if(userAgeTouched){
        if(userAgeValid()){
            document.getElementById('agealert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('ageAlert').classList.replace('d-none','d-block');
        }
    } 
    if(userPasswordTouched){
        if(userPasswordValid()){
            document.getElementById('passwordAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('passwordAlert').classList.replace('d-none','d-block');
        }
    } 
    if(userRepasswordTouched){
        if(userRepasswordValid()){
            document.getElementById('repasswordAlert').classList.replace('d-block','d-none');
        }else{
            document.getElementById('repasswordAlert').classList.replace('d-none','d-block');
        }
    } 


    if(userNameValid()&&userEmailValid()&&userPhoneValid()&&userAgeValid()&&userPasswordValid()&&userRepasswordValid()){
        submit.removeAttribute("disabled")
    } else {
        submit=setAttribute("disabled", true)
    }
}



function userNameValid(){
    return (/^[a-zA-Z ]+$/.test(document.getElementById('userName').value))
}
function userEmailValid(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("userEmail").value))
}
function userPhoneValid(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('userPhone').value))
}
function userAgeValid(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('userAge').value))
}
function userPasswordValid(){
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('userPassword').value))
}
function userRepasswordValid(){
    return document.getElementById("userRepassword").value == document.getElementById("userPassword").value;
}
// *******************End Validation Part**********************//

// *******************JS End**********************//
