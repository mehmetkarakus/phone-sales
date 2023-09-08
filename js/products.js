document.addEventListener('DOMContentLoaded', function () {
    fetch('https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales')
        .then((response) => response.json())
        .then((json) => json.forEach(tableElements)
        )

    function tableElements(element, index, arr,) {
        arr[index] = document.querySelector('#posts-table tbody').innerHTML +=
            `<tr>
                <td>${element.brand}</td>
                <td>${element.model}</td>
                <td>${element.memory}</td>
                <td>${element.price}</td>
                <td>${element.piece}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete" id="productDelete">Delete</button>
                </td>
            </tr>`
    }

    function Delete(productId) {
        fetch(`https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales/${productId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    console.log("Product is deleted.");
                    const productRow = document.querySelector(
                        `[data-product-id="${productId}"]`
                    );
                    if (productRow) {
                        productRow.remove();
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

            console.log(productId , "test");
    }

    function EditCell(tdElement) {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("edit-input");

        input.value = tdElement.textContent;
        tdElement.textContent = "";
        tdElement.appendChild(input);

        return input;
    }

    function Edit(productId, tr) {
        console.log(productId)
        const brandCell = tr.querySelector("td:nth-child(1)");
        const modelCell = tr.querySelector("td:nth-child(2)");
        const memoryCell = tr.querySelector("td:nth-child(3)");
        const priceCell = tr.querySelector("td:nth-child(4)");
        const pieceCell = tr.querySelector("td:nth-child(5)");

        const brandInput = EditCell(brandCell);
        const modelInput = EditCell(modelCell);
        const memoryInput = EditCell(memoryCell);
        const priceInput = EditCell(priceCell);
        const pieceInput = EditCell(pieceCell);

        const editButton = tr.querySelector(".edit");
        editButton.textContent = "Save";

        function handleSaveClick() {
            const updatedBrand = brandInput.value;
            const updatedModel = modelInput.value;
            const updatedMemory = memoryInput.value;
            const updatedPrice = priceInput.value;
            const updatedPiece = pieceInput.value;

            const updateProductData = {
                brand: updatedBrand,
                model: updatedModel,
                memory: updatedMemory,
                price: updatedPrice,
                piece: updatedPiece,
                // Add other fields as needed
            };

            fetch(`https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales/${productId}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updateProductData),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((updatedProduct) => {
                    console.log("Product updated:", updatedProduct);

                    brandCell.textContent = updatedBrand;
                    modelCell.textContent = updatedModel;
                    memoryCell.textContent = updatedMemory;
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

    document.querySelector('#posts-table tbody').addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("delete")) {
            const productIdToDelete = target.closest("tr").getAttribute("data-product-id");
            Delete(productIdToDelete);
        } else if (target.classList.contains("edit")) {
            const tr = target.closest("tr");
            const productIdToEdit = tr.getAttribute("data-product-id");
            Edit(productIdToEdit, tr);
        }
    });
});