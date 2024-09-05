const menubtn = document.querySelector(".menubtn");
const closebtn = document.querySelector(".closebtn");

menubtn.onclick = () => {
    menubtn.style.display = "none"
    closebtn.style.display = "block"
}

closebtn.onclick = () => {
    closebtn.style.display = "none"
    menubtn.style.display = "block"
}