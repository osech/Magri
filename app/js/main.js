// faq accordion

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-accordion__title').forEach((el) => {
        el.addEventListener('click', () => {
            
            let content = el.nextElementSibling
            
            if (content.style.maxHeight) {
                document.querySelectorAll('.faq-accordion__text').forEach((el) => {
                    el.style.maxHeight = null
                    el.style.paddingBottom = null
                    el.previousElementSibling.classList.remove('open')
                })

            } else {
                document.querySelectorAll('.faq-accordion__text').forEach((el) => {
                    el.style.maxHeight = null
                    el.style.paddingBottom = null
                    el.previousElementSibling.classList.remove('open')
                })
                content.previousElementSibling.classList.add('open')
                content.style.maxHeight = content.scrollHeight + 32 + 'px'
                content.style.paddingBottom = '32px'
            }
        })
    })
})


// accordion
const boxes = Array.from(document.querySelectorAll(".accordion__title"));

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    e.preventDefault(); 
    let currentBox = e.target.closest(".accordion__title"); 
    let currentContent = currentBox.nextElementSibling;
    currentBox.classList.toggle("open");
    if (currentBox.classList.contains("open")) { 
      currentContent.style.maxHeight = currentContent.scrollHeight + "px";
      currentContent.style.marginTop = '20px';
    } else {
      currentContent.style.maxHeight = null;
      currentContent.style.marginTop = null;
    }
  })
});


// popups

function popup(openPopupButton, closePopupButton, popup, popupBg) {
  if (!(openPopupButton && closePopupButton && popup && popupBg)) {
    return
  }
  openPopupButton.addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    popupBg.classList.add('active'); // Добавляем класс 'active' для фона
    popup.forEach((el) => el.classList.add('active')); // И для самого окна
    document.body.classList.add('scroll-lock');
  });

  closePopupButton.forEach((el) => {
    el.addEventListener('click',() => { // Вешаем обработчик на крестик
      popupBg.classList.remove('active'); // Убираем активный класс с фона
      popup.forEach((el) => el.classList.remove('active')); // И с окна
      document.body.classList.remove('scroll-lock');
    })});
   

  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg) { // Если цель клика - фон, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.forEach((el) => el.classList.remove('active')); // И с окна
        document.body.classList.remove('scroll-lock');
    }
  });
};

let cartPopupBg = document.querySelector('.cart-popup'); // Фон попап окна
let cartPopup = document.querySelectorAll('.cart-popup__content'); // Само окно
let cartOpenPopupButton = document.querySelector('.open-cart-popup'); // Кнопки для показа окна
let cartClosePopupButton = document.querySelectorAll('.close-cart-popup'); // Кнопка для скрытия окна
popup(cartOpenPopupButton, cartClosePopupButton, cartPopup, cartPopupBg);

let filterPopupBg = document.querySelector('.filter-popup'); // Фон попап окна
let filterPopup = document.querySelectorAll('.filter-popup__content'); // Само окно
let filterOpenPopupButton = document.querySelector('.open-filter-popup'); // Кнопки для показа окна
let filterClosePopupButton = document.querySelectorAll('.close-filter-popup'); // Кнопка для скрытия окна
popup(filterOpenPopupButton, filterClosePopupButton, filterPopup, filterPopupBg);

let navbarPopupBg = document.querySelector('.navbar-popup'); // Фон попап окна
let navbarPopup = document.querySelectorAll('.navbar-popup__content'); // Само окно
let navbarOpenPopupButton = document.querySelector('.open-navbar-popup'); // Кнопки для показа окна
let navbarClosePopupButton = document.querySelectorAll('.close-navbar-popup'); // Кнопка для скрытия окна
popup(navbarOpenPopupButton, navbarClosePopupButton, navbarPopup, navbarPopupBg);


