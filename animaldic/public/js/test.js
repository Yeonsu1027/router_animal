// 추가 버튼 클릭 시 로그인 상태 확인 후 처리
document.getElementById("addButton").addEventListener("click", function() {
    if (isLoggedIn()) {
      // 로그인한 상태일 때 처리
      var content = prompt("추가할 콘텐츠를 입력하세요:");
      if (content) {
        addContent(content);
      }
    } else {
      // 로그인하지 않은 상태일 때 처리
      alert("로그인 후 이용 가능한 콘텐츠입니다.");
    }
  });
  
  // 리스트 아이템(li) 클릭 시 줄 그어지고 회색으로 변하도록 처리
  document.getElementById("contentList").addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("completed");
    }
  });
  
  // X 표시 클릭 시 해당 데이터 삭제
  document.getElementById("contentList").addEventListener("click", function(event) {
    if (event.target.tagName === "SPAN") {
      var li = event.target.parentElement;
      li.remove();
    }
  });
  
  // 로그인 상태 확인 함수 (임의로 구현)
  function isLoggedIn() {
    // 여기에 로그인 상태 확인 로직을 구현하세요
    // 예: 로그인된 경우 true, 로그인되지 않은 경우 false 반환
  }
  
  // 콘텐츠 추가 함수
  function addContent(content) {
    var li = document.createElement("li");
    li.textContent = content;
    document.getElementById("contentList").appendChild(li);
  }
  