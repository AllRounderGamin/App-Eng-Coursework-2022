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
    const cardNum = document.querySelector("#cardNum");
    cardNum.addEventListener("change", verifyCardNum);

    loadList("cart")
    if (!(localStorage.getItem("cart"))) {
        checkoutButton.disabled = true;
    }

    history.pushState(null, "", "/?page=checkout");
}

function loadListPage() {
    loadPage("lists");

    const wishButton = document.querySelector("#showWishlist");
    const recentButton = document.querySelector("#showRecent");

    wishButton.addEventListener("click", changeList);
    recentButton.addEventListener("click", changeList);

    history.pushState(null, "", "/?page=yourLists")
}

function loadHomePage() {
    loadPage("landing");
    const single = document.querySelector("#singleBricks");
    const groups = document.querySelector("#groupedBricks");
    const kits = document.querySelector("#legoKits");
    const BYOK = document.querySelector("#buildYourOwn");

    single.addEventListener("click", loadProductsPage);
    groups.addEventListener("click", loadProductsPage);
    kits.addEventListener("click", loadProductsPage);
    BYOK.addEventListener("click", loadProductsPage);

    history.pushState(null, "", "/");
}

async function loadProductsPage() {
    loadPage("products");
    const pageNum = new URLSearchParams((window.location.search)).get("pageNum") || 1;
    history.replaceState(null, "", "/?page=products&pageNum=" + pageNum);
    await fillProductsPage("http://localhost:8080/allproducts/" + pageNum);

    const pageTracker = document.querySelector("#currentPage");
    pageTracker.textContent = "Current Page: " + pageNum;

}

async function searchStore() {
    const query = document.querySelector("#StoreSearch").value
    history.replaceState(null, "", "/?page=search&query=" + query + "&pageNum=1");
    await loadFromUrl();
}

async function loadSearch() {
    loadPage("products");
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("pageNum") || 1;
    const query = params.get("query");
    history.replaceState(null, "", "/?page=search&query=" + query + "&pageNum=" + pageNum);
    await fillProductsPage("http://localhost:8080/search/" + query + "/" + pageNum);

    const pageTracker = document.querySelector("#currentPage");
    pageTracker.textContent = "Current Page: " + pageNum;
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
    const openSide = document.querySelector("#openSidebar");
    const closeSide = document.querySelector("#closeSidebar");
    const homeButton = document.querySelector("#homeButton");
    const searchButton = document.querySelector("#searchButton")
    const listButton = document.querySelector("#listButton");
    const checkoutButton = document.querySelector("#checkoutButton");

    openSide.addEventListener("click", sidebar);
    closeSide.addEventListener("click", sidebar);
    homeButton.addEventListener("click", loadHomePage);
    searchButton.addEventListener("click", searchStore);
    listButton.addEventListener("click", loadListPage);
    checkoutButton.addEventListener("click", loadCheckoutPage);
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
        case "products":
            await loadProductsPage();
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