"use strict";

const chuckQuotesForm = document.querySelector("#chuckQuotesForm");

chuckQuotesForm.addEventListener("submit",function(event) {
    event.preventDefault();
    const categoryValue = chuckQuotesForm.querySelector("select").value;
    updateChuckSays(categoryValue);
    console.log("Form has been submitted!",categoryValue);
});

// Create a function to update the quote text in the DOM
function updateChuckSays(category) {
    const chuckSays = document.getElementById("chuckSays");


//this object is a promise
    get(`https://api.chucknorris.io/jokes/random?category=${category}`
        //`https://api.github.com/users/${category}/repos`
        //'https://api.github.com'
    ).then(response => { 
        chuckSays.innerHTML = response.value;
        }
    );
}

function getCategories() {
    const selectWrapper = document.querySelector("#selectWrapper");
    const categoryList = document.createElement("select");
    
    get(`https://api.chucknorris.io/jokes/categories`).then(
        function(response){
            response.forEach(function(category) {
                console.log("category",category);
                const categoryOption = document.createElement("option");
                categoryOption.text = category;
                categoryOption.value = category;
                //append full list from category api endpoint
                //categoryList.append(categoryOption);

                //block explicit category
                if (category !== "explicit") {
                    categoryList.append(categoryOption);
                }
        });
    });
    selectWrapper.append(categoryList);
}

//create an immed invoked function execution IIFE
(function(){
    //console.log("This function is an IIFE");
    const defaultCategory = "dev";
    getCategories();
    updateChuckSays(defaultCategory);
})();

//updateChuckSays();
//updateChuckSays("chilldev-build");