let myLibrary = [];

const storage = (() => {
  const save = (list) => localStorage.setItem('data', JSON.stringify(list));
  const get = () => localStorage.getItem('data');

  let books = [];
  if (get()) {
    books = JSON.parse(get());
  }

  return {
    getAll: () => [...books],
    saveBook: (book) => {
      books.push(book);
      save(books);
    },
    deleteBook: (index) => {
      books.splice(index, 1);
      save(books);
    },
    changeStatus: (index) => {
      const book = books[index];
      book.status = book.status === 'read' ? 'unread' : 'read';
      save(books);
    },
  };
})();

const addBookCard = (book, idx) => {
  const bookDemo = document.getElementById('bookDemo');
  const div = document.createElement('div');
  const card = `
  <div class="card">
    <div class="card-header"> ${book.title}</div>
    <div class="card-body">
      <h5 class="card-title"> <span class="book-label">Author:</span> ${book.author}</h5>

      <p class="card-text"> <span class="book-label">pages:</span> ${book.pages}</p>

      <p class="card-text"> <span class="book-label">status:</span> ${book.status} </p>
      <a href="#" onclick="changeStatus(${idx})" class="btn btn-primary">toggle status</a>
      <a href="#" onclick="deleteBook(${idx})" class="btn btn-primary">delete</a>
    </div>
  </div>
  `;

  div.innerHTML = card;
  bookDemo.append(div);
};

const reload = () => {
  document.querySelector('#bookDemo').innerHTML = '';
  myLibrary = storage.getAll();
  myLibrary.forEach((book, idx) => {
    addBookCard(book, idx);
  });
};

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(book) {
  storage.saveBook(book);
}

const newBookForm = document.getElementById('show-form');
const addbtn = document.getElementById('add');

addbtn.onclick = () => {
  newBookForm.style.display = 'block';
  newBookForm.classList.add('overlay');
};

const formData = (() => {
  const form = document.getElementById('show-form');
  return {
    createbook: () => {
      const title = form.querySelector('#title').value;
      const author = form.querySelector('#author').value;
      const pages = form.querySelector('#pages').value;
      const status = form.querySelector('#status').value;
      return new Book(title, author, pages, status);
    },
    close: () => {
      form.querySelector('#title').value = '';
      form.querySelector('#author').value = '';
      form.querySelector('#pages').value = '';
      form.querySelector('#status').value = '';
      form.style.display = 'none';
    },
  };
})();

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = formData.createbook();
  addBookToLibrary(book);
  addBookCard(book);
  formData.close();
  reload();
  return false;
});

// eslint-disable-next-line no-unused-vars
const deleteBook = (index) => {
  storage.deleteBook(index);
  reload();
};

// eslint-disable-next-line no-unused-vars
const changeStatus = (index) => {
  storage.changeStatus(index);
  reload();
};

reload();
