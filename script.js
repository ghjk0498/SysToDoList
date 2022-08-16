let count = 0;
let todoList = [];
let currentFocusTodo = null;

window.onload = function() {
	todoList = JSON.parse(localStorage.getItem("todoList"));
	
	if (!todoList) {
		todoList = [];
		localStorage.setItem("todoList", JSON.stringify(todoList));
		count = todoList[0].id;
	}
	
	let todoListElem = document.getElementById("todo-list");
	for (let todo of todoList) {
		todoListElem.append(createTodo(todo.value, todo.id).elem)
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
			"value" : inputElem.value
		}
		todoList.unshift(todo);
		localStorage.setItem("todoList", JSON.stringify(todoList));
		
		inputElem.value = "";
		inputElem.focus();
	}
}

function createTodo(input, id) {
	todoDivElem = document.createElement("div");
	todoDivElem.setAttribute("class", "todo");
	
	checkboxElem = document.createElement("input");
	checkboxElem.setAttribute("type", "checkbox");
	checkboxElem.setAttribute("onclick", "check(this, 'text" + count + "')");
	textareaElem = document.createElement("textarea");
	textareaElem.setAttribute("readonly", true);
	textareaElem.setAttribute("class", "text");
	if (id) {
		textareaElem.setAttribute("id", id);
	} else {
		count += 1;
		textareaElem.setAttribute("id", "text" + count);
	}
	textareaElem.addEventListener("click", onTodoClick);
	textareaElem.value = input;
	
	todoDivElem.append(checkboxElem);
	todoDivElem.append(textareaElem);
	
	// [return value] : todoDivElement, textarea.id
	return {
		"elem" : todoDivElem,
		"id" : "text"+count
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
			todoList.push({
				"id" : elem.lastChild.id,
				"value" : elem.lastChild.value
			});
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
}