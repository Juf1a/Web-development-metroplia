// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const ul = document.querySelector("ul");

function createTodoItem(item) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const button = document.createElement("button");

  const id = "todo-" + item.id;

  input.type = "checkbox";
  input.id = id;
  input.checked = item.completed;

  label.textContent = item.task;
  label.htmlFor = id;

  button.textContent = "Delete";

  input.addEventListener("change", function () {
    item.completed = input.checked;
    console.log(todoList);
  });

  button.addEventListener("click", function () {
    ul.removeChild(li);
    const index = todoList.indexOf(item);
    todoList.splice(index, 1);
    console.log(todoList);
  });

  li.append(input, label, button);
  return li;
}

todoList.forEach(function(item) {
  ul.appendChild(createTodoItem(item));
});

const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", function() {
  dialog.showModal();
})

const form = dialog.querySelector("form");
const textinput = dialog.querySelector("input");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const newItem = {
    id: Date.now(),
    task: textinput.value,
    completed: false,
  };

  ul.appendChild(createTodoItem(newItem));
  todoList.push(newItem);
  console.log(todoList)

  dialog.close();
})