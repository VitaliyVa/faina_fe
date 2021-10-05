import './index.scss';
import './search/index.scss';
import "./search/index";

window.onload = function() {


    {
        let navigation_phone_arrow = document.querySelectorAll('.navigation_phone_arrow');
        navigation_phone_arrow.forEach(phone_element => {
            phone_element.addEventListener("click", function() {
                let navigation_another_phone = phone_element.closest('.header_phone__block').querySelector('.header_another_phone');
                navigation_another_phone.classList.toggle('active');
            });
        });



    }

    {
        let menu_btn = document.getElementsByClassName('header_hamburger')[0];
        menu_btn.addEventListener("click", menu_action);

        function menu_action() {
            let header_navigation = document.getElementsByClassName('header')[0];
            header_navigation.classList.toggle('active');
        }
    };

    let window_width = window.innerWidth;
    let mobile_link = document.querySelectorAll('.header_nav_content__block');
    if (window_width <= 992) {
        mobile_link.forEach(link => {
            let disable_link = link.querySelector('.header_nav_link');
            disable_link.addEventListener("click", function(e) {
                e.preventDefault();
            })
        });
    }


}