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
const ul = document.querySelector("ul")

todoList.forEach(function(item){
  const li = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.textContent = item.task;
  label.htmlFor = "todo-" + item.id;
  input.type = "checkbox";
  input.checked = item.completed;
  input.id = "todo-" + item.id;
  li.appendChild(input);
  li.appendChild(label);

  ul.appendChild(li);
})