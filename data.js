"use strict";

const fileInput = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
// export
function saveFile() {
    if (confirm(" You are export data ? ")) {
        const blob = new Blob([getFromStorage("list-pet", "petArr")], 
        { type: "text/plain;charset=utf-8", });
                saveAs(blob, "DataPet.json");
                console.log(blob);
    }
}
//import
const petArr = JSON.parse(getFromStorage("list-pet", "[]")) || [];
console.log(petArr);
//   tham khảo ở https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
function getFile() {
    if (!fileInput.value) {
        alert('Please import file !')
    }
    const [file] = document.querySelector("input[type=file]").files;
    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            // display 
            confirm("You are import?")
            const pets = JSON.parse(reader.result);
            let petHas = petArr.filter((pet) => pet.Id === pets.Id);
             if (!petHas) {
                alert("Trùng ID import không thành công")
                }else{
                    saveToStorage("list-pet", pets);
                    alert("import Success")
                }
      },
      false,
    );
    if (file) {
      reader.readAsText(file);
    }
     //clear
    fileInput.value="";
  }

