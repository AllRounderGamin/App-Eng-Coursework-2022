function openSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.remove("inactive");
}

function closeSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.add("inactive");
}


async function loadList(listName) {
    let position = 0;
    let totalAmount = Number(0);
    const items = JSON.parse((localStorage.getItem(listName)))
    if (!items) {
        return;
    }
    const list = document.getElementById("ListArea");
    for (let item of items) {
        const itemDiv = document.createElement("div");
        const itemName = document.createElement("h3");
        const itemPrice = document.createElement("h4")
        const itemImage = document.createElement("img");
        const removeButton = document.createElement("button");

        const cumulativePrice = (item.singlePrice * item.amount);
        totalAmount += cumulativePrice;

        itemName.textContent = item.name + " x" + item.amount.toString();
        itemPrice.textContent = ("£" + cumulativePrice.toFixed(2));
        itemImage.alt = item.name;
        itemImage.src = item.src;
        removeButton.value = "Remove";
        removeButton.pos = position;
        removeButton.list = listName;

        itemName.classList.add("productName");
        itemImage.classList.add("cartImage");
        itemDiv.classList.add("cartItem");
        removeButton.addEventListener("click", removeProduct);


        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(removeButton);
        list.appendChild(itemDiv);

        position++;
    }
    if (listName !== "Wishlist") {
        const finalPrice = document.querySelector("#totalPrice");
        finalPrice.textContent = "Total: £" + totalAmount.toFixed(2);
    }
}

async function loadRecent() {
    let position = 0;
    const items = JSON.parse(localStorage.getItem("recentPurchases"));
    const list = document.getElementById("ListArea");
    if (!items) {
        return;
    }
    for (let item of items) {
        const itemDiv = document.createElement("div");
        const itemName = document.createElement("h3");
        const itemPrice = document.createElement("h4")
        const itemImage = document.createElement("img");
        const itemLink = document.createElement("a");

        itemName.textContent = item.name;
        itemPrice.textContent = item.amount;
        itemImage.alt = item.name;
        itemImage.src = item.src;
        itemImage.pos = position;
        itemLink.href = "purchaseReview?num=" + position;

        itemName.classList.add("productName");
        itemImage.classList.add("cartImage");
        itemDiv.classList.add("cartItem");

        itemLink.appendChild(itemImage);
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemLink);
        list.appendChild(itemDiv);

        position++;
    }
}

async function loadPurchase(params) {
    const num = params.get("num");
    let totalAmount = Number(0);
    let items = JSON.parse(localStorage.getItem("recentPurchases"));
    if (!items) {
        return;
    }
    items = items[num].cart;
    const list = document.getElementById("ListArea");
    for (let item of items) {
        const itemDiv = document.createElement("div");
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
        itemDiv.classList.add("cartItem");

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemImage);
        list.appendChild(itemDiv)
    }
    const finalPrice = document.querySelector("#totalPrice");
    finalPrice.textContent = "Total: £" + totalAmount.toFixed(2);
}

function removeProduct(e) {
    let list = JSON.parse(localStorage.getItem(e.target.list));
    list.splice(parseInt(e.target.pos), 1);
    localStorage.setItem(e.target.list, JSON.stringify(list));
    window.location.assign(window.location);
}

async function changeList(e) {
    let test = document.getElementById("ListArea")
    while (test.hasChildNodes()) {
        test.removeChild(test.firstChild);
    }
    const listName = e.target.value;
    if (listName === "Choose List...") {
    } else if (listName !== "Recent Purchases") {
        await loadList(listName);
    } else {
        await loadRecent();
    }
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

        if (products[i + buffer]) {
            productName.textContent = products[i + buffer].name;
            itemImage.alt = productName.textContent;
            itemImage.src = products[i + buffer].imageUrl;
            itemLink.href = "product?name=" + encodeURIComponent(productName.textContent);

            itemImage.classList.add("product");

            itemLink.appendChild(itemImage);
            productDiv.appendChild(itemLink);
            productDiv.appendChild(productName);
            productPage.appendChild(productDiv);
        }
    }
}

async function findProduct(params) {
    const searchQuery = params.get("name");
    let product = null;
    const productData = await fetch("./products.json")
    const productList = await productData.json();
    for (let obj of productList) {
        if (obj.name === searchQuery) {
            product = obj;
            break;
        }
    }
    return product;
}

async function fillProductInfo(params) {
    let product = await findProduct(params);
    if (product === null) {
        window.location.replace("http://localhost:8080/errorPage")
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

async function addProduct(params, listName, redirect) {
    let amount = document.getElementById("amount").value
    if (amount === 0) {
        amount = 1;
    }
    const product = await findProduct(params);
    await addToList(product, amount, listName, redirect);
}

async function addToList(item, amount, listName, redirect) {
    if (item === null) {
        window.location.assign("http://localhost:8080/errorPage")
    } else {
        item.amount = amount;
        if (localStorage.getItem(listName)) {
            const list = JSON.parse(localStorage.getItem(listName));
            list.push(item);
            localStorage.setItem(listName, JSON.stringify(list));
        } else {
            const list = [];
            list.push(item);
            localStorage.setItem(listName, JSON.stringify(list));
        }
    }
    window.location.assign(redirect);
}

async function checkout() {
    // validate info
    const cart = JSON.parse(localStorage.getItem("cart"));
    const image = cart[0].src;
    const date = new Date();
    const totalPrice = document.getElementById('totalPrice').textContent
    const purchase = {"cart": cart, "src": image, name: date.toDateString() + " " + cart[0].name + "..."};
    await addToList(purchase, totalPrice, "recentPurchases", "http://localhost:8080/landing");
    localStorage.removeItem("cart");
}
