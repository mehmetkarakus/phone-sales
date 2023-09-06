document.addEventListener('DOMContentLoaded', function () {
    fetch('https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales')
            .then((response) => response.json())
            .then((json) => json.forEach(tableElements)
            )

        function tableElements(element, index, arr) {
            arr[index] = document.querySelector('#posts-table tbody').innerHTML +=
                `<tr>
                    <td>${element.brand}</td>
                    <td>${element.model}</td>
                    <td>${element.memory}</td>
                    <td>${element.price}</td>
                    <td>${element.piece}</td>
                    <td>${element.situation}
                </tr>`
        }
})