function openSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.remove("inactive");
}

function closeSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.add("inactive");
}


async function createCartContent(ID) {
    let totalAmount = Number(0);
    const cartData = await fetch("./cartTestData.json");
    const items = await cartData.json();
    const cart = document.getElementById(ID);
    for (let item of items) {
        const cartItemDiv = document.createElement("div");
        const itemName = document.createElement("h3");
        const itemPrice = document.createElement("h4")
        const itemImage = document.createElement("img");

        const cumulativePrice = (item.singlePrice * item.amount);
        totalAmount += cumulativePrice;

        itemName.textContent = item.name + " x" + item.amount.toString();
        itemPrice.textContent = ("£" + cumulativePrice.toFixed(2));
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
    const finalPrice = document.querySelector("#totalPrice");
    finalPrice.textContent = "Total: £" + totalAmount.toFixed(2);
}
