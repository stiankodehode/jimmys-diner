import menuData from "./data/data.js";

const orderButton = document.querySelector(".orderButton");
const submitButton = document.querySelector(".submitButton");

submitButton.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".finishedOrderModal").style.display = "block";
    setTimeout(() => {
        orderedItems = [];
        renderOrder();
        document.querySelector(".orderDetails").style.display = "none";
        document.querySelector(".finishedOrderModal").style.display = "none";
    }, 3000);
});

orderButton.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "block";
});

const createNewNode = (element, cssClass, content) => {
    const newElement = document.createElement(element);
    newElement.classList.add(cssClass);
    newElement.textContent = content;
    return newElement;
};

let orderedItems = [];
let id = 0;

const renderMenu = () => {
    const menuList = createNewNode("ul", "menuList");
    menuData.forEach((menuItem) => {
        // Li for the item
        const li = createNewNode("li", "menuItem");
        // Containers for the menu item
        const itemContainer = createNewNode("div", "itemContainer");
        const descriptionContainer = createNewNode("div", "descriptionContainer");
        // Button to add the item to menu
        const addToMenuButton = createNewNode("button", "addToMenuButton", "+");
        addToMenuButton.addEventListener("click", () => {
            orderedItems.push({ ...menuItem, id: id });
            id++;
            if (orderedItems.length > 0) {
                document.querySelector(".orderDetails").style.display = "flex";
            }
            renderOrder();
        });
        // Item Name, Ingredients, Price and Icon
        const icon = createNewNode("span", "emojiIcon", menuItem.emoji);
        const item = createNewNode("h2", "itemHeading", menuItem.name);
        const ingredients = createNewNode(
            "p",
            "ingredients",
            menuItem.ingredients.join(", ")
        );
        const price = createNewNode("h3", "priceTag", menuItem.price + "$");

        // appending everything in the correct order
        descriptionContainer.appendChild(item);
        descriptionContainer.appendChild(ingredients);
        descriptionContainer.appendChild(price);
        itemContainer.appendChild(icon);
        itemContainer.appendChild(descriptionContainer);
        li.appendChild(itemContainer);
        li.appendChild(addToMenuButton);

        // Append the list item to the menu list
        menuList.appendChild(li);
    });
    // Append the entire menu list to the DOM
    document.querySelector(".menu").appendChild(menuList);
};

const renderOrder = () => {
    const totalPriceElement = document.querySelector("#finalPrice");
    const ul = document.querySelector(".orderedItems");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    let totalPrice = 0;
    const orderItems = orderedItems.map((item) => {
        totalPrice += item.price;
        const listItem = createNewNode("li", "orderItem");

        const nameAndButtonContainer = createNewNode("div", "nameAndButtonContainer");
        const itemName = createNewNode("h3", undefined, item.name);
        const removeButton = createNewNode("button", "removeButton", "(remove)");
        removeButton.addEventListener("click", () => {
            totalPrice -= item.price;
            ul.removeChild(listItem);
            orderedItems = orderedItems.filter((menuItem) => {
                return menuItem.id === item.id ? false : true;
            });

            totalPriceElement.textContent = totalPrice + "$";
        });
        const itemPrice = createNewNode("h3", undefined, item.price + "$");

        nameAndButtonContainer.appendChild(itemName);
        nameAndButtonContainer.appendChild(removeButton);

        listItem.appendChild(nameAndButtonContainer);
        listItem.appendChild(itemPrice);
        return listItem;
    });
    orderItems.forEach((item) => {
        ul.insertBefore(item, ul.firstChild);
    });
    totalPriceElement.textContent = totalPrice + "$";
};

renderMenu();
