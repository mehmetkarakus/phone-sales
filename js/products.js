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
                <td>
                    <button class="edit" id="editSpan">Edit</button>
                    <button class="delete" id="editSpan">Delete</button>
                </td>
            </tr>`
    }

    function situation(product) {
        const editSpan = document.createElement("span");
        editSpan.textContent = "Edit";
        editSpan.classList.add("edit");
    
        const deleteSpan = document.createElement("span");
        deleteSpan.textContent = "Delete";
        deleteSpan.classList.add("delete");
    
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
        }
    
        deleteSpan.setAttribute("data-product-id", product);
        deleteSpan.addEventListener("click", function () {
            const productIdToDelete = deleteSpan.getAttribute("data-product-id");
            Delete(productIdToDelete);
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
    
        function Edit(productId, tr) {
            const nameCell = tr.querySelector(".new-name");
            const descriptionCell = tr.querySelector(".new-description");
    
            const nameInput = EditCell(nameCell);
            const descriptionInput = EditCell(descriptionCell);
    
            const editButton = tr.querySelector(".edit");
            editButton.textContent = "Save";
    
            function handleSaveClick() {
                const updatedTitle = nameInput.value;
                const updatedDescription = descriptionInput.value;
    
                const updateproductData = {
                    content: updatedTitle,
                    description: updatedDescription,
                };
    
                fetch(`https://64f8ea0d824680fd21803114.mockapi.io/phone-sales/phone-sales/${productId}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(updateproductData),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((updatedproductId) => {
                        console.log("productId updated:", updatedproductId);
    
                        nameCell.textContent = updatedTitle;
                        descriptionCell.textContent = updatedDescription;
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
    
        editSpan.setAttribute("data-product-id", product);
        editSpan.addEventListener("click", function () {
            const productIdToEdit = editSpan.getAttribute("data-product-id");
            Edit(productIdToEdit, tr);
        });
    }
})