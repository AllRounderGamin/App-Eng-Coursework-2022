function openSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.remove("inactive");
}

function closeSidebar() {
    let menu = document.querySelector("#TagMenu");
    menu.classList.add("inactive");
}
