const API_URL = "http://localhost:4000";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function addToCart(productId, quantity) {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_URL}/cart`);
  return res.json();
}

export async function updateCart(productId, quantity) {
  const res = await fetch(`${API_URL}/cart`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
}
