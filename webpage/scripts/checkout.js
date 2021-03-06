import {addToList} from "./list_scripts.js";

export async function checkOut() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const image = cart[0].src;
    const date = new Date();
    const totalPrice = document.querySelector('#priceDisplay').textContent
    const purchase = {"cart": cart, "src": image, name: date.toDateString() + " " + cart[0].name + "..."};
    await removeStock(cart);
    await addToList(purchase, totalPrice, "recentPurchases", "home");
    localStorage.removeItem("cart");
}

export function verifyCardNum(e) {
    const text = document.querySelector("#CardIdentity");
    if (e.target.value === "") {
        text.textContent = "Enter Card Number";
        return;
    }
    if (!Luhn(e.target.value)) {
        text.textContent = "Unknown Card Type";
        return;
    }
    text.textContent = cardType(e.target.value);
}

async function removeStock(cart) {
    for (let item of cart) {
        await fetch("stock", {method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"item": item.name, "amount": item.amount})});
    }
}

function Luhn(num) {
    let reversed = num.toString().split('').reverse();
    const checkDigit = parseInt(reversed[0]);
    let total = 0;
    reversed[0] = 0;
    for (let i = 0; i < reversed.length; i++) {
        if ((i + 1) % 2 === 0) {
            let digit = (parseInt(reversed[i]) * 2);
            if (digit > 9) {
                digit -= 9;
            }
            total += digit;
        } else {
            total += parseInt(reversed[i]);
        }
    }
    let checkDigitTest = (10 - total % 10);
    if (checkDigitTest === 10) {
        checkDigitTest = 0;
    }
    return checkDigitTest === checkDigit;
}

function cardType(num) {
    switch (num.toString()[0]) {
        case "4":
            return "Visa";
        case "5":
            return "MasterCard";
        case "6":
            return "Discover Card";
        case "3":
            switch (num.toString()[1]) {
                case "4" || "7":
                    return "American Express";
                case "0" || "6" || "8":
                    return "Carte Blanche";
            }
            break;
        default:
            return "Unknown Card Type";
    }
}
