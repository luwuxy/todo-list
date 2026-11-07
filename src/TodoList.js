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
}