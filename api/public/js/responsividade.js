function menuResp (menu, list, listItems) {
  const mobileMenu = document.querySelector(menu)
  const navList = document.querySelector(list)

  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active')
  })

  // console.log(mobileMenu);
}

menuResp('.mobile-menu', '.nav-list', '.nav-list li')
