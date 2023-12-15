"use strict";

//  Bắt sự kiện Click vào nút "Submit" 
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

//  Lấy được dữ liệu từ các Input Form 
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


//  Hiển thị danh sách thú cưng 

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
    <td><button type="button" class="btn btn-primary"  style="background-color: #ffc107;" onclick="Edit('${petArr[i].Id}')">Edit</button>
    </td>
</tr>`
    }
    tableBodyEl.innerHTML = row;
}


// Edit Form
const formEl = document.getElementById("container-form")
const Edit = (petid) => {
    formEl.classList.remove("hide")
    const pet = petArr.find((petItem) => petItem.Id === petid)
        idInput.value = pet.Id,
        nameInput.value = pet.Name,
        ageInput.value = pet.Age,
        typeInput.value = pet.Type,
        weightInput.value = pet.Weight,
        lengthInput.value = pet.Length,
        colorInput.value = pet.Color,
        renderBreed();
        breedInput.value = pet.Breed,
        vaccinatedInput.checked = pet.Vaccinated,
        dewormedInput.checked = pet.Dewormed,
        sterilizedInput.checked = pet.Sterilized
}


// Click Submit thay đổi data và ẩn form 
submitBtn.addEventListener("click", submit);
function submit() {
    formEl.classList.add("hide");
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
    const index = petArr.findIndex((pet) => pet.Id === data.Id)
    petArr[index] = data;
    renderTableData(petArr);
}
