/*
	로컬스토리지에 todo 정보 남길것
*/

let count = 0;

function regist() {
	let inputElem = document.getElementById("todo-input");
	
	let todoDivElem = createToDo(inputElem.value);
	let todoListElem = document.getElementById("todo-list");
	todoListElem.prepend(todoDivElem);
	
	inputElem.value = "";
}

function createToDo(input) {
	todoDivElem = document.createElement("div");
	todoDivElem.setAttribute("class", "todo");
	
	checkboxElem = document.createElement("input");
	checkboxElem.setAttribute("type", "checkbox");
	checkboxElem.setAttribute("onclick", "check(this, 'text" + count + "')");
	spanElem = document.createElement("span");
	spanElem.setAttribute("class", "text");
	spanElem.setAttribute("id", "text" + count);
	count += 1;
	spanElem.innerText = input;
	
	todoDivElem.append(checkboxElem);
	todoDivElem.append(spanElem);
	
	return todoDivElem;
}

function check(elem, id) {
	if (elem.checked) {
		document.getElementById(id).setAttribute("style", "text-decoration: line-through; opacity: 0.3;");
	} else {
		document.getElementById(id).removeAttribute("style");
	}
}