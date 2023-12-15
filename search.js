"use strict";

// 1. Bắt sự kiện Click vào nút "Submit" 
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");

// 2. Lấy được dữ liệu từ các Input Form 
const data = {
    Id: idInput.value,
    Name: nameInput.value,
    Type: typeInput.value,
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
</tr>`
    }
    //sử dụng điều kiện tam cấp cho Vaccinated,Dewormed,Sterilized : chú ý class='bi bi-x-circle-fill'  class sử dụng (')
    tableBodyEl.innerHTML = row;
}

//tính năng Seach

findBtn.addEventListener("click", find);
function find() {
    let petFind = petArr;
    if (idInput.value) {
        petFind = petFind.filter((pet) => pet.Id.includes(idInput.value));
    }
    if (nameInput.value) {
        petFind = petFind.filter((pet) => pet.Name.includes(nameInput.value));
    }
    if (typeInput.value !=="Select Type") {
        petFind = petFind.filter((pet) => pet.Type.includes(typeInput.value));
    }
    if (breedInput.value !== "Select Breed") {
        petFind = petFind.filter((pet) => pet.Breed.includes(breedInput.value));
    }
    if (vaccinatedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.Vaccinated === true );
    }
    if (dewormedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.Dewormed === true);
    }
    if (sterilizedInput.checked === true) {
        petFind = petFind.filter((pet) => pet.Sterilized === true);
    }
    renderTableData(petFind);
}

