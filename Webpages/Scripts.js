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

async function fillProductsPage(buffer) {
    const productData = await fetch("./testProduct.json");
    const products = await productData.json();
    const productPage = document.getElementById("productPage");
    for (let i = 0; i < 12; i++) {
        const productDiv = document.createElement("div");
        const itemLink = document.createElement("a");
        const itemImage = document.createElement("img");
        const productName = document.createElement("h3");

        console.log(products[i + buffer])
        console.log(products);
        if (products[i + buffer]) {
            productName.textContent = products[i + buffer].name;
            itemImage.alt = productName.textContent;
            itemImage.src = products[i + buffer].imageUrl;
            itemLink.href = "product?name=" + encodeURIComponent(productName.textContent);

            itemImage.classList.add("product");

            itemLink.appendChild(itemImage)
            productDiv.appendChild(itemLink);
            productDiv.appendChild(productName);
            productPage.appendChild(productDiv);
        }
    }
}

async function fillProductInfo(params) {
    const searchQuery = params.get("name");
    let product = null;
    const productData = await fetch("./cartTestData.json")
    const productList = await productData.json();
    for (let obj of productList) {
        console.log(obj.name, searchQuery);
        if (obj.name === searchQuery) {
            product = obj;
            break;
        }
    }
    if (product === null) {
        const mainPage = document.getElementById("itemPage");
        const warningMes = document.createElement("h1");

        mainPage.style.display = "none";
        warningMes.textContent = "Unfortunately, this product cannot be found"

        document.body.appendChild(warningMes);
    } else {
        const itemImage = document.getElementById("itemImage");
        const itemName = document.getElementById("itemName");
        const itemPrice = document.getElementById("price");
        const itemDesc = document.getElementById("desc");

        itemImage.src = product.src;
        itemName.textContent = product.name;
        itemPrice.textContent = "£" + product.singlePrice.toFixed(2);
        itemDesc.textContent = product.desc;
    }
}
