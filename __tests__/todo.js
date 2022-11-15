/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const date = new Date().toLocaleDateString("en-CA");
describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new Todo List", () => {
    // expect(all.length).toBe(0);
    const todoItemsCount = all.length;
    add({
      title: "Add Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a Todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    const overdueItems = overdue();
    expect(
      overdueItems.every((todo) => {
        return todo.dueDate < date;
      })
    ).toBe(true);
  });

  test("Retrieval of due today items", () => {
    const dueItemsToday = dueToday();
    expect(
      dueItemsToday.every((todo) => {
        return todo.dueDate === date;
      })
    ).toBe(true);
  });

  test("Retrieval of due later items", () => {
    const dueItemsLater = dueLater();
    expect(
      dueItemsLater.every((todo) => {
        return todo.dueDate > date;
      })
    ).toBe(true);
  });
});
