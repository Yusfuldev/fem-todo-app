/*=====>>   Selectors    <<=====*/
const todoInput = document.querySelector(".todo-input");
const dark = document.querySelector("#moon");
const light = document.querySelector("#sun");
const count = document.querySelector("#count b");
const clearComplete = document.querySelector("#clear-completed");
const todoList = document.querySelector(".todo-list");
const filters = document.querySelectorAll(".filter label");
const filter = document.querySelector(".filter");
const counter = document.querySelector(".counter");
const todoBtn = document.querySelector("form button");
const main = document.querySelector("main");
const inputWrapper = document.querySelector(".input-wrapper");

// Event listeners
todoBtn.addEventListener("click", addTodo);

// Functions
function addTodo(e) {
  e.preventDefault();
  e.stopPropagation();
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("li-container");
  todoList.appendChild(todoContainer);

  const todoItem = document.createElement("li");
  todoItem.classList.add("todo");
  todoItem.innerText = todoInput.value;
  todoContainer.appendChild(todoItem);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = '<img src="./images/icon-cross.svg" alt="" />';
  todoContainer.appendChild(deleteButton);

  const completedButton = document.createElement("button");
  completedButton.classList.add("todo-check");
  completedButton.innerHTML = '<img src="./images/icon-check.svg" alt="" />';
  todoContainer.appendChild(completedButton);

  saveTodos(todoInput.value);

  todoInput.value = "";

  countTodo(e);
}
/*=====>>   Mark todo as completed or delete todo   <<=====*/
todoList.addEventListener("click", (e) => {
  let item = e.target;
  let checkBtn = item.children[2];
  /*=====>> when the todo is clicked    <<=======*/
  if (e.target.classList.contains("li-container")) {
    item.children[0].classList.toggle("done");

    if (item.children[0].classList.contains("done")) {
      checkBtn.children[0].style.display = "block";
      item.children[2].classList.add("bg");
    } else
      item.children[2].classList.remove("bg"),
        (checkBtn.children[0].style.display = "none");
  } else if (item.classList.contains("todo-check")) {
    /*=====>>    when the 'completed' button is clicked    <<=======*/
    let item = e.target;
    let itemP = item.parentElement;
    itemP.children[0].classList.toggle("done");

    let checkBtn = item.children[0];
    if (itemP.children[0].classList.contains("done")) {
      checkBtn.style.display = "block";
      e.target.classList.add("bg");
    } else {
      checkBtn.style.display = "none";
      e.target.classList.remove("bg");
    }
  }

  deleteTodo(e);

  countTodo(e);
});
/*=====>>    Delete todo   <<=====*/
function deleteTodo(e) {
  if (e.target.classList.contains("delete-btn")) {
    let todo = e.target.parentElement;
    todo.classList.add("remove");
    deleteLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      e.target.remove();
      countTodo(e);
    });
  }
}
/*=====>>   Count the number of items left   <<=====*/
function countTodo(e) {
  let todos = [];
  let todo = todoList.children;
  for (let i = 0; i < todo.length; i++) {
    if (!todo[i].childNodes[0].classList.contains("done")) todos.push(todo[i]);
  }
  count.innerText = todos.length;
}

/*=====>>    Clear completed    <<=====*/
clearComplete.addEventListener("click", () => {
  let todos = todoList.children;
  confirm(`Are you sure you want to remove these item(s)?`);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].children[0].classList.contains("done")) {
      let item = todos[i].children[0];
      let todo = item.parentElement;
      item.parentElement.classList.add("cleared");
      item.parentElement.style.display = "none";

      deleteLocalTodos(todo);
    }
  }
});
/*=====>>    Filter Todos   <<=====*/
filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    let containers = todoList.children;
    switch (filter.textContent) {
      case "All":
        for (const container of containers) {
          let todo = container.children[0];
          if (!todo.parentElement.classList.contains("cleared")) {
            todo.parentElement.style.display = "flex";
          } else todo.parentElement.style.display = "none";
        }
        break;
      case "Active":
        for (const container of containers) {
          let todo = container.children[0];
          if (!todo.classList.contains("done")) {
            todo.parentElement.style.display = "flex";
          } else todo.parentElement.style.display = "none";
        }
        break;
      case "Completed":
        for (const container of containers) {
          let todo = container.children[0];
          if (
            todo.classList.contains("done") &&
            !todo.parentElement.classList.contains("cleared")
          ) {
            todo.parentElement.style.display = "flex";
            console.log(todo.parentElement);
          } else todo.parentElement.style.display = "none";
        }
        break;
    }
  });
});
/*=====>>    light mode   <<=====*/
light.addEventListener("click", () => {
  dark.style.display = "block";
  light.style.display = "none";
  main.style.backgroundColor = "#e4e5f1";
  todoList.classList.add("todo-list-light");
  filter.classList.add("counter-light");
  counter.classList.add("counter-light");
  todoInput.classList.add("counter-light");
  inputWrapper.classList.add("bg-light");
});

/*=====>>   Dark mode    <<=====*/
dark.addEventListener("click", () => {
  dark.style.display = "none";
  light.style.display = "block";
  todoList.classList.remove("todo-list-light");
  main.style.backgroundColor = "#161722";
  filter.classList.remove("counter-light");
  counter.classList.remove("counter-light");
  todoInput.classList.remove("counter-light");
  inputWrapper.classList.remove("bg-light");
});

/*=====>>  Save to local storage    <<=====*/
function saveTodos(todo) {
  let todoItems;
  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }
  todoItems.push(todo);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
/*=====>>   Display local storage todos on page load   <<=====*/
document.addEventListener("DOMContentLoaded", (item) => {
  let todoItems;
  if (localStorage.getItem("todoItems") === null) todoItems = [];
  else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }
  todoItems.forEach((item) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("li-container");
    todoList.appendChild(todoContainer);

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");
    todoItem.innerText = item;
    todoContainer.appendChild(todoItem);

    const completedButton = document.createElement("button");
    completedButton.classList.add("todo-check");
    todoContainer.appendChild(completedButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<img src="./images/icon-cross.svg" alt="" />';
    todoContainer.appendChild(deleteButton);
  });
});

/*=====>> Delete local storage todos  <<=====*/
function deleteLocalTodos(todo) {
  let todoItems;

  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }

  let item = todo.children[0].innerText;
  todoItems.splice(todoItems.indexOf(item), 1);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}
