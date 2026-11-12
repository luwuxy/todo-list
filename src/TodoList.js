export class TodoList {
  #todo;

  constructor() {
    if (localStorage.getItem("todo") === null) {
      this.#todo = [];
    } else {
      this.#todo = JSON.parse(localStorage.getItem("todo"));
    }

    // this.#todo = [];
  }

  saveTodo() {
    localStorage.setItem("todo", JSON.stringify(this.#todo));
  }

  set newTodo(item) {
    this.#todo.push(item);
    this.saveTodo();
  }

  get todo() {
    return this.#todo;
  }

  changeDetails(id, title, description, notes, dueDate, priority, category) {
    for (const todo of this.#todo) {
      if (id !== todo.id) continue;

      todo.title = title;
      todo.description = description;
      todo.dueDate = dueDate;
      todo.priority = priority;
      todo.notes = notes;
      todo.category = category;
    }

    this.saveTodo();
  }
}