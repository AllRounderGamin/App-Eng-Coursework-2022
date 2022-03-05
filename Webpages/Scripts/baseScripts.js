export function openSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.remove("inactive");
}

export function closeSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.add("inactive");
}

export function redirect(e) {
    window.location.assign(e.target.attributes.redirectLink.textContent);
}
