// інпут пошуку
let input_search = document.querySelectorAll('.navigation_search_input');

// контейнер де генеряться карточки товару
let container = document.querySelector('.header_content_item__block');

// обгортка всього пошуку
let wrapper = document.querySelector('.navigation_search');


function create_cart(content) {
    console.log('content: ', content);
    let code;
    let current_price = 0;

    if (content.price == 0) {
        current_price = content.second_price;
    } else if (content.price != 0) {
        current_price = content.price;
    }

    if (content.code != null) {
        code = ` 
        <span class="header_content_item_type sub_title sub_title_0 color_gray_0">
            ${content.code}
        </span>`
    } else {
        code = ``
    }
    console.log('content.currency.code: ', content.currency.code);
    let header_content_item_profile = document.createElement('a');
    header_content_item_profile.setAttribute(`href`, content.url);
    header_content_item_profile.classList.add('header_content_item_profile');
    header_content_item_profile.innerHTML = `
        <span class="header_content_item_img">
            <img src="${content.image}" alt="item">
        </span>
        <span class="header_content_item">
            <span class="header_content_item_title sub_title sub_title_1 color_black">
                ${content.title}
            </span>
            ${code}
            <span class="header_content_item_price standart_title standart_title_1 color_black">
                ${current_price}${content.currency.code}
            </span>
        </span>
    `;

    return header_content_item_profile;
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function saveInput(value) {
    console.log('value: ', value);
    let test_json = [{
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        },
        {
            image: '../static/source/img/header/test.png',
            title: 'Манжета 65х90х10 редуктора при...',
            code: 'DE18618.P',
            price: '222,60',
            url: '#',
            currency: {
                symbol: 'ua'
            }
        }
    ]



    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (value.length != 0) {
        wrapper.classList.add('show');

        // fetch(`/api/search_items/?search_query=${value}`, {
        //     method: 'GET',
        // })
        //     .then(data => {
        //         return data.json();
        //     })
        //     .then(data => {
        //         if (data.length == 0) {
        //             let header_content_item_error = document.createElement('div');
        //             header_content_item_error.textContent = container.dataset.error;
        //             header_content_item_error.classList.add('header_content_item_error', 'sub_title', 'sub_title_1', 'color_black_1');
        //             container.append(header_content_item_error);
        //         } else {
        //             data.forEach((element, index) => {
        //                 container.append(create_cart(element));
        //             });
        //         }
        //     });

        test_json.forEach((element, index) => {
            container.append(create_cart(element));
        });

    } else {
        wrapper.classList.remove('show');
    }
}
const processChange = debounce((value) => saveInput(value));

if (input_search.length > 0) {
    input_search.forEach(input => {
        input.addEventListener('submit', function(e) {
            e.preventDefault();
        });

        input.addEventListener('input', function(e) {
            processChange(this.value);
        });

        input.addEventListener('paste', function(e) {
            processChange(this.value);
        });

        input.addEventListener('keydown', function(e) {
            processChange(this.value);
        });

        // input.addEventListener('change', function (e) {
        //     processChange(this.value);
        // });

        input.addEventListener('blur', function(e) {
            wrapper.classList.remove('show');
        });
        input.addEventListener('focus', function(e) {
            wrapper.classList.add('show');
        });
    });

}