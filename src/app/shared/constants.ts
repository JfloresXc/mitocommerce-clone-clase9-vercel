export const CART_MESSAGES = {
  productAdded: (name?: string) => `${name ?? ''} agregado al carrito`,
  productReduced: (name?: string) => `${name ?? ''} reducido del carrito`,
  cartCleared: 'Carrito de compras limpiado',
} as const;
