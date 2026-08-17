/**
 * Cart state, persisted to localStorage so it survives navigation between the
 * static pages. Shape: { [flavorId]: qty }.
 */

import { FLAVORS } from './catalog.js';

const KEY = 'bw-cart';
const SHIPPING_THRESHOLD = 60;
const SHIPPING_FLAT = 8.5;

const listeners = new Set();

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    // Drop anything that no longer exists in the catalog or has a bad qty.
    return Object.fromEntries(
      Object.entries(raw).filter(
        ([id, qty]) => FLAVORS.some((f) => f.id === id) && Number.isInteger(qty) && qty > 0
      )
    );
  } catch {
    return {};
  }
}

function write(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  listeners.forEach((fn) => fn(cart));
}

export const getCart = read;

export function onChange(fn) {
  listeners.add(fn);
  fn(read());
  return () => listeners.delete(fn);
}

export function addItem(id, qty = 1) {
  const cart = read();
  cart[id] = (cart[id] || 0) + qty;
  write(cart);
}

export function setQty(id, qty) {
  const cart = read();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  write(cart);
}

export function removeItem(id) {
  setQty(id, 0);
}

/** Cart entries joined to catalog records, skipping unknown ids. */
export function lines() {
  const cart = read();
  return Object.entries(cart).flatMap(([id, qty]) => {
    const flavor = FLAVORS.find((f) => f.id === id);
    return flavor ? [{ flavor, qty, total: flavor.price * qty }] : [];
  });
}

export function count() {
  return Object.values(read()).reduce((a, b) => a + b, 0);
}

export function totals() {
  const subtotal = lines().reduce((sum, l) => sum + l.total, 0);
  // Free shipping once the order clears the threshold; empty carts ship nothing.
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  return { subtotal, shipping, total: subtotal + shipping, threshold: SHIPPING_THRESHOLD };
}
