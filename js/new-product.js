const dropdownButton = document.getElementById("dropdownButton");
const dropdown = document.getElementById("myDropdown");
const options = ["Apple", "Samsung", "Huawei", "Xiaomi", "Oppo"];

dropdownButton.addEventListener("click", function () {
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
        populateDropdown();
    }
});

function populateDropdown() {

    while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }

    for (let i = 0; i < options.length; i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = options[i];
        dropdown.appendChild(link);

        link.addEventListener("click", function () {
            const selectedOption = this.textContent;
            dropdownButton.textContent = selectedOption;
            dropdown.style.display = "none";
        });
    }
}

const addbtn = document.querySelector('#new__ekle');
addbtn.addEventListener('click', () => {
    const selectedOption = dropdownButton.textContent;
    const productsButton = document.querySelector("span");
    productTable(selectedOption , productsButton.innerHTML)
})

function productTable(selectedOption, productsButton) {
    const productBrand = selectedOption;
    const productModel = document.querySelector("#text__model");
    const productMemory = document.querySelector("#text__memory");
    const productPrice = document.querySelector("#text__price");
    const productPiece = document.querySelector("#text__piece");
    const productSituation = productsButton;

    if (productBrand.value === "") {
        console.log("Marka Boş Bırakılamaz.");
        alert("Lütfen Marka Alanını Doldurun.");
        return;
    }

    if (productModel.value.trim() === "") {
        console.log("Model Boş Bırakılamaz.");
        alert("Lütfen Model Alanını Doldurun.");
        return;
    }

    if (productMemory.value.trim() === "") {
        console.log("Hafıza Boş Bırakılamaz.");
        alert("Lütfen Hafıza Alanını Doldurun.");
        return;
    }

    if (productPrice.value.trim() === "") {
        console.log("Fiyat Boş Bırakılamaz.");
        alert("Lütfen Fiyat Alanını Doldurun.");
        return;
    }

    if (productPiece.value.trim() === "") {
        console.log("Adet Boş Bırakılamaz.");
        alert("Lütfen Adet Alanını Doldurun.");
        return;
    }

    const newProduct = {
        brand: productBrand,
        model: productModel.value,
        memory: productMemory.value,
        price: productPrice.value,
        piece: productPiece.value,
        situation: productSituation,
    };

    fetch("https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    })
        .then((res) => res.json())
        .then((product) => {
            console.log("Yeni Ürün Eklendi: ", product);
            renderProductRow(product);
        })
        .catch((error) => {
            console.error("Hata: ", error);
        });

    productBrand.value = "";
    productModel.value = "";
    productMemory.value = "";
    productPrice.value = "";
    productPiece.value = "";
}

function renderProductRow(product) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.brand}</td>
        <td>${product.model}</td>
        <td>${product.memory}</td>
        <td>${product.price}</td>
        <td>${product.piece}</td>
        <td>${product.situation}</td>
    `;

}

