import { perfumes } from "../data/perfumes.js";

export const knownProduct = (id) =>
  perfumes.some((product) => product.id === id);

export function sanitizeCart(value) {
  if (!Array.isArray(value)) return [];
  return value.reduce((items, row) => {
    if (
      !row ||
      !knownProduct(row.id) ||
      !Number.isInteger(row.quantity) ||
      row.quantity < 1
    )
      return items;
    const existing = items.find((item) => item.id === row.id);
    if (existing)
      existing.quantity = Math.min(99, existing.quantity + row.quantity);
    else items.push({ id: row.id, quantity: Math.min(99, row.quantity) });
    return items;
  }, []);
}

export function addCartLine(cart, id, quantity) {
  if (!knownProduct(id) || !Number.isInteger(quantity) || quantity < 1)
    return cart;
  const existing = cart.find((item) => item.id === id);
  return existing
    ? cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      )
    : [...cart, { id, quantity: Math.min(99, quantity) }];
}

export function changeCartQuantity(cart, id, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return cart;
  return cart.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export function summarizeCart(cart) {
  const cartItems = sanitizeCart(cart).map((row) => ({
    ...row,
    product: perfumes.find((product) => product.id === row.id),
  }));
  const subtotal = cartItems.reduce(
    (sum, row) => sum + row.product.price * row.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 100000 ? 0 : 3000;
  return {
    cartItems,
    subtotal,
    shipping,
    total: subtotal + shipping,
    cartCount: cartItems.reduce((sum, row) => sum + row.quantity, 0),
  };
}
