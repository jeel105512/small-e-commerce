let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || []; // meaning retrive the data from the key named "data" OR if there is no data in the "data" then it will be an empty array

let cartTotalItems = function(){
    let cartIconValue = document.getElementById("cartAmount");
    cartIconValue.innerHTML = basket.map(function(x){return x.item}).reduce(function(x,y){return x+y},0);
}

cartTotalItems(); // because after the page is refreshed, the local storage is there but we need to invoke this function again to display the value in the cart

let generateCartItems = function(){
    if(basket.length !== 0) // to see if the local storage is empty or not
    {
        return (ShoppingCart.innerHTML = basket.map(function(x){
            let{id, item} = x;
            let search = shopItemsData.find(function(y){return y.id === id}) || []; // if you find something then return it but if you can't find anything then just return an empty array
            let{img, name, price} = search;
            return `
                <div class="cart-item">
                    <img src=${img} alt"image">
                    <div class="details">
                        <div class="title-price-x">  
                            <div class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$${price}</p>
                            </div>
                            <i class="fa-solid fa-x" onclick="removeItem(${id})"></i>
                        </div>

                        <div class="buttons">
                            <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
                            <div class="quantity" id=${id}>${item}</div>
                            <i class="fa-solid fa-plus" onclick="increment(${id})"></i>
                        </div>
                        
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
            `
        }).join(""));
    } else{ // if the local storage is empty
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="./index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `
    }
};

generateCartItems();

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
    generateCartItems(); // we added it here to make thr "+" icon work and increment the price value
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
    else if(search.item === 0){ // so that the quantity of the item do not go below 0
        return;
    }
    else{
        search.item -= 1;
    }
    // console.log(basket);

    update(selectedItem.id);
    basket = basket.filter(function(x){return x.item !== 0}); // so that the basket will be removed from the localstorage if the quantity of item 0, or simply only return the baskets that have more then 0 items
    generateCartItems(); // we added it here so that when the items get 0, the card gets removed
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
    totalAmount(); // to update the total amount when the item is incremented or decremented
};

// to remove the item from the cart
let removeItem = function(id){
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter(function(x){return x.id !== selectedItem.id}); // it will return only the items whose id does not match with the id of the object(item/card) clicked, meaning that card will automatically get removed
    generateCartItems();
    totalAmount(); // to update the total amount when the item is incremented or decremented
    cartTotalItems(); // to update the cart amount on the cart icon
    localStorage.setItem("data", JSON.stringify(basket)); // to update the local storage after removing the item
};

// to remove all the items on clicking clear cart button
let clearCart = function(){
    basket = []; // removing every item from the cart(basket)
    generateCartItems(); // to re render the things
    cartTotalItems(); // to update the cart amount on the cart icon
    localStorage.setItem("data", JSON.stringify(basket));
};

// to calculate the total amount in the cart
let totalAmount = function(){
    if(basket.length !== 0){
        let amount = basket.map(function(x){
            let{id, item} = x;
            let search = shopItemsData.find(function(y){return y.id === id}) || [];
            // console.log(search);
            return item * search.price; // it will be(stored in) an array with all the prices of the items
        }).reduce(function(x,y){return x+y}); // adding the elements inside of the array
        // console.log(amount);
        label.innerHTML = `
            <h2>Total Bill: $${amount}</h2>
            <button class="checkout">Checkout</button>
            <button class="removeAll" onclick="clearCart()">Clear cart</button>
        `;
    } else{
        return;
    }
};
totalAmount();