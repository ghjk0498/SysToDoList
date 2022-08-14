let count = 0;
let todoList = [];

window.onload = function() {
	todoList = JSON.parse(localStorage.getItem("todoList"));
	
	if (!todoList) {
		todoList = [];
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}
	
	let todoListElem = document.getElementById("todo-list");
	for (let todo of todoList) {
		todoListElem.append(createTodoElement(todo))
	}
}

function regist() {
	let inputElem = document.getElementById("todo-input");
	
	let todoDivElem = createToDo(inputElem.value);
	let todoListElem = document.getElementById("todo-list");
	todoListElem.prepend(todoDivElem);
	
	inputElem.value = "";
	inputElem.focus();
}

// window.onload에서 todo 목록을 초기화하는 과정에서 todoList에 추가하지 않고 element만 만들기 위해 분리함.
// createToDo(input) : todoList에 추가하고 element 생성
// createToDoElement(input) : element만 생성
function createToDo(input) {
	todoList.unshift(input);
	localStorage.setItem("todoList", JSON.stringify(todoList));
	return createTodoElement(input);
}
function createTodoElement(input) {
	todoDivElem = document.createElement("div");
	todoDivElem.setAttribute("class", "todo");
	
	checkboxElem = document.createElement("input");
	checkboxElem.setAttribute("type", "checkbox");
	checkboxElem.setAttribute("onclick", "check(this, 'text" + count + "')");
	textareaElem = document.createElement("textarea");
	textareaElem.setAttribute("readonly", true);
	textareaElem.setAttribute("class", "text");
	textareaElem.setAttribute("id", "text" + count);
	count += 1;
	textareaElem.value = input;
	
	todoDivElem.append(checkboxElem);
	todoDivElem.append(textareaElem);
	
	return todoDivElem;
}

function check(elem, id) {
	if (elem.checked) {
		document.getElementById(id).setAttribute("style", "text-decoration: line-through; opacity: 0.5;");
	} else {
		document.getElementById(id).removeAttribute("style");
	}
}

function deleteTodo() {
	let todoListElem = document.getElementById("todo-list");
	let removeList = [];
	for (let elem of todoListElem.childNodes) {
		if (elem.firstChild && elem.firstChild.checked) {
			removeList.push(elem);
		}
	}
	while (removeList.length != 0) {
		removeList.pop().remove();
	}
	
	todoList = [];
	for (let elem of todoListElem.childNodes) {
		if (elem.lastChild) {
			todoList.push(elem.lastChild.value);
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
}