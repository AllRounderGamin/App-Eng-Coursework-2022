import {changeList, loadList, loadPurchase} from "./list_scripts.js"
import {checkOut, verifyCardNum} from "./checkout.js"
import {addProduct, fillProductInfo, fillProductsPage} from "./product_scripts.js";

export function loadPage(pageID) {
    const pageArea = document.querySelector("#pageArea");
    const newPage = document.querySelector(`#${pageID}`);
    clearBody();
    const newContent = newPage.content.cloneNode(true);
    pageArea.appendChild(newContent);
}

export function loadCheckoutPage() {
    loadPage("checkout");

    const checkoutButton = document.querySelector("#confirmButton");
    checkoutButton.addEventListener("click", checkOut);
    document.querySelector("#cardNum").addEventListener("change", verifyCardNum);
    document.querySelector("#quickForm").addEventListener("click", quickFillForm);

    loadList("cart")
    if (!(localStorage.getItem("cart"))) {
        checkoutButton.disabled = true;
    }

    history.pushState(null, "", "/?page=checkout");
}

function quickFillForm() {
    document.querySelector("#billingName").value = document.querySelector("#deliveryName").value;
    document.querySelector("#billingLineOne").value = document.querySelector("#deliveryLineOne").value;
    document.querySelector("#billingLineTwo").value = document.querySelector("#deliveryLineTwo").value;
    document.querySelector("#billingCity").value = document.querySelector("#deliveryCity").value;
    document.querySelector("#billingPostcode").value = document.querySelector("#deliveryPostcode").value;
}

function loadListPage() {
    loadPage("lists");

    document.querySelector("#showWishlist").addEventListener("click", changeList);
    document.querySelector("#showRecent").addEventListener("click", changeList);

    history.pushState(null, "", "/?page=yourLists")
}

function loadHomePage() {
    loadPage("landing");
    document.querySelector("#singleBricks").addEventListener("click", loadSinglesPage);
    document.querySelector("#legoKits").addEventListener("click", loadKitsPage);

    const query = window.location.search;
    if (query.includes("code=")) {
        return
    }
    history.pushState(null, "", "/");
}

async function loadSinglesPage() {
    loadPage("products");
    const pageNum = new URLSearchParams((window.location.search)).get("pageNum") || 1;
    history.replaceState(null, "", "/?page=singles&pageNum=" + pageNum);
    await fillProductsPage("products/singles/" + pageNum);

    document.querySelector("#currentPage").textContent = "Current Page: " + pageNum;

}

async function loadKitsPage() {
    loadPage("products");
    const pageNum = new URLSearchParams((window.location.search)).get("pageNum") || 1;
    history.replaceState(null, "", "/?page=kits&pageNum=" + pageNum);
    await fillProductsPage("products/kits/" + pageNum);

    document.querySelector("#currentPage").textContent = "Current Page: " + pageNum;
}

async function searchStore() {
    const query = document.querySelector("#StoreSearch").value
    if (query === "") {
        return;
    }
    history.replaceState(null, "", "/?page=search&query=" + query + "&pageNum=1");
    await loadFromUrl();
}

async function loadSearch() {
    loadPage("products");
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("pageNum") || 1;
    const query = params.get("query");
    await fillProductsPage("search/" + query + "/" + pageNum);

    document.querySelector("#currentPage").textContent = "Current Page: " + pageNum;
}

async function loadProductPage() {
    loadPage("product");
    const params = new URLSearchParams((window.location.search));
    if (await fillProductInfo(params)) {
        const cartButton = document.querySelector("#cartButton");
        cartButton.setAttribute("itemName", document.querySelector("#itemName").textContent);
        cartButton.addEventListener("click", addProduct);

        const wishButton = document.querySelector("#wishlistButton")
        wishButton.setAttribute("itemName", document.querySelector("#itemName").textContent)
        wishButton.addEventListener("click", addProduct);
    }
}

function loadReviewPage() {
    loadPage("review");
    loadPurchase(new URLSearchParams(window.location.search));
}

function loadErrorPage() {
    loadPage("error");
}

function clearBody() {
    const pageArea = document.querySelector("#pageArea");
    while (pageArea.hasChildNodes()) {
        pageArea.removeChild(pageArea.firstChild);
    }
}

function sidebar() {
    const sidebar = document.querySelector("#TagMenu");
    if (sidebar.classList.contains("inactive")) {
        sidebar.classList.remove("inactive");
    } else {
        sidebar.classList.add("inactive");
    }
}

function setUp() {
    document.querySelector("#openSidebar").addEventListener("click", sidebar);
    document.querySelector("#closeSidebar").addEventListener("click", sidebar);
    document.querySelector("#homeButton").addEventListener("click", loadHomePage);
    document.querySelector("#searchButton").addEventListener("click", searchStore);
    document.querySelector("#listButton").addEventListener("click", loadListPage);
    document.querySelector("#checkoutButton").addEventListener("click", loadCheckoutPage);
}

export async function loadFromUrl() {
    const page = new URLSearchParams(window.location.search).get("page");
    switch (page) {
        case null:
            loadHomePage();
            break;
        case "home":
            loadHomePage();
            break
        case "checkout":
            loadCheckoutPage();
            break;
        case "singles":
            await loadSinglesPage();
            break;
        case "kits":
            await loadKitsPage();
            break;
        case "search":
            await loadSearch();
            break;
        case "product":
            await loadProductPage();
            break;
        case "yourLists":
            loadListPage();
            break;
        case "purchaseReview":
            loadReviewPage();
            break;
        case "error":
            loadErrorPage();
            break;
    }
}

window.addEventListener("load", setUp);
window.addEventListener("load", loadFromUrl);
window.addEventListener("popstate", loadFromUrl);
