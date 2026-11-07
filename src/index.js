import "./styles.css";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";

const newListBtn = document.querySelector('.new-list');
const listsTab = document.querySelector('.lists');
const list = new TodoList();

function createTodo(title, description, dueDate, priority, notes, checkList) {
  list.newTodo = new TodoItem(
    title,
    description,
    dueDate,
    priority,
    notes,
    checkList
  );
}

newListBtn.addEventListener('click', () => {
  const newList = document.createElement('button');
  newList.classList.add("list");
  newList.textContent = "List";

  listsTab.appendChild(newList);
})

console.log(list.todo);