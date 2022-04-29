import {addToList} from "./list_scripts.js";
import {loadFromUrl} from "./pageLoading.js";

export async function fillProductsPage(url) {
    const productData = await fetch(url);
    const products = await productData.json();
    const productPage = document.querySelector("#productPage");
    let finalPage = false;
    for (let i = 0; i < 4; i++) {
        if (products[i]) {
            const productDiv = document.createElement("div");
            const itemLink = document.createElement("a");
            const itemImage = document.createElement("img");
            const productName = document.createElement("h3");

            productName.textContent = products[i].name;
            itemImage.alt = productName.textContent;
            itemImage.src = products[i].src;
            itemLink.href = "?page=product&name=" + encodeURIComponent(productName.textContent);

            itemImage.classList.add("product");

            itemLink.appendChild(itemImage);
            productDiv.appendChild(itemLink);
            productDiv.appendChild(productName);
            productDiv.classList.add("productLink");
            productPage.appendChild(productDiv);
        } else {
            finalPage = true;
        }
    }
    const prevPage = document.querySelector("#prevPage");
    const nextPage = document.querySelector("#nextPage");
    prevPage.addEventListener("click", loadPreviousPage);
    nextPage.addEventListener("click", loadNextPage);

    const currentPage = parseInt(new URLSearchParams(window.location.search).get("pageNum"));
    if (currentPage === 1) {
        prevPage.setAttribute("disabled", true)
    }
    if (finalPage === true) {
        nextPage.setAttribute("disabled", true);
    }
}

async function loadPreviousPage() {
    const url = new URLSearchParams(window.location.search)
    const currentPage = url.get("page");
    const currentPageNum = parseInt(url.get("pageNum"));
    window.history.replaceState(null, "", "?page=" + currentPage + "&pageNum=" + (currentPageNum - 1));
    await loadFromUrl();
}

async function loadNextPage() {
    const url = new URLSearchParams(window.location.search)
    const currentPage = url.get("page");
    const currentPageNum = parseInt(url.get("pageNum"));
    window.history.replaceState(null, "", "?page=" + currentPage + "&pageNum=" + (currentPageNum + 1));
    await loadFromUrl();
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
        const stockAmount = document.querySelector("#stockAmount");
        const itemAmount = document.querySelector("#amount");

        itemImage.classList.add("product");
        itemImage.src = product.src;
        itemName.textContent = product.name;
        itemPrice.textContent = "£" + product.price.toFixed(2);
        itemDesc.textContent = product.desc;
        if (product.stock < 1) {
            stockAmount.textContent = "OUT OF STOCK"
            document.querySelector("#checkoutButton").disabled = true;
            return true;
        }
        stockAmount.textContent = "In stock: " + product.stock;
        itemAmount.setAttribute("max", product.stock);
        return true;
    }
}

export async function addProduct(e) {
    let amount = document.querySelector("#amount")
    let value = parseInt(amount.value);
    const max = parseInt(amount.max);
    if (value === 0 || isNaN(value)) {
        value = 1;
    }
    console.log(value);
    if (value > max || value < 1) {
        window.history.replaceState(null, "", "?page=error");
        await loadFromUrl();
        return;
    }
    const product = await findProduct(e.target.attributes.itemname.textContent);
    await addToList(product, value, e.target.attributes.listName.textContent, e.target.attributes.redirectLink.textContent);
}
