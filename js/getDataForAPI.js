"use strict";

const company = document.querySelector('#company_name');
const interval = document.querySelector('#interval');
const numberOfRecords = document.querySelector('#numberOfRecords');
const date = document.querySelector('#date');
const dateFinish = document.querySelector('#dateFinish');

date.valueAsDate = new Date();
dateFinish.valueAsDate = new Date();

$.get('https://sedelkin.ru/api/security_list').done(function (data) {
    const items = Object.values(data['data']);
    for (let item in items) {
        let option = document.createElement('option');
        option.value = items[item]['secid'];
        option.textContent = items[item]['title'];
        company.appendChild(option);
    }
});

$.get('https://sedelkin.ru/api/interval').done(function (data) {
    const items = Object.values(data['data']);
    for (let title in items) {
        let option = document.createElement('option');
        option.value = items[title]['value'];
        option.textContent = items[title]['title'];
        interval.appendChild(option);
    }
});

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'График',
            data: [],
            // 'rgb(32,178,170)'
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(174, 175, 176, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(174,175,176)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            },
        },
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'rgb(174,175,176)'
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = validateForm();
        if (error !== 0) {
            alert("Неверный ввод.")
        } else {
            let params = {
                app_key: 'lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi', // я знаю, что так делать нельзя, но я ленивый
                secid: company.options[company.selectedIndex].value,
                interval: interval.options[interval.selectedIndex].value,
                limits: numberOfRecords.value,
                start: date.value,
                end: dateFinish.value
            }
            $.post("https://sedelkin.ru/api/history/get_data", params).done(
                function (data) {
                    let labels = [];
                    let dataForChart = [];
                    let label;
                    if (data['data'].length !== 0 && data['status'] !== 'Error') {
                        for (let index = 0; index < data['data'].length; index++) {
                            labels.push(data['data'][index]['datetime']);
                            dataForChart.push(data['data'][index]['close']);
                        }
                        label = data['secid'];
                        updateConfigByMutating(label, labels, dataForChart);
                        scrollTo();
                    } else {
                        alert("По вашему запросу ничего не нашлось.")
                    }
                });
        }
    }

    function validateForm() {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_numbersOfRecords')) {
                if (numberOfRecords.value > 1700 || numberOfRecords.value < 1) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_date')) {
                if (date.valueAsDate > new Date()) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_companyName')) {
                if (input.options[input.selectedIndex].value === "Выберите компанию") {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_interval')) {
                if (input.options[input.selectedIndex].value === "Выберите интервал") {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('_dateFinish')) {
                if (dateFinish.valueAsDate > new Date() || dateFinish.valueAsDate < date.valueAsDate) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function scrollTo() {
        $('html, body').animate({
            scrollTop: $(ctx).offset().top -70
        }, {
            duration: 400,
            easing: "linear"
        });
        return false;
    }
});

function updateConfigByMutating(label, labels, data) {
    myChart.data.datasets[0].label = label;
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = data;

    myChart.update();
}
