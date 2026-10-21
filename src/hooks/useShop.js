import { useEffect, useState } from "react";
import {
  knownProduct,
  sanitizeCart,
  addCartLine,
  changeCartQuantity,
  summarizeCart,
} from "./shopState";
const known = knownProduct;
export function readFavorites() {
  try {
    const value = JSON.parse(
      localStorage.getItem("scent-note-favorites") || "[]",
    );
    return Array.isArray(value)
      ? [...new Set(value.filter((id) => typeof id === "string" && known(id)))]
      : [];
  } catch {
    return [];
  }
}
export function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem("scent-note-cart") || "[]");
    return sanitizeCart(value);
  } catch {
    return [];
  }
}
export default function useShop() {
  const [favorites, setFavorites] = useState(readFavorites);
  const [cart, setCart] = useState(readCart);
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem("scent-note-favorites", JSON.stringify(favorites));
    } catch {
      void 0;
    }
  }, [favorites]);
  useEffect(() => {
    try {
      localStorage.setItem("scent-note-cart", JSON.stringify(cart));
    } catch {
      void 0;
    }
  }, [cart]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 2600);
    return () => clearTimeout(timer);
  }, [notice]);
  const announce = (text) => setNotice({ text, key: Date.now() });
  const toggleFavorite = (id) => {
    if (!known(id)) return;
    const exists = favorites.includes(id);
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
    announce(exists ? "찜 목록에서 삭제했어요." : "찜 목록에 추가했어요.");
  };
  const addCart = (id, quantity = 1) => {
    if (!known(id) || !Number.isInteger(quantity) || quantity < 1) return;
    setCart((prev) => addCartLine(prev, id, quantity));
    announce("장바구니에 담았어요.");
  };
  const updateQuantity = (id, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
    setCart((prev) => changeCartQuantity(prev, id, quantity));
  };
  const removeCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    announce("장바구니에서 삭제했어요.");
  };
  return {
    favorites,
    toggleFavorite,
    addCart,
    updateQuantity,
    removeCart,
    clearCart: () => {
      setCart([]);
      announce("장바구니를 비웠어요.");
    },
    ...summarizeCart(cart),
    notice,
  };
}
