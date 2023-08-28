document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.addEventListener("click", test);

    function test() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    var acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    const apiBaseUrl = 'https://64e3c5a2bac46e480e792c58.mockapi.io/phone_sales';

    const addbtn = document.querySelector('#new__btn');
    addbtn.addEventListener('click', () => {
        phonesales();
    });

    function taskNerde(task, taskId) {
        const product = document.querySelector("#product__phone");
        const tr = document.createElement("tr");

        const brandInput = document.createElement("td");
        brandInput.classList.add("new-brand");
        brandInput.textContent = task.brand;
        tr.appendChild(brandInput);

        const modelInput = document.createElement("td");
        modelInput.classList.add("new-model");
        modelInput.textContent = task.model;
        tr.appendChild(modelInput);

        const priceInput = document.createElement("td");
        priceInput.classList.add("new-price");
        priceInput.textContent = task.price;
        tr.appendChild(priceInput);

        const pieceInput = document.createElement("td");
        pieceInput.classList.add("new-piece");
        pieceInput.textContent = task.piece;
        tr.appendChild(pieceInput);

        const actionCell = document.createElement("td");

        const editSpan = document.createElement("span");
        editSpan.textContent = "Edit";
        editSpan.classList.add("edit");

        const deleteSpan = document.createElement("span");
        deleteSpan.textContent = "Delete";
        deleteSpan.classList.add("delete");

        actionCell.appendChild(editSpan);
        actionCell.appendChild(deleteSpan);
        tr.appendChild(actionCell);

        function Delete(taskId) {
            fetch(`${apiBaseUrl}/${taskId}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("Task is deleted.");
                        const taskRow = document.querySelector(
                            `[data-task-id="${taskId}"]`
                        );
                        if (taskRow) {
                            taskRow.remove();
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        deleteSpan.setAttribute("data-task-id", taskId);
        deleteSpan.addEventListener("click", function () {
            const taskIdToDelete = deleteSpan.getAttribute("data-task-id");
            Delete(taskIdToDelete);

            product.removeChild(tr);
        });

        function EditCell(tdElement) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("edit-input");

            input.value = tdElement.textContent;
            tdElement.textContent = "";
            tdElement.appendChild(input);

            return input;
        }

        function Edit(taskId, tr) {
            const brandCell = tr.querySelector(".new-brand");
            const modelCell = tr.querySelector(".new-model");
            const priceCell = tr.querySelector(".new-price");
            const pieceCell = tr.querySelector(".new-piece");

            const brandInput = Editcell(brandCell);
            const modelInput = Editcell(modelCell);
            const priceInput = Editcell(priceCell);
            const pieceInput = Editcell(pieceCell);

            const editButton = tr.querySelector(".edit");
            editButton.textContent = "Save";

            function handleSaveClick() {
                const updatedBrand = brandInput.value;
                const updatedModel = modelInput.value;
                const updatedPrice = priceInput.value;
                const updatedPiece = pieceInput.value;

                const updateTaskData = {
                    brand: updatedBrand,
                    model: updatedModel,
                    price: updatedPrice,
                    piece: updatedPiece,
                }

                fetch(`https://64e3c5a2bac46e480e792c58.mockapi.io/phone_sales${taskId}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(updateTaskData),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((updatedTask) => {
                        console.log("Task updated:", updatedTask);

                        brandCell.textContent = updatedBrand;
                        modelCell.textContent = updatedModel;
                        priceCell.textContent = updatedPrice;
                        pieceCell.textContent = updatedPiece;
                        editButton.textContent = "Edit";
                        editButton.removeEventListener("click", handleSaveClick);
                        editButton.addEventListener("click", handleEditClick);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }

            function handleEditClick() {
                editButton.removeEventListener("click", handleEditClick);
                editButton.addEventListener("click", handleSaveClick);
            }

            editButton.removeEventListener("click", handleEditClick);
            editButton.addEventListener("click", handleSaveClick);
        }


        editSpan.setAttribute("data-task-id", taskId);
        editSpan.addEventListener("click", function () {
            const taskIdToEdit = editSpan.getAttribute("data-task-id");
            Edit(taskIdToEdit, tr);
        });

        product.appendChild(tr);

    }

    function renderProductRow(product) {
        const productTable = document.getElementById("product__phone");
        console.log('Tuna', productTable)
        const newRow = productTable.insertRow();
        console.log('Sikerim', newRow);
        const brand = newRow.insertCell(0)
        const model = newRow.insertCell(0)
        const price = newRow.insertCell(0)
        const piece = newRow.insertCell(0)
        const stuation = newRow.insertCell(0)
        console.log(product);
        brand.innerHtml = `${product.brand}`
        model.innerHtml = `${product.model}`
        price.innerHtml = `${product.price}`
        piece.innerHtml = `${product.piece}`
    }

    function loadProductsFromLocalStorage() {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            const products = JSON.parse(savedProducts);
            products.forEach((product) => {
                renderProductRow(product);
            });
        }
    }

    loadProductsFromLocalStorage();

    function saveProductsToLocalStorage(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function phonesales() {

        const productBrand = document.querySelector("#text__brand");
        const productModel = document.querySelector("#text__model");
        const productPrice = document.querySelector("#text__price");
        const productPiece = document.querySelector("#text__piece");

        if (productBrand.value.trim() === "") {
            console.log("Marka Boş Bırakılamaz.");
            alert("Lütfen Marka Alanını Doldurun.");
            return;
        }

        if (productModel.value.trim() === "") {
            console.log("Model Boş Bırakılamaz.");
            alert("Lütfen Model Alanını Doldurun.");
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

        const newTask = {
            brand: productBrand.value,
            model: productModel.value,
            price: productPrice.value,
            piece: productPiece.value,
        };

        fetch(`${apiBaseUrl}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
            .then((product) => {
                console.log("Yeni Ürün Ekle: ", product);
                renderProductRow(product);
                const savendProducts = localStorage.getItem("products");
                const products = savedProducts ? JSON.parse(savedProducts) : [];
                products.push(product);
                saveProductsToLocalStorage(products);
            })
            .catch((error) => {
                console.error("error:", error);
            });

        productBrand.value = "";
        productModel.value = "";
        productPrice.value = "";
        productPiece.value = "";
    }

    addbtn.addEventListener("click", () => {
        phonesales();
    });

    function loadTasksFromLocalStorage() {

        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach((task) => {
                taskNerde(task);
            });
        }

    }

    loadTasksFromLocalStorage();

    function saveTasksToLocalStorage() {
        const tasks = Array.from(document.querySelectorAll(".new-brand")).map(
            (brandCell) => {
                const tr = brandCell.parentElement;
                return {
                    brand: brandCell.textContent,
                    model: tr.querySelector(".new-model").textContent,
                    price: tr.querySelector(".new-price").textContent,
                    piece: tr.querySelector(".new-piece").textContent,
                };
            }
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    window.addEventListener('beforeunload', () => {
        saveTasksToLocalStorage();
    });

    addbtn.addEventListener('click', phonesales);

});
