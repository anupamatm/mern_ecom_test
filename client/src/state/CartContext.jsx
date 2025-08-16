import { createContext, useContext, useReducer, useEffect } from "react";
const Ctx = createContext();
const init = () => JSON.parse(localStorage.getItem("cart") || "[]");

//reducer function to handle cart actions
const reducer = (state, action) => {
  switch(action.type){
    // action types: add, remove, qty, clear
    case "add": {
      const i = state.findIndex(x => x.product === action.item.product);
      if (i >= 0) { const next = [...state]; next[i].qty += action.item.qty; return next; }
      return [...state, action.item];
    }
    //remove an item from the cart
    case "remove": return state.filter(x => x.product !== action.id);
    //update the quantity of an item in the cart
    case "qty": return state.map(x => x.product === action.id ? { ...x, qty: action.qty } : x);
    //clear the cart
    case "clear": return [];
    //default case to return the current state
    default: return state;
  }
};
export const CartProvider = ({ children }) => {
  //useReducer to manage cart state
  const [cart, dispatch] = useReducer(reducer, [], init);
  //useEffect to persist cart state in localStorage
  useEffect(()=> localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  //provide cart state and dispatch function to children components
  return <Ctx.Provider value={{ cart, dispatch }}>{children}</Ctx.Provider>;
};

//
export const useCart = () => useContext(Ctx);
