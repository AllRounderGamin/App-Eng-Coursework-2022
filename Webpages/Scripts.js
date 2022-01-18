function openSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.remove("inactive");
}

function closeSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.add("inactive");
}


async function createCartContent(){
    let cartData = await fetch("./cartTestData.json");
    const items = await cartData.json();
    const cart = document.querySelector("#CartArea");
    for (let item of items){
        const cartItemDiv = document.createElement("div");
        const itemName = document.createElement("h2");
        const itemPrice = document.createElement ("h3")
        const itemImage = document.createElement("img");


        itemName.textContent = item.name + " x" + item.amount.toString();
        itemPrice.textContent = ("£" + (item.singlePrice * item.amount).toFixed(2).toString());
        itemImage.alt = item.name;
        itemImage.src = item.src;

        itemName.classList.add("productName");
        itemImage.classList.add("cartImage");
        cartItemDiv.classList.add("cartItem");

        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemPrice);
        cartItemDiv.appendChild(itemImage);
        cart.appendChild(cartItemDiv);
    }
}
