(function(){
const show = document.getElementById('show-form');
const addbtn = document.getElementById('add');
addbtn.onclick = () => {
    show.style.display = 'block';
    show.classList.add('overlay');
}
})();

(function(){
    'use strict'
    function Book(title,author,pages,status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    const storage = () => {
        const book = [];
        return {
            setdata: () =>{
                const data = localStorage.setItem('data');
                if(data == null){
                    localStorage.setItem('data');
                }
            },
            getdata: () => localStorage.getItem('data'),
            deletebook: (index) => {
                const data = JSON.parse(get());
                data = data.splice(index,1)
                localStorage.setItem('data', data);
            },
            changeStatus: (index) => {
                const list = JSON.parse(getdata())
                const status = document.getElementById('read');
                if(list[index] == 'read'){
                    list[index] == 'unread';
                }else{
                    list[index] == 'read';
                }
                localStorage.setItem('data',JSON.stringify(list));
            }
        }
    }

    const formData = (() => {
        const form = document.getElementById('show-form');
        return {
            createbook: () => {
                const title = form.querySelector('#title');
                const author = form.querySelector('#author');
                const pages = form.querySelector('#pages');
                const status = form.querySelector('#status');
                return new Book(title,author,pages,status);
            },
            clearFields: () => {
                form.querySelector('#title').value = '';
                form.querySelector('#author').value = '';
                form.querySelector('#pages').value = '';
                form.querySelector('#status').value = '';
            }
        }
    })();

    const addBookCard = (book) => {
        const bookDemo = document.getElementById('bookDemo');
        const div = document.createElement('div');
        const card = `
        <div class="card">
        <div class="card-header">
          ${book.title}
        </div>
        <div class="card-body">
          <h5 class="card-title"> <span class="book-label">Author:</span> ${book.author}</h5>
  
          <p class="card-text"> <span class="book-label">pages:</span> ${book.pages}</p>
  
          <p class="card-text"> <span class="book-label">status:</span> ${book.status} </p>
          <a href="#" class="btn btn-primary">toggle status</a>
          <a href="#" class="btn btn-primary">delete</a>
        </div>
      </div>
        `
    }
})();