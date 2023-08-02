const contactButton = document.querySelector('.contact__avatar');
const contactPopup = document.querySelector('.contact__popup');

contactButton.addEventListener('click', () => {
    if (contactPopup.classList == 'contact__popup') {
        contactPopup.classList.add('fade__On');
        setTimeout( ()=> {
            contactPopup.classList.add('active__popup');
        }, 300)
    } else if (contactPopup.classList == 'contact__popup fade__On active__popup') {
        contactPopup.classList.remove('fade__On');
        contactPopup.classList.add('fade__Off');
        setTimeout(() => {
            contactPopup.classList.remove('active__popup');
        }, 300);
        setTimeout(()=> {
            contactPopup.classList.remove('fade__Off');
        }, 301);
    }
});
