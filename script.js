//Annimations
const bubble = document.querySelector("#welcome-box")

document.addEventListener('DOMContentLoaded', function() {
    bubble.style.opacity = 1
});

//Books logic
const books = document.querySelector("#books")
let library = []

function Book(title,author,pages){
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false
}

function addBooktoLibrary(title,author,pages){
    let newbook = new Book(title,author,pages)
    library.push(newbook)
}

function display(){
    books.innerHTML = ""
    library.forEach(book => {
        let html = `
                <div class="book" data-id="${book.id}">
                    <h1>${book.title}</h1>
                    <div class="toggle-wrapper">
                        <div class="label">Unread</div>
                        <div class="toggle">
                            <div class="toggle-circle"></div>
                        </div>
                    </div>
                    <button class="del">
                        <img src="icons/closed-trash.png" alt="trashcan" class="icon">
                    </button>
                    <span>${book.author} ${book.pages} pages</span>
                </div>
            `;
        books.innerHTML += html
        //delete buttons
        const del_buttons = document.querySelectorAll(".del")

        del_buttons.forEach(btn => {
            btn.addEventListener("mouseover",() => {
                btn.style.backgroundColor = "red"
                btn.innerHTML = '<img src="icons/open-trash.png" alt="trashcan" class="icon">'
            })
            btn.addEventListener("mouseout",() => {
                btn.style.backgroundColor = "white"
                btn.innerHTML = '<img src="icons/closed-trash.png" alt="trashcan" class="icon">'
            })
            btn.addEventListener("click", () => {
                let delbook = btn.parentElement; 
                delbook.remove();
                const bookId = delbook.dataset.id;
                const index = library.findIndex(book => book.id === bookId);
                if (index !== -1) {
                    library.splice(index, 1);
                }
            })
        })
        //Toggle movement
        const toggles = document.querySelectorAll(".toggle");

        toggles.forEach(toggle => {
            toggle.addEventListener("click", () => {
                let label = toggle.previousElementSibling;
                toggle.classList.toggle("active");
                label.textContent = toggle.classList.contains("active") ? "Read" : "Unread";
        });
        })
    })
}

//new and clear buttons logic
const new_button = document.querySelector("#add")
const clear_button = document.querySelector("#dell-all")
const close_button = document.querySelector("#close")
const add_button = document.querySelector("input[type='button']")
const dialog = document.querySelector("dialog")
const titleInput = document.querySelector("input[name='title']")
const authorInput = document.querySelector("input[name='author']")
const pagesInput = document.querySelector("input[name='pages']")

new_button.addEventListener("click",() => dialog.showModal())
close_button.addEventListener("click",() => dialog.close())
clear_button.addEventListener("click",() => {library.length = 0; display();})
add_button.addEventListener("click",() => {
    if (titleInput.value.trim() && authorInput.value.trim() && pagesInput.value.trim()){
        addBooktoLibrary(titleInput.value.trim(),authorInput.value.trim(),pagesInput.value.trim())
        dialog.close()
        display()
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        alert("✅ Book added successfully")
    }
    else{
        alert("❌ Error: Invalid input")
    }
})