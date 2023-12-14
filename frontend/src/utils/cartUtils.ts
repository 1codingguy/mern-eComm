import { CartState } from '../slices/cartSlice'

export const addDecimals = (num: number) =>
  Number((Math.round(num * 100) / 100).toFixed(2))

export const updateCart = (state: CartState) => {
  // calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item) => acc + item.price * item.qty,
      0
    )
  )

  // calculate shipping price ($10 shipping, free if order over $100)
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10)

  // calculate tax price (15%)
  state.taxPrice = addDecimals(0.15 * Number(state.itemsPrice))

  // calculate total price
  state.totalPrice = Number(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  )

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
