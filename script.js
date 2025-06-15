const bubble = document.querySelector("#welcome-box")
const del_buttons = document.querySelectorAll(".del")
document.addEventListener('DOMContentLoaded', function() {
    bubble.style.opacity = 1
});
del_buttons.forEach(btn => {
    btn.addEventListener("mouseover",() => {
        btn.style.backgroundColor = "red"
        btn.innerHTML = '<img src="icons/open-trash.png" alt="trashcan" class="icon">'

    })
    btn.addEventListener("mouseout",() => {
        btn.style.backgroundColor = "white"
        btn.innerHTML = '<img src="icons/closed-trash.png" alt="trashcan" class="icon">'
    })
})
const toggle = document.getElementById("myToggle");
const label = document.getElementById("toggleLabel");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    label.textContent = toggle.classList.contains("active") ? "Read" : "Unread";
});
