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
const listTitle = document.querySelector('.list-title');
const newTaskInput = document.getElementById('new-task');
const newTaskBtn = document.querySelector('.new-task-plus');
const tasks = document.querySelector('.tasks');
const taskSidebar = document.querySelector('.task-sidebar');
const list = new TodoList();
const category = ["General", "School"];

// task inputs
const titleInput = document.querySelector('.sidebar-task-name')
const descriptionInput = document.getElementById('description');
const notesInput = document.getElementById('notes');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const categoryInput = document.getElementById('category');

function createTodo(title, description, dueDate, priority, notes, category) {
  return list.newTodo = new TodoItem(
    title,
    description,
    dueDate,
    priority,
    notes,
    category
  );
}

// test data
createTodo("meow", "meow description", "2026-12-02", "High", "meow notes", "School");
createTodo("bark", "bark description");
createTodo("bark2", "bark2 description");
createTodo("bark3", "bark3 description");
createTodo("meow2", "meow2 description", "2026-12-11", "Medium", "meow2 notes", "School");

for (const item of category) {
  const newList = document.createElement('button');
  newList.textContent = item;
  newList.classList.add('list');

  newList.addEventListener('click', e => {
    listTitle.textContent = e.target.textContent;

    tasks.innerHTML = "";

    for (const todo of list.todo) {
      if (e.target.textContent !== todo.category) continue;

      const newTask = document.createElement('div');
      newTask.classList.add('task');
      newTask.dataset.taskId = todo.id;
      newTask.innerHTML = `
        <input type="checkbox" name="check-task" id="check-task">
        <label for="check-task" class="task-name">${todo.title}</label>
        <p class="task-date">${todo.dueDate || "No date"}</p>
        <p class="task-category">${todo.category}</p>
      `

      newTask.addEventListener('click', () => {
        taskSidebar.classList.toggle('active');
        taskSidebar.dataset.taskId = todo.id;
        
        titleInput.textContent = todo.title;
        descriptionInput.value = todo.description || "";
        notesInput.value = todo.notes || "";
        dueDateInput.value = todo.dueDate;
        priorityInput.value = todo.priority || "Low";
        
        categoryInput.innerHTML = `
          ${
            category.map((item) => {
              return `
                <option value="${item}">${item}</option>
              `
            })
          }
        `
        categoryInput.value = todo.category;
      })

      tasks.appendChild(newTask);
    }
  })

  listName.value = "";
  lists.appendChild(newList);
}

for (const todo of list.todo) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.dataset.taskId = todo.id;
  newTask.innerHTML = `
    <input type="checkbox" name="check-task" id="check-task">
    <label for="check-task" class="task-name">${todo.title}</label>
    <p class="task-date">${todo.dueDate || "No date"}</p>
    <p class="task-category">${todo.category}</p>
  `

  newTask.addEventListener('click', () => {
    taskSidebar.classList.toggle('active');
    taskSidebar.dataset.taskId = todo.id;
    
    titleInput.textContent = todo.title;
    descriptionInput.value = todo.description || "";
    notesInput.value = todo.notes || "";
    dueDateInput.value = todo.dueDate;
    priorityInput.value = todo.priority || "Low";
    
    categoryInput.innerHTML = `
      ${
        category.map((item) => {
          return `
            <option value="${item}">${item}</option>
          `
        })
      }
    `
    categoryInput.value = todo.category;
  })

  tasks.appendChild(newTask);
}

taskSidebar.addEventListener('submit', e => {
  e.preventDefault(); 

  const data = new FormData(e.target);

  const newTitle = titleInput.textContent;
  const {
    description: newDescription,
    notes: newNotes,
    "due-date": newDueDate,
    priority: newPriority,
    category: newCategory
  } = Object.fromEntries(data.entries());

  for (const item of list.todo) {
    if (e.target.dataset.taskId !== item.id) continue;

    list.changeDetails(item.id, newTitle, newDescription, newNotes, newDueDate, newPriority, newCategory);
  }

  taskSidebar.classList.remove('active');
})

newTaskBtn.addEventListener('click', () => {
  if (!newTaskInput.value) return;

  const newTodo = createTodo(newTaskInput.value);

  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.dataset.taskId = newTodo.id;
  newTask.innerHTML = `
    <input type="checkbox" name="check-task" id="check-task">
      <label for="check-task" class="task-name">${newTodo.title}</label>
      <p class="task-date">${newTodo.dueDate || "No date"}</p>
    <p class="task-category">${newTodo.category}</p>
  `
  newTaskInput.value = "";

  newTask.addEventListener('click', () => {
    taskSidebar.classList.toggle('active');
    taskSidebar.dataset.taskId = newTodo.id;
    
    titleInput.textContent = newTodo.title;
    descriptionInput.value = newTodo.description || "";
    notesInput.value = newTodo.notes || "";
    dueDateInput.value = newTodo.dueDate;
    priorityInput.value = newTodo.priority || "Low";
    
    categoryInput.innerHTML = `
      ${
        category.map((item) => {
          return `
            <option value="${item}">${item}</option>
          `
        })
      }
    `
    categoryInput.value = newTodo.category;
  })

  tasks.appendChild(newTask);
})

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

  console.log(category);
})

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
})

newListBtn.addEventListener('click', () => {
  modal.classList.add('active');
})