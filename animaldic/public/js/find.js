document.addEventListener("DOMContentLoaded", () => {
  const find_form = document.querySelector("form.find");
  const find_id = document.querySelector("form.id");
  const find_pw = document.querySelector("form.pw");
  const div_btn = document.querySelector("div.btn");

  find_form?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.value === "아이디찾기") {
      return (document.location.href = "/users/find_id");
    } else if (target.value === "비밀번호찾기") {
      return (document.location.href = "/users/find_pw");
    } else if (target.value === "다음") {
      return res.render();
    }
    return false;
  });
});
