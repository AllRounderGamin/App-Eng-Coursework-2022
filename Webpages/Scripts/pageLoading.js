import {closeSidebar, openSidebar} from "./baseScripts.js";
import {changeList, loadList, loadPurchase} from "./fetchLists.js"
import {checkout, verifyCardNum} from "./checkout.js"
import {addProduct, fillProductInfo, fillProductsPage} from "./productsAPI.js";

export function loadPage(pageID) {
    const pageArea = document.querySelector("#pageArea");
    const newPage = document.querySelector(`#${pageID}`);
    clearBody();
    const newContent = newPage.content.cloneNode(true);
    pageArea.appendChild(newContent);
}

export function checkoutPage() {
    loadPage("checkout");

    const checkoutButton = document.querySelector("#confirmButton")
    checkoutButton.addEventListener("click", checkout);
    const cardNum = document.querySelector("#cardNum");
    cardNum.addEventListener("change", verifyCardNum);

    loadList("cart")
    if (!(localStorage.getItem("cart"))) {
        checkoutButton.disabled = true;
    }

    history.pushState(null, "", "/?page=checkout");
}

function listPage() {
    loadPage("lists");

    const wishButton = document.querySelector("#showWishlist");
    const recentButton = document.querySelector("#showRecent");

    wishButton.addEventListener("click", changeList);
    recentButton.addEventListener("click", changeList);

    history.pushState(null, "", "/?page=yourLists")
}

function homePage() {
    loadPage("landing");
    const single = document.querySelector("#singleBricks");
    const groups = document.querySelector("#groupedBricks");
    const kits = document.querySelector("#legoKits");
    const BYOK = document.querySelector("#buildYourOwn");

    single.addEventListener("click", productsPage);
    groups.addEventListener("click", productsPage);
    kits.addEventListener("click", productsPage);
    BYOK.addEventListener("click", productsPage);

    history.pushState(null, "", "/");
}

async function productsPage() {
    loadPage("products");
    await fillProductsPage(0)
    history.pushState(null, "", "/?page=products")
}

async function productPage() {
    loadPage("product");
    const params = new URLSearchParams((window.location.search));
    await fillProductInfo(params);

    const cartButton = document.querySelector("#cartButton");
    cartButton.setAttribute("itemName", document.querySelector("#itemName").textContent);
    cartButton.addEventListener("click", addProduct);

    const wishButton = document.querySelector("#wishlistButton")
    wishButton.setAttribute("itemName", document.querySelector("#itemName").textContent)
    wishButton.addEventListener("click", addProduct);
}

function reviewPage() {
    loadPage("review");
    loadPurchase(new URLSearchParams(window.location.search));
}

function errorPage() {
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
    homeButton.addEventListener("click", homePage);
    listButton.addEventListener("click", listPage);
    checkoutButton.addEventListener("click", checkoutPage);
}

export async function loadFromUrl() {
    const page = new URLSearchParams(window.location.search).get("page");
    switch (page) {
        case null:
            homePage();
            break;
        case "checkout":
            checkoutPage();
            break;
        case "products":
            await productsPage();
            break;
        case "product":
            await productPage();
            break;
        case "yourLists":
            listPage();
            break;
        case "purchaseReview":
            reviewPage();
            break;
        case "error":
            errorPage();
            break;
    }
}

window.addEventListener("load", setUp);
window.addEventListener("load", loadFromUrl);
window.addEventListener("popstate", loadFromUrl);
