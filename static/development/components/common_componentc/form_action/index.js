import './index.scss';
import validation from '../../module/validation/index';
import modal from '../../module/modal_script/index';

// form_send('.contact_form', false);



function form_send(wrapper, modal) {
    let form_wrapper = document.querySelectorAll(wrapper);
    let loader = document.querySelector('.modal_loading__block');

    form_wrapper.forEach(element => {
        let action = element.getAttribute('action');

        let btn = element.querySelector('.validation_btn');
        if (btn != null) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let status = validation(btn);



                if (status == true) {
                    console.log('send!');
                    let elements = element.elements;
                    let obj = {};

                    for (let i = 0; i < elements.length; i++) {
                        let item = elements.item(i);
                        let check_type = ['file', 'reset', 'submit', 'button'].indexOf(item.type);
                        if (check_type > -1) {

                        } else {
                            obj[item.name] = item.value;
                        }
                    }
                    if (wrapper == '.order__block') {
                        console.log(11);
                        let city = document.querySelector('.select_city').value;
                        let department = document.querySelector('.select_department').value;
                        console.log('department: ', department);
                        let method = document.querySelector('.select_method').value;
                        let adress = document.querySelector('.select_department').value;
                        let current_address;
                        let error__block = document.querySelector('.order_info_error');

                        if (method == 'courier') {
                            current_address = adress;
                        } else if (method == 'nova_pochta') {
                            current_address = `місто: ${city} - відділення: ${department}`;
                        } else {
                            current_address = 'самовивіз';
                        }
                        obj["adress"] = current_address;
                        obj["method"] = method;


                        if (department != '' && action != '') {
                            loader.classList.add('active');
                            fetch(action, {
                                method: 'POST',
                                body: new URLSearchParams(obj),
                                // body: new URLSearchParams(obj).toString(),
                            })
                                .then(data => {
                                    return data.json();
                                })
                                .then(data => {
                                    console.log('data: ', data);
                                    modal_done(data, wrapper);
                                })
                                .catch((error) => {
                                    console.log('error: ', error);
                                    bad_modal();
                                });
                            error__block.textContent = '';
                        } else {
                            error__block.textContent = 'Оберіть відділення!';
                        }


                    } else {
                        console.log(22);

                        if (action != '' || action != undefined) {
                            loader.classList.add('active');
                            fetch(action, {
                                method: 'POST',
                                body: new URLSearchParams(obj),
                                // body: new URLSearchParams(obj).toString(),
                            })
                                .then(data => {
                                    return data.json();
                                })
                                .then(data => {
                                    console.log('data: ', data);
                                    modal_done(data, wrapper);
                                })
                                .catch((error) => {
                                    console.log('error: ', error);
                                    bad_modal();
                                });

                        }
                    }

                } else {
                    console.log('error!');
                }







            });
        } else {
            console.error(`такого модального вікна не існує на цій сторінці - ${wrapper}`);
        }
    });
}


function modal_done(data, wrapper) {
    let url = data.url;
    let modal__block = document.querySelector(wrapper);
    let loader = document.querySelector('.modal_loading__block');
    if (data.status == "OK") {
        accept_modal();
        remove_error();

    } else if (data.status == "BAD") {
        let all_error = data.error_fields;
        loader.classList.remove('active');
        remove_error();

        Object.values(all_error).forEach((error, index) => {
            let field_error = document.createElement('div');
            field_error.textContent = error;
            field_error.classList.add('field_error', 'sub_title', 'sub_title_1', 'color_red');
            modal__block.append(field_error);
        });
    }
    if (url != undefined) {
        window.location.href = url;
    }
}

function bad_modal() {
    let loader = document.querySelector('.modal_loading__block');
    let bad = document.querySelector('.modal_bad__block');

    setTimeout(() => {
        loader.classList.remove('active');
        bad.classList.add('active');
    }, 500);
    setTimeout(() => {
        bad.classList.remove('active');
    }, 3000);
}

function accept_modal() {
    let loader = document.querySelector('.modal_loading__block');
    let accept = document.querySelector('.modal_accept__block');

    setTimeout(() => {
        loader.classList.remove('active');
        accept.classList.add('active');
    }, 500);
    setTimeout(() => {
        accept.classList.remove('active');
    }, 3000);
}

function remove_error() {
    let errors = document.querySelectorAll('.field_error');
    errors.forEach(error => {
        error.remove();
    });
}