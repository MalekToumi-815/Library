//Annimations
const bubble = document.querySelector("#welcome-box")

document.addEventListener('DOMContentLoaded', function() {
    bubble.style.opacity = 1
});

//Books logic
const books = document.querySelector("#books")
let library = []

//book events
books.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".del");
    const toggle = e.target.closest(".toggle");

    // Delete button
    if (delBtn) {
        const start = performance.now();
        const bookDiv = delBtn.closest(".book");
        const bookId = bookDiv.dataset.id;
        const index = library.findIndex(book => book.id === bookId);
        if (index !== -1) {
            library.splice(index, 1);
            display();
        }
        const end = performance.now(); // End timer
    console.log(`⏱️ Deletion took ${end - start}ms`);
    }

    // Toggle switch
    if (toggle) {
        toggle.classList.toggle("active");
        const bookDiv = toggle.closest(".book");
        const bookId = bookDiv.dataset.id;
        const book = library.find(book => book.id === bookId)
        const label = toggle.previousElementSibling;
        label.textContent = toggle.classList.contains("active") ? "Read" : "Unread";
        book.read = toggle.classList.contains("active") 
        console.log(book)
    }
});



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
    let html = ""
    library.forEach(book => {
        html += `
                <div class="book" data-id="${book.id}">
                    <h1>${book.title}</h1>
                    <div class="toggle-wrapper">
                        <div class="label">Unread</div>
                        <div class="toggle">
                            <div class="toggle-circle"></div>
                        </div>
                    </div>
                    <button class="del"></button>
                    <span>${book.author} ${book.pages} pages</span>
                </div>
            `;
    })
    books.innerHTML = html
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
        //alert("✅ Book added successfully")
    }
    else{
        //alert("❌ Error: Invalid input")
    }
})