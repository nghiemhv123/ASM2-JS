




// saveToStorage: Hàm nhận hai tham số là Key và Value, sau đó sẽ thực hiện việc lưu xuống LocalStorage
// const storePet = (petArr) => saveToStorage("list-petArr",JSON.stringify(petArr));
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
// getFromStorage: Hàm nhận vào tham số là Key, sau đó sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng
function getFromStorage(key, defaultVal) {
    return localStorage.getItem(key) ?? defaultVal;
}







