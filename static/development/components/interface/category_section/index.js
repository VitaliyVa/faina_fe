import './index.scss';

let all_items = document.querySelectorAll('.category_item');

all_items.forEach(item => {
    item.addEventListener("click", function() {
        let href = item.dataset.href;
        window.location = href;
    });
});