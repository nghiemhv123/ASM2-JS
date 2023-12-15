'use strict';
//bắt sự kiện khi click submit
const submitEl = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");

// a. Lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng
const breed = {
    Namebreed: breedInput.value,
    Type: typeInput.value
};
console.log(breed);
const breedArr = JSON.parse(getFromStorage("list-breed", "[]")) || [];
renderBreedtable(breedArr);



// Validate dữ liệu hợp lệ 
function validatebreed() {
    //thông báo breed không được để trống
    if (breedInput.value == "") {
        alert('Please input for Name !');
    } else if (typeInput.value == "Select Type") {
        alert('Please select Type!');
    } else {
        const breed = {
            Namebreed: breedInput.value,
            Type: typeInput.value
        };
        console.log(breed);
        breedArr.push(breed);
        clearbreed()
        renderBreedtable(breedArr);
        saveToStorage("list-breed",breedArr);

    }
};

// b. Thêm Breed
function renderBreedtable() {
    localStorage.setItem("list-breed", JSON.stringify(breedArr))
    const tableBreed = document.getElementById("tbody");
    tableBreed.innerHTML = "";
    let row = "";
    for (let i = 0; i < breedArr.length; i++) {
        row += `<tr>
                 <td >${i + 1}</td>
                 <td >${breedArr[i].Namebreed}</td>
                 <td >${breedArr[i].Type}</td> 
                 <td><button type="button" class="btn btn-danger"  style="background-color: red;" onclick="deletebreed('${breedArr[i].Namebreed}')">Delete</button>
                 </tr>`
    }
    tableBreed.innerHTML = row;
};

//clear input breed
const clearbreed = () => {
    breedInput.value = "";
    typeInput.value = "Select Type";
}

// c. Xóa breed
const deletebreed = (breedname) => {
    if (confirm('Are you Delete?')) {
        for (let i = 0; i < breedArr.length; i++) {
            if (breedArr[i].Namebreed == breedname) {
                breedArr.splice(i, 1);
            }
        }
        renderBreedtable(breedArr)
    }
}



