import * as storage from "./storage.js";

let items = [];

// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  const listElement = document.querySelector(".ml-4");
  listElement.innerHTML = "";

  items.forEach(item =>
  {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = (str) => {
  if (str.length > 0)
  {
    items.push(str);
    storage.writeToLocalStorage("items", items);
  }
  showItems();
};

const clearItems = () => {
  items = [];
  storage.writeToLocalStorage("items", items);
  showItems();
};

window.onload = () => {
  const savedItems = storage.readFromLocalStorage("items");
  if (Array.isArray(savedItems))
  {
    items = savedItems;
  }
  else
  {
    items = [];
  }
  showItems();
};

document.querySelector("#btn-add").addEventListener("click", () => {
  const input = document.querySelector(".input");
  addItem(input.value);
  input.value = ""; 
});

document.querySelector("#btn-clr").addEventListener("click", clearItems);
