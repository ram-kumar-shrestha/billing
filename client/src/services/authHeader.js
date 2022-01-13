export default function authHeader() {
  const token = localStorage.getItem("authToken");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
