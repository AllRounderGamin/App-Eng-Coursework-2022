import {closeSidebar, openSidebar} from "./base_scripts.js";
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
    await fillProductsPage(0)
    history.pushState(null, "", "/?page=products")
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

function setUp() {
    const openSide = document.querySelector("#openSidebar");
    const closeSide = document.querySelector("#closeSidebar");
    const homeButton = document.querySelector("#homeButton");
    const listButton = document.querySelector("#listButton");
    const checkoutButton = document.querySelector("#checkoutButton");

    openSide.addEventListener("click", openSidebar);
    closeSide.addEventListener("click", closeSidebar);
    homeButton.addEventListener("click", loadHomePage);
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
