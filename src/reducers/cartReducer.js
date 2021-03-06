import menu from "../MenuList";
export const address = "../assets/italian.jpg";

const initState = {
  items: menu,
  addedItems: [],
  total: 0,
  totalItems: 0,
};

const cartReducer = (state = initState, action) => {
  if (action.type === "ADD_TO_CART") {
    //Find item to add and if the item was added already
    let addedItem = findNestedId(state.items, action.id);
    let existedItem = state.addedItems.find((item) => action.id === item.id);

    state.totalItems += 1;

    if (existedItem) {
      console.log("Item id " + action.id + " already in cart, adding +1");
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      console.log("Item id " + action.id + " not in cart, adding");
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: state.addedItems.concat([addedItem]),
        total: newTotal,
      };
    }
  }
  if (action.type === "REMOVE_FROM_CART") {
    //Find item to add and if the item was added already
    let addedItem = findNestedId(state.items, action.id);
    let existedItem = state.addedItems.find((item) => action.id === item.id);

    if (existedItem) {
      console.log("Item id " + action.id + " already in cart, removing -1");
      state.totalItems -= 1;
      let newTotal = state.total - addedItem.price;
      //If there was only one item we remove it
      if (addedItem.quantity === 1) {
        for (var i = 0; i < state.addedItems.length; i++) {
          if (state.addedItems[i]["id"] === action.id)
            state.addedItems.splice(i, 1);
        }
      } else {
        //If there was more than one we substract an item
        addedItem.quantity -= 1;
      }
      return {
        ...state,
        total: newTotal,
      };
    } else {
      console.log("Item id " + action.id + " not in cart, not doing anything");
    }
  }
  if (action.type === "CLEAR_CART") {
    //Remove all items from cart
    return {
      ...state,
      addedItems: [],
      total: 0,
      totalItems: 0,
    };
    
  }

  return state;
};
//Per trobar un objecte al menu donat un id
const findNestedId = (menu, id_item) => {
  var result = null;
  if(menu instanceof Array) {
      for(var i = 0; i < menu.length; i++) {
          result = findNestedId(menu[i], id_item);
          if (result) {
              break;
          }   
      }
  }
  else
  {
      for(var prop in menu) {
          if(prop === "id") {
              if(menu[prop] === id_item) {
                  return menu;
              }
          }
          if(menu[prop] instanceof Object || menu[prop] instanceof Array) {
              result = findNestedId(menu[prop], id_item);
              if (result) {
                  break;
              }
          } 
      }
  }
  return result;
};
export default cartReducer;
