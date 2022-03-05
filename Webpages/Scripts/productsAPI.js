import {addToList} from "./fetchLists.js";

export async function fillProductsPage(buffer) {
    const productData = await fetch("./products.json");
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
            itemImage.src = products[i + buffer].src;
            itemLink.href = "product?name=" + encodeURIComponent(productName.textContent);

            itemImage.classList.add("product");

            itemLink.appendChild(itemImage);
            productDiv.appendChild(itemLink);
            productDiv.appendChild(productName);
            productPage.appendChild(productDiv);
        }
    }
}

async function findProduct(name) {
    let product = null;
    const productData = await fetch("./products.json")
    const productList = await productData.json();
    for (let obj of productList) {
        if (obj.name === name) {
            product = obj;
            break;
        }
    }
    return product;
}

export async function fillProductInfo(params) {
    let product = await findProduct(params.get("name"));
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

export async function addProduct(e) {
    let amount = document.getElementById("amount").value
    if (amount === 0) {
        amount = 1;
    }
    const product = await findProduct(e.target.attributes.itemname.textContent);
    await addToList(product, amount, e.target.attributes.listName.textContent, e.target.attributes.redirectLink.textContent);
}
