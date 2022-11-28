// let products = [
//     {
//         id:"Product1",
//         img: "img1",
//         title: "Deamon slayer bag",
//         reviews: "40",
//         price: "$49"
//     },
//     {
//         id:"Product2",
//         img: "img2",
//         title: "Battlefield 2042 gab",
//         reviews: "42",
//         price: "$49"
//     },
//     {
//         id:"Product3",
//         img: "img3",
//         title: "Note",
//         reviews: "40",
//         price: "$39"
//     },
//     {
//         id:"Product4",
//         img: "img4",
//         title: "Beautiful Diary",
//         reviews: "49",
//         price: "$49"
//     },
//     {
//         id:"Product5",
//         img: "img5",
//         title: "Sunflower Diary",
//         reviews: "55",
//         price: "$50"
//     },
//     {
//         id:"Product6",
//         img: "img6",
//         title: "Classic Diary",
//         reviews: "40",
//         price: "$49"
//     },
//     {
//         id:"Product7",
//         img: "img7",
//         title: "Modern pen",
//         reviews: "70",
//         price: "$35"
//     },
//     {
//         id:"Product8",
//         img: "img8",
//         title: "Classic pen",
//         reviews: "55",
//         price: "$49"
//     },
//     {
//         id:"Product9",
//         img: "img9",
//         title: "Black mug",
//         reviews: "30",
//         price: "$49"
//     },
//     {
//         id:"Product10",
//         img: "img10",
//         title: "White mug",
//         reviews: "33",
//         price: "$50"
//     }
// ]

// let productsContainer = document.querySelector(".allProducts");

// window.addEventListener("DOMContentLoaded", function () {
//     let product = products.map(function (item) {
//         return `
//         <div class="product" id=${item.id} onclick="selectedItem()">
//         <div class="productImg ${item.img}"></div>
//         <div class="productInfo">
//             <div class="productName">${item.title}</div>
//             <div class="stars">
//                 <i class="fa-solid fa-star gold"></i>
//                 <i class="fa-solid fa-star gold"></i>
//                 <i class="fa-solid fa-star gold"></i>
//                 <i class="fa-solid fa-star gold"></i>
//                 <i class="fa-solid fa-star gray"></i>
//             </div>
//             <div class="reviews">${item.reviews}</div>
//             <div class="price">${item.price}</div>
//         </div>
//         </div>
//         `
//     })
//     product = product.join("");
//     // console.log(product);
//     productsContainer.innerHTML = product;
// })

var product = document.querySelectorAll(".product");
product.forEach(function(item){
    // console.log(item);
    item.onclick = function(){
        // console.log(item.id);
        // var modalId = item.id
        var modalDiv = item.getAttribute('data-modal');
        var modal = document.getElementById(modalDiv);
        // console.log(modal);
        // console.log(modal.id);
        var toggleModalId = modal.id;
        document.getElementById(toggleModalId).style.display = 'flex';
    }
})

var closeMold = document.querySelectorAll(".fa-x");
closeMold.forEach(function(btn){
    btn.onclick = function(){
        var modal = btn.closest('.mold').style.display = 'none';
    }
})

window.onclick = function(e){
    if(e.target.className === "mold"){
        e.target.style.display = "none";
    }
}

// size active change
var sizes = document.querySelectorAll(".Size");
sizes.forEach(function(size){
    // if(size.classList.contains("size-active")){
    //     // console.log(size);
    // }
    size.addEventListener("click", function(){
        sizes.forEach(function(size){size.classList.remove("size-active")})
        // this.classList.add("size-active");
        this.classList.add("size-active");
    })
})