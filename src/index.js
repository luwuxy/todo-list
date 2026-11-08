import "./styles.css";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";

const newListBtn = document.querySelector('.new-list');
const listsTab = document.querySelector('.lists');
const listModalForm = document.querySelector('.list-modal');
const modal = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const lists = document.querySelector('.lists');
const listName = document.getElementById('list-name');
const list = new TodoList();
const category = [];

function createTodo(title, description, dueDate, priority, notes, category) {
  list.newTodo = new TodoItem(
    title,
    description,
    dueDate,
    priority,
    notes,
    category
  );
}

listModalForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!listName.value) return;

  const data = new FormData(e.target);
  category.push(data.get("list-name"));

  lists.textContent = "";

  for (const item of category) {
    const newList = document.createElement('button');
    newList.textContent = item;
    newList.classList.add('list');

    listName.value = "";
    lists.appendChild(newList);
  }

  modal.classList.remove('active');
})

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
})

newListBtn.addEventListener('click', () => {
  modal.classList.add('active');
})