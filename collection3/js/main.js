var shop = document.getElementById("shop");

// the content that was here initially is now in "data.js"

//let basket = []; // to store the item objects with the quantity of the items
let basket = JSON.parse(localStorage.getItem("data")) || []; // meaning retrive the data from the key named "data" OR if there is no data in the "data" then it will be an empty array

function generateShop() {
    return (shop.innerHTML = shopItemsData.map(function (x) {
        let { id, name, price, description, img } = x; // so that we do not need to write x.abc again and again
        
        // after declaring the local storage
        let search = basket.find(function(x){return x.id === id}) || [] // if there is something in the storage then store it here(in search) OR if nothing then return an empty array

        return `
                <div class="item" id=product-id-${id}>
                <img src=${img} alt="demon slayer bag">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <p>$${price}</p>
                        <div class="buttons">
                            <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
                            <div class="quantity" id=${id}>
                            ${search.item === undefined ? 0 : search.item} <!-- if the item is undefined then return 0 else return the item -->
                            </div>
                            <i class="fa-solid fa-plus" onclick="increment(${id})"></i>
                        </div>
                    </div>
                </div>
                </div>
               `
    }).join(""));
};

generateShop();

// responsible for increasing the number
let increment = function(id){
    let selectedItem = id;
    let search = basket.find(function(x){ // to see (find) if the item is already in the object
        return x.id === selectedItem.id;
    });

    if(search === undefined)
    {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else{
        search.item += 1;
    }
    // console.log(basket);
    
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket)); // so that the data do not get removed after refreshing the page
}; 
// responsible for decreasing the number
let decrement = function(id){
    let selectedItem = id;
    let search = basket.find(function(x){ // to see (find) if the item is already in the object
        return x.id === selectedItem.id;
    });

    if(search === undefined)
    {
        return;
    } 
    else if(search.item === 0){ // so that the quantity og the item do not go below 0
        return;
    }
    else{
        search.item -= 1;
    }
    // console.log(basket);

    update(selectedItem.id);
    basket = basket.filter(function(x){return x.item !== 0}); // so that the basket will be removed from the localstorage if the quantity of item 0, or simply only return the baskets that have more then 0 items
    localStorage.setItem("data", JSON.stringify(basket));
};
// responsible for updating the number 
let update = function(id){
    // if and only if the item exists, then the number will update
    let search = basket.find(function(x){
        return x.id === id;
    });
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    cartTotalItems();
}; 

let cartTotalItems = function(){
    let cartIconValue = document.getElementById("cartAmount");
    cartIconValue.innerHTML = basket.map(function(x){return x.item}).reduce(function(x,y){return x+y},0);
}

cartTotalItems(); // because after the page is refreshed, the local storage is there but we need to invoke this function again to display the value in the cart