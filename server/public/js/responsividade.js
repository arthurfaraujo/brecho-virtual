function menu_resp(menu, list, listItems) {
    const mobileMenu = document.querySelector(menu);
    const navList = document.querySelector(list);
    const navLisItems = document.querySelector(listItems);

    mobileMenu.addEventListener("click", () => {
        navList.classList.toggle("active");
    })

    console.log(mobileMenu);
}

menu_resp(".mobile-menu", ".nav-list", ".nav-list li");