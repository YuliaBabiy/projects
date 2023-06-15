const todoList = [];

const dateInput = document.querySelector('#date-input');
const date = new Date();
let month = date.getUTCMonth() + 1; // months from 1-12
const day = date.getUTCDate();
const year = date.getUTCFullYear();

if (month < 10) {
  month = '0' + month;
}

dateInput.setAttribute('min', `${year}-${month}-${day}`);
dateInput.value = `${year}-${month}-${day}`;

function renderTodoList() {
  const listEl = document.querySelector('.js-todo-list');
  listEl.innerHTML = '';

  todoList.forEach((todoObj, index) => {
    const { name, dueDate } = todoObj;

    const nameEl = document.createElement('div');
    nameEl.innerHTML = name;
    nameEl.classList.add('padding');

    const dateEl = document.createElement('div');
    dateEl.innerHTML = dueDate;
    dateEl.classList.add('padding');

    const delBtnEl = document.createElement('button');
    delBtnEl.textContent = 'Delete';
    delBtnEl.classList.add('delete-btn');
    delBtnEl.onclick = function () {
      todoList.splice(index, 1);
      renderTodoList();
    }

    listEl.append(nameEl, dateEl, delBtnEl);
  });
}

document.querySelector('.js-add-todo-btn')
  .addEventListener('click', () => {
    addTodo()
  });

function addTodo() {
  const todoNameEl = document.querySelector('.todo-name');
  const dataInputEl = document.querySelector('.due-date-input');
  const name = todoNameEl.value;
  const dueDate = dataInputEl.value;

  todoList.push({ name, dueDate });

  todoNameEl.value = '';

  renderTodoList();
}

