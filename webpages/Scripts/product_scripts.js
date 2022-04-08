import {addToList} from "./list_scripts.js";
import {loadFromUrl} from "./pageLoading.js";

export async function fillProductsPage(buffer) {
    const productData = await fetch("http://localhost:8080/allproducts/" + buffer);
    const products = await productData.json();
    const productPage = document.querySelector("#productPage");
    for (let i = 0; i < 8; i++) {
        const productDiv = document.createElement("div");
        const itemLink = document.createElement("a");
        const itemImage = document.createElement("img");
        const productName = document.createElement("h3");

        if (products[i]) {
            productName.textContent = products[i].name;
            itemImage.alt = productName.textContent;
            itemImage.src = products[i].src;
            itemLink.href = "?page=product&name=" + encodeURIComponent(productName.textContent);

            itemImage.classList.add("product");

            itemLink.appendChild(itemImage);
            productDiv.appendChild(itemLink);
            productDiv.appendChild(productName);
            productPage.appendChild(productDiv);
        }
    }
}

async function findProduct(name) {
    const response = await fetch("http://localhost:8080/productinfo/" + encodeURIComponent(name));
    return await response.json();
}

export async function fillProductInfo(params) {
    const product = await findProduct(params.get("name"));
    if (product === null) {
        window.history.replaceState(null, "", "?page=error");
        await loadFromUrl();
        return false;
    } else {
        const itemImage = document.querySelector("#itemImage");
        const itemName = document.querySelector("#itemName");
        const itemPrice = document.querySelector("#price");
        const itemDesc = document.querySelector("#desc");

        itemImage.src = product.src;
        itemName.textContent = product.name;
        itemPrice.textContent = "£" + product.price.toFixed(2);
        itemDesc.textContent = product.desc;
        return true;
    }
}

export async function addProduct(e) {
    let amount = document.querySelector("#amount").value
    if (amount === 0) {
        amount = 1;
    }
    const product = await findProduct(e.target.attributes.itemname.textContent);
    await addToList(product, amount, e.target.attributes.listName.textContent, e.target.attributes.redirectLink.textContent);
}
