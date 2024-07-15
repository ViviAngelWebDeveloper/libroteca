const apiUrl = 'http://localhost:3001';

// Agregar libro
const bookForm = document.getElementById('book-form');
if (bookForm) {
    bookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newBook = {
            title: document.getElementById('book-title').value,
            author: document.getElementById('book-author').value,
            year: document.getElementById('book-year').value,
            genre: document.getElementById('book-genre').value,
            cover: document.getElementById('book-cover').value
        };

        fetch(`${apiUrl}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Libro agregado:', data);
            bookForm.reset();
            fetchBooks();
        })
        .catch(error => console.error('Error:', error));
    });
}

// Obtener libros
function fetchBooks() {
    console.log('Fetching books...');
    fetch(`${apiUrl}/books`)
        .then(response => response.json())
        .then(data => {
            console.log('Books fetched:', data);
            const bookList = document.getElementById('book-list');
            if (!bookList) return;
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${book.title}</strong> - ${book.author} (${book.year})<br>
                    Género: ${book.genre}<br>
                    <img src="${book.cover}" alt="Portada" style="width:150px;height:auto;"><br>
                    <button onclick="openEditBookModal(${book.id})">Editar</button>
                    <button onclick="deleteBook(${book.id})">Eliminar</button>
                `;
                bookList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Eliminar libro
function deleteBook(bookId) {
    fetch(`${apiUrl}/books/${bookId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Libro eliminado:', data);
        fetchBooks();
    })
    .catch(error => console.error('Error:', error));
}

// Abrir modal para editar libro
function openEditBookModal(bookId) {
    fetch(`${apiUrl}/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById('edit-book-id').value = book[0].id;
            document.getElementById('edit-book-title').value = book[0].title;
            document.getElementById('edit-book-author').value = book[0].author;
            document.getElementById('edit-book-year').value = book[0].year;
            document.getElementById('edit-book-genre').value = book[0].genre;
            document.getElementById('edit-book-cover').value = book[0].cover;
            document.getElementById('editBookModal').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

// Cerrar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Editar libro
const editBookForm = document.getElementById('edit-book-form');
if (editBookForm) {
    editBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const bookId = document.getElementById('edit-book-id').value;
        const updatedBook = {
            title: document.getElementById('edit-book-title').value,
            author: document.getElementById('edit-book-author').value,
            year: document.getElementById('edit-book-year').value,
            genre: document.getElementById('edit-book-genre').value,
            cover: document.getElementById('edit-book-cover').value
        };

        fetch(`${apiUrl}/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Libro actualizado:', data);
            closeModal('editBookModal');
            fetchBooks();
        })
        .catch(error => console.error('Error:', error));
    });
}

// Agregar usuario
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUser = {
            username: document.getElementById('username').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            birthday: document.getElementById('birthday').value,
            password: document.getElementById('password').value
        };

        fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario registrado:', data);
            registerForm.reset();
            fetchUsers();
        })
        .catch(error => console.error('Error:', error));
    });
}

// Obtener usuarios
function fetchUsers() {
    console.log('Fetching users...');
    fetch(`${apiUrl}/users`)
        .then(response => response.json())
        .then(data => {
            console.log('Users fetched:', data);
            const userList = document.getElementById('user-list');
            if (!userList) return;
            userList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${user.username} ${user.lastname}</strong><br>
                    Email: ${user.email}<br>
                    Fecha de Nacimiento: ${user.birthday}<br>
                    <button onclick="openEditUserModal(${user.id})">Editar</button>
                    <button onclick="deleteUser(${user.id})">Eliminar</button>
                `;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Eliminar usuario
function deleteUser(userId) {
    fetch(`${apiUrl}/users/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario eliminado:', data);
        fetchUsers();
    })
    .catch(error => console.error('Error:', error));
}

// Abrir modal para editar usuario
function openEditUserModal(userId) {
    fetch(`${apiUrl}/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('edit-user-id').value = user[0].id;
            document.getElementById('edit-username').value = user[0].username;
            document.getElementById('edit-lastname').value = user[0].lastname;
            document.getElementById('edit-email').value = user[0].email;
            document.getElementById('edit-birthday').value = user[0].birthday;
            document.getElementById('edit-password').value = user[0].password;
            document.getElementById('editUserModal').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

// Editar usuario
const editUserForm = document.getElementById('edit-user-form');
if (editUserForm) {
    editUserForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userId = document.getElementById('edit-user-id').value;
        const updatedUser = {
            username: document.getElementById('edit-username').value,
            lastname: document.getElementById('edit-lastname').value,
            email: document.getElementById('edit-email').value,
            birthday: document.getElementById('edit-birthday').value,
            password: document.getElementById('edit-password').value
        };

        fetch(`${apiUrl}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario actualizado:', data);
            closeModal('editUserModal');
            fetchUsers();
        })
        .catch(error => console.error('Error:', error));
    });
}

// Inicializar la lista de libros y usuarios
if (document.getElementById('book-list')) {
    fetchBooks();
}

if (document.getElementById('user-list')) {
    fetchUsers();
}