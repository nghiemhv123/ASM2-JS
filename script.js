"use strict";

// 1. Bắt sự kiện Click vào nút "Submit" 
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

// 2. Lấy được dữ liệu từ các Input Form 
const data = {
    Id: idInput.value,
    Name: nameInput.value,
    Age: parseInt(ageInput.value),
    Type: typeInput.value,
    Weight: parseInt(weightInput.value),
    Length: parseInt(lengthInput.value),
    Color: colorInput.value,
    Breed: breedInput.value,
    Vaccinated: vaccinatedInput.checked,
    Dewormed: dewormedInput.checked,
    Sterilized: sterilizedInput.checked,
    Date: new Date(),
};
// đổi định dạng ngày giờ 
const result2 = data.Date.toLocaleDateString('vi-VN', {
    hour12: false,
});
console.log(data);

const petArr = JSON.parse(getFromStorage("list-pet", "[]")) || [];
renderTableData(petArr);
console.log(petArr);


// Hiển thị Breed trong màn hình quản lý thú cưng
const breedArr = JSON.parse(getFromStorage("list-breed", "[]")) || [];
console.log(breedArr);
function renderBreed() {
    breedInput.innerHTML = "<option>Select Breed</option>";
    const breeds = breedArr.filter((breedItem) => breedItem.Type === typeInput.value);
    console.log(breeds);
    breeds.forEach((breedItem) => {
        const option = document.createElement("option");
        option.innerHTML = `${breedItem.Namebreed}`;
        breedInput.appendChild(option);
    });
}


// 3. Validate dữ liệu hợp lệ 
// gán onclick ="validate" ở thẻ button-sumit 
function Validate() {
    //thông báo ID pet trùng nhau
    for (let i = 0; i < petArr.length; i++) {
        if (idInput.value === petArr[i].Id) {
            alert("ID must be unique!");
        }
    }
    if (idInput.value == "") {
        alert("Please input for ID!");
    } else if (idInput.value.charAt(0) === " ") {
        alert("Data cannot use 'spaces' ID!");
    } else if (nameInput.value == "" || nameInput.value.charAt(0) === " ") {
        alert("Please input for Name !");
    } else if (ageInput.value == "" || ageInput.value > 15 || ageInput.value < 1) {
        alert("Age must be between 1 and 15!");
    } else if (typeInput.value == "Select Type") {
        alert("Please select Type!");
    } else if (weightInput.value == '' || weightInput.value > 15 || weightInput.value < 1) {
        alert("Weight must be between 1 and 15!");
    } else if (lengthInput.value == "" || lengthInput.value > 100 || lengthInput.value < 1) {
        alert("Length must be between 1 and 100!");
    } else if (breedInput.value == "Select Breed") {
        alert("Please select Breed!");
    } else {
        const data = {
            Id: idInput.value,
            Name: nameInput.value,
            Age: parseInt(ageInput.value),
            Type: typeInput.value,
            Weight: parseInt(weightInput.value),
            Length: parseInt(lengthInput.value),
            Color: colorInput.value,
            Breed: breedInput.value,
            Vaccinated: vaccinatedInput.checked,
            Dewormed: dewormedInput.checked,
            Sterilized: sterilizedInput.checked,
            Date: new Date(),
        };
        console.log(data);
        petArr.push(data);
        clearInput(petArr);
        renderTableData(petArr);
        saveToStorage("list-pet", petArr);
    }

}
// 45. Hiển thị danh sách thú cưng 

function renderTableData(petArr) {
    localStorage.setItem("list-pet", JSON.stringify(petArr))
    const tableBodyEl = document.getElementById('tbody');
    let row = "";
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        row += `<tr>
    <th >${petArr[i].Id}</th>
    <td >${petArr[i].Name}</td>
    <td >${petArr[i].Age}</td>
    <td >${petArr[i].Type}</td>
    <td >${petArr[i].Weight} kg</td>
    <td >${petArr[i].Length} cm</td>
    <td >${petArr[i].Breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].Color}"></i>
    </td>
    <td >${petArr[i].Vaccinated ? "<i class='bi bi-check-circle-fill'></i>" : "<i class='bi bi-x-circle-fill'></i>"}</td>
    <td >${petArr[i].Dewormed ? "<i class='bi bi-check-circle-fill'></i>" : "<i class='bi bi-x-circle-fill'></i>"}</td>
    <td >${petArr[i].Sterilized ? "<i class='bi bi-check-circle-fill'></i>" : "<i class='bi bi-x-circle-fill'></i>"}</td>
    <td style="color:blue;" >${new Date(petArr[i].Date).toLocaleDateString('vi-VN', {
            hour12: false,
        })}</td>
    <td><button type="button" class="btn btn-danger"  style="background-color: red;" onclick="deletePet('${petArr[i].Id}')">Delete</button>
    </td>
</tr>`
    }
    //sử dụng điều kiện tam cấp cho Vaccinated,Dewormed,Sterilized : chú ý class='bi bi-x-circle-fill'  class sử dụng (')
    tableBodyEl.innerHTML = row;
}

// 6. Xóa các dữ liệu vừa nhập trên Form 

const clearInput = () => {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "Select color";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = "";
    dewormedInput.checked = "";
    sterilizedInput.checked = "";
}

// 7. Xóa một thú cưng 

const deletePet = (petId) => {
    // Confirm before deletePet
    if (confirm('Are you Delete?')) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].Id == petId) {
                petArr.splice(i, 1);
                //splice i là vị trí của phần tử cần xóa,1 là số lượng phần tử cần xóa.
            }
        }
        renderTableData(petArr)
    }
}
//8. Hiển thị các thú cưng khỏe mạnh

let healthyCheck = false;
function healthy() {
    const healthyPet = petArr.filter((pet) => pet.Vaccinated === true && pet.Dewormed == true && pet.Sterilized == true);
    console.log(healthyPet);
    if (!healthyCheck) {
        renderTableData(healthyPet);
        healthyBtn.textContent = 'Show All Pet';
    } else {
        renderTableData(petArr)
        healthyBtn.textContent = 'Show Healthy Pet';
    }
    healthyCheck = !healthyCheck

}
