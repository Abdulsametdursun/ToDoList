// Tum Elementleri Secmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        //
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  } else {
    showAlert("warning", "Filtreleme yapmak icin en az bir todo olmalidir!");
  }
}

function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    //Ekrandan silme
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    //Storage'dan silme
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Basarili bir sekilde silindi");
  } else {
    showAlert("warning", "Silmek icin en az bir todo olmalidir");
  }
  console.log(todoListesi);
}

function removeTodoToUI(e) {
  if (e.target.className === "fa fa-remove") {
    //Ekrandan Silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    //Storage'dan Silme
    removeTodoToStorage(todo.textContent);
    showAlert("success", "Todo basari ile silindi.");
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos = todos.filter((todo) => todo !== removeTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen boş birakmayiniz!");
  } else {
    //Arayüze ekleme
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi");
  }
  //Storage ekleme
  //console.log("Submit eventi calisti");
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  //div.className = "alert alert-" + type;
  div.className = `alert alert-${type}`;
  div.textContent = message;

  firstCardBody.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 2500);
}
