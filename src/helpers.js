export const alreadyInCart = (cart, id) => {
    let cartFiltered = [];
    cartFiltered = cart.filter(el => el.id === id)
    return cartFiltered.length
  }