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

export function verifyCardNum(e) {
    const text = document.querySelector("#CardIdentity");
    if (e.target.value === "") {
        text.textContent = "Enter Card Number";
        return
    }
    if (!Luhn(e.target.value)) {
        text.textContent = "Unknown Card Type";
        return;
    }
    text.textContent = cardType(e.target.value);
}

function Luhn(num) {
    let reversed = num.toString().split('').reverse()
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
    let checkDigitTest = (10 - total % 10)
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
            return "Discover Card"
        case "3":
            switch (num.toString()[1]) {
                case "4" || "7":
                    return "American Express";
                case "0" || "6" || "8":
                    return "Carte Blanche";
            }
    }
    return "Unknown Card Type"
}

// Luhn's Algorithm + Card type verify
// Have a hidden text below card input that becomes visible and changes depending on results
// https://www.dignited.com/47628/debit-credit-card-number-cvv-and-expiry-date-explained/#:~:text=The%20last%20%2816th%29%20digit%20in%20your%20debit%20card,and%20ensures%20that%20the%20numbers%20weren%E2%80%99t%20entered%20incorrectly.
// do you validate card by validating check digit over whole number? (10 - total mod 10) mod 10
// https://simplycalc.com/luhn-validate.php

// DONE IT
// Take last digit and convert it to 0, then double each second digit starting from 0 (right to left), then after
// 10 mod calc the result should equal the 16th digit
