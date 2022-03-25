import {loadFromUrl} from "./pageLoading.js";

export async function changeList(e) {
    const test = document.getElementById("ListArea")
    while (test.hasChildNodes()) {
        test.removeChild(test.firstChild);
    }
    const listName = e.target.attributes.listname.textContent;
    if (listName === "Choose List...") {
    } else if (listName !== "Recent Purchases") {
        await loadList(listName);
    } else {
        await loadRecent();
    }
}

export async function addToList(item, amount, listName, redirect) {
    if (item === null) {
        window.history.replaceState(null, "", "?page=error");
        await loadFromUrl();
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
    window.history.pushState(null, "", "?page=" + redirect)
    await loadFromUrl();
}

function createDefaults(item, name, price, link) {
    const itemDiv = document.createElement("div");
    const itemName = document.createElement("h3");
    const itemPrice = document.createElement("h4")
    const itemImage = document.createElement("img");
    const itemLink = document.createElement("a");

    itemName.textContent = name;
    itemPrice.textContent = "£" + price.toFixed(2);
    itemImage.alt = item.name;
    itemImage.src = item.src;
    itemLink.href = link;

    itemName.classList.add("productName");
    itemPrice.classList.add("productPrice");
    itemImage.classList.add("cartImage");
    itemDiv.classList.add("cartItem");

    itemLink.appendChild(itemImage);
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(itemLink);

    return itemDiv;
}


export function loadList(listName) {
    let position = 0;
    let totalAmount = Number(0);
    const items = JSON.parse((localStorage.getItem(listName)))
    if (!items) {
        return;
    }
    const list = document.getElementById("ListArea");
    for (let item of items) {
        const cumulativePrice = item.singlePrice * item.amount;
        const itemName = item.name + " x" + item.amount.toString();
        let itemDiv = createDefaults(item, itemName, cumulativePrice, "?page=product&name=" + encodeURIComponent(item.name));
        totalAmount += cumulativePrice;

        const removeButton = document.createElement("button");
        removeButton.value = "Remove";
        removeButton.pos = position;
        removeButton.list = listName;
        removeButton.addEventListener("click", removeProduct);

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
    const items = JSON.parse(localStorage.getItem("recentPurchases")).reverse();
    const list = document.getElementById("ListArea");
    if (!items) {
        return;
    }
    for (let item of items) {
        let itemDiv = await createDefaults(item, item.name, 0, "?page=purchaseReview&num=" + position);
        let price = itemDiv.querySelector(".productPrice");
        price.textContent = item.amount;
        list.appendChild(itemDiv);
        position++;
    }
}

export function loadPurchase(params) {
    const num = params.get("num");
    let totalAmount = Number(0);
    let items = JSON.parse(localStorage.getItem("recentPurchases")).reverse();
    if (!items) {
        return;
    }
    items = items[num].cart;
    const list = document.getElementById("ListArea");
    for (let item of items) {
        const cumulativePrice = (item.singlePrice * item.amount);
        const itemName = item.name + " x" + item.amount.toString();
        const itemDiv = createDefaults(item, itemName, cumulativePrice, "?page=product&name=" + encodeURIComponent(item.name))
        totalAmount += cumulativePrice;

        list.appendChild(itemDiv)
    }
    const finalPrice = document.querySelector("#totalPrice");
    finalPrice.textContent = "Total: £" + totalAmount.toFixed(2);
}

async function removeProduct(e) {
    let list = JSON.parse(localStorage.getItem(e.target.list));
    list.splice(parseInt(e.target.pos), 1);
    if (list.length === 0) {
        localStorage.removeItem(e.target.list);
    } else {
        localStorage.setItem(e.target.list, JSON.stringify(list));
    }
    await loadFromUrl(new URLSearchParams(window.location).get("page"));
}
