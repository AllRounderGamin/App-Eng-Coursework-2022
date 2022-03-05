import {addToList} from "./fetchLists.js";

export async function checkout() {
    // validate info https://smallbusiness.chron.com/identify-credit-card-account-number-61050.html
    const cart = JSON.parse(localStorage.getItem("cart"));
    const image = cart[0].src;
    const date = new Date();
    const totalPrice = document.getElementById('totalPrice').textContent
    const purchase = {"cart": cart, "src": image, name: date.toDateString() + " " + cart[0].name + "..."};
    await addToList(purchase, totalPrice, "recentPurchases", "http://localhost:8080/landing");
    localStorage.removeItem("cart");
}
