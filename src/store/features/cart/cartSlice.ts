import { createSlice } from '@reduxjs/toolkit'
import { CartProduct } from '@/interfaces';

interface cartSlice {
  cart: CartProduct[];
  totalItemsCart: number,
  summary: {
    subsTotal: number | null, 
    tax: number | null,
    total:number | null
  }
}

const storedCart = localStorage.getItem('shopping-cart');
const cartFromLocalStorage = storedCart ? JSON.parse(storedCart) : [];

const initialState: cartSlice = {
  cart: cartFromLocalStorage,
  totalItemsCart: 0,
  summary:{
    subsTotal: null, 
    tax: null,
    total: null
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    getTotalItems: (state) => {

      //* 1. Tomo los elementos del localstorage
      const cartItemsLocalstorage = localStorage.getItem('shopping-cart');
      const cartItems = cartItemsLocalstorage ? JSON.parse(cartItemsLocalstorage) : [];

      //* 2. Cuento la cantidad de cada elemento
      const totalItemsNumber = cartItems.reduce((total:number, item:CartProduct) => total + item.quantity, 0);
      state.totalItemsCart = totalItemsNumber;
    },

    addProductToCart: (state, { payload }) => {
 
      //* 1. Tomo los elementos del localstorage y si no tiene nada o no existe los tomo del estado global
      const cartItemsLocalstorage = localStorage.getItem('shopping-cart');
      const cartItems = cartItemsLocalstorage ? JSON.parse(cartItemsLocalstorage) : state.cart;

      //* 2. Revisar si el producto existe con la talla seleccionada
      const productInCard = cartItems.find( (element:CartProduct) => element.id === payload.id && element.sizes === payload.sizes) 

      if(!productInCard) {
        state.cart = [...state.cart, payload];
        localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
        return
      }

      //* 3. Se que el producto existe por talla... tengo que incrementarlo
      const updateCartProducts = state.cart.map( item => {
        if(item.id === payload.id && item.sizes === payload.sizes) return {...item, quantity: item.quantity + payload.quantity}
        return item
      })

      //* 4.Actualizar el carrito de compras
      state.cart = updateCartProducts
      localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
    },

    updateProductQuantity: (state, { payload }) => {

      //* 1. Tomo los elementos del localstorage y si no tiene nada o no existe los tomo del estado global
      const cartItemsLocalstorage = localStorage.getItem('shopping-cart');
      const cartItems = cartItemsLocalstorage ? JSON.parse(cartItemsLocalstorage) : state.cart;

      //* 2. Revisar si el producto existe con la talla seleccionada y el id
      const productInCard = cartItems.map( (element:CartProduct) => {
        if(element.id === payload.product.id && element.sizes === payload.product.sizes ){
          return {...element, quantity: payload.quantity}
        }
        return element;
      }) 
      
      //* 3.Actualizar el carrito de compras
      state.cart = productInCard
      localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
    },

    removeProduct:(state, { payload }) => {

      //* 1. Tomo los elementos del localstorage y si no tiene nada o no existe los tomo del estado global
      const cartItemsLocalstorage = localStorage.getItem('shopping-cart');
      const cartItems = cartItemsLocalstorage ? JSON.parse(cartItemsLocalstorage) : state.cart;

      //* 2. Revisar si el producto existe con la talla seleccionada y el id
      const productRemove = cartItems.filter( (element:CartProduct) => !(element.id === payload.product.id && element.sizes === payload.product.sizes)) 

      console.log("holi: ", productRemove)

      //* 3.Actualizar el carrito de compras
      state.cart = productRemove
      localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
    },

    getSummaryInformation: (state):any => {

      //* 1. Tomo los elementos del localstorage y si no tiene nada o no existe los tomo del estado global
      const cartItemsLocalstorage = localStorage.getItem('shopping-cart');
      const cartItems = cartItemsLocalstorage ? JSON.parse(cartItemsLocalstorage) : state.cart;

      //*2. Lógica
      const subsTotal = cartItems.reduce( (subTotal:number, product:CartProduct) => (product.quantity * product.price) + subTotal , 0)
      const tax = subsTotal * 0.15;
      const total = subsTotal + tax

      //*3 Actualizar el estado
      state.summary.subsTotal = subsTotal;
      state.summary.tax = tax;
      state.summary.total = total;

    }
  },
})

export const { getTotalItems, addProductToCart, updateProductQuantity, removeProduct, getSummaryInformation } = cartSlice.actions

export default cartSlice.reducer