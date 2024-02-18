document.addEventListener("DOMContentLoaded",()=>{
    const needlogin = document.querySelector("input.ex");
    needlogin.addEventListener("click",()=>{
    alert("로그인 후 이용가능합니다")
    })
}) //로그인 안하면 추가불가

// 수정해야함
document.addEventListener("DOMContentLoaded",()=>{
    const btn_delete = document.querySelector("button.delete");
    btn_delete.addEventListener("click", (e) => {
        if (confirm("삭제된 데이터는 복구 할 수 없습니다\n정말 삭제할까요?")) {
          const target = e.target;
        //   if(target.tagName ==="BUTTON" || "I"){}
          const u_num = target.dataset.u_num;
          document.location.replace(`/${u_num}/delete`); //서버에 이 번호삭제요청..
        }
      });
})