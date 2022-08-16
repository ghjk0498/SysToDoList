let count = 0;
let todoList = [];
let currentFocusTodo = null;

window.onload = function() {
	todoList = JSON.parse(localStorage.getItem("todoList"));

	let todoListElem = document.getElementById("todo-list");
	for (let todo of todoList) {
		todoListElem.append(createTodo(todo.value, todo.id, todo.checked).elem)
	}
	if (todoList.length != 0) {
		count = Number(todoList[0].id.split("-")[1]);
	}
}

function regist() {
	let inputElem = document.getElementById("todo-input");
	
	if (currentFocusTodo) {
		document.getElementById(currentFocusTodo).value = inputElem.value;
		
		for (let todo of todoList) {
			if (todo.id === currentFocusTodo) {
				todo.value = inputElem.value;
			}
		}
		localStorage.setItem("todoList", JSON.stringify(todoList));
	} else {
		let todoElemAndId = createTodo(inputElem.value);
		let todoDivElem = todoElemAndId.elem;
		let todoListElem = document.getElementById("todo-list");
		todoListElem.prepend(todoDivElem);
		
		let todo = {
			"id" : todoElemAndId.id,
			"value" : inputElem.value,
			"checked" : false,
		}
		todoList.unshift(todo);
		localStorage.setItem("todoList", JSON.stringify(todoList));
		
		inputElem.value = "";
		inputElem.focus();
	}
}

function createTodo(input, id, checked=false) {
	todoDivElem = document.createElement("div");
	todoDivElem.setAttribute("class", "todo");
	
	checkboxElem = document.createElement("input");
	checkboxElem.setAttribute("type", "checkbox");
	checkboxElem.checked = checked;
	
	textareaElem = document.createElement("textarea");
	textareaElem.setAttribute("readonly", true);
	textareaElem.setAttribute("class", "text");
	
	let textareaId;
	if (id) {
		textareaId = id;
	} else {
		count += 1;
		textareaId = "text-" + count;
	}
	textareaElem.setAttribute("id", textareaId);
	checkboxElem.setAttribute("onclick", "check(this, '" + textareaId + "')");
	
	textareaElem.addEventListener("click", onTodoClick);
	textareaElem.value = input;
	
	todoDivElem.append(checkboxElem);
	todoDivElem.append(textareaElem);
	
	// [return value] : todoDivElement, textarea.id
	return {
		"elem" : todoDivElem,
		"id" : textareaId,
	};
}

function onTodoClick(e) {
	let inputElem = document.getElementById("todo-input");
	
	if (currentFocusTodo === e.target.id) {
		currentFocusTodo = null;
		e.target.style.border = "1px solid black";
		inputElem.value = "";
	} else {
		if (currentFocusTodo) {
			document.getElementById(currentFocusTodo).style.border = "1px solid black";
		}
		currentFocusTodo = e.target.id;
		e.target.style.border = "2px solid black";
		inputElem.value = e.target.value;
	}
}

function check(elem, id) {
	for (let todo of todoList) {
		if (id === todo.id) {
			if (elem.checked) {
				todo.checked = true;
			} else {
				todo.checked = false;
			}
			break;
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
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
			todoList.push({
				"id" : elem.lastChild.id,
				"value" : elem.lastChild.value,
				"checked" : elem.firstChild.checked,
			});
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
}