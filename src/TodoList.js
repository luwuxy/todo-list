export class TodoList {
  #todo;

  constructor() {
    this.#todo = [];
  }

  set newTodo(item) {
    this.#todo.push(item);
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
  }
}