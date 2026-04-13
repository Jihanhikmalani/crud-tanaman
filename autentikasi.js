const isLogin = localStorage.getItem("isLogin")

if (!isLogin !== "true") {
  Window, location.href = "login.html"
}
