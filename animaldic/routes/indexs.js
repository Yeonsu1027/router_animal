import express from "express";
import DB from "../models/index.js";

import { upLoad } from "../modules/file_upload.js";

const ANIMAL = DB.models.tbl_animal;
const CHECK = DB.models.tbl_check;
const USER = DB.models.tbl_members;
const MYANIMAL = DB.models.tbl_myanimal;

const router = express.Router();

router.get("/", async (req, res) => {
 
  // const row = await CHECK.findAll({
  //   where: {
  //     m_username: req.session.user.m_username
  //   }
  // })
  // if(row){

  //   res.render("menu/home/home2", { check: row });
  // } else {
  //   res.render("menu/home/home2");
  // }

    const row = await CHECK.findAll();

  //  const u_userddd = req.session.user.m_username
  //  if(u_userddd){
  //  const users = await CHECK.findAll({
  //   where: {
  //     u_user: u_userddd
  //   }
  // })
  // res.json(users)}
  // else {
  //   return res.render("menu/home/home3")
  // }
  //  const rows = await CHECK.findAll({
  //   attributes:['u_user'],
  //   where: {}

  //  });
 // const row = await CHECK.find(where);
  // const rows = await CHECK.findAll({
  //   where: {
  //     u_user : where
  //   }
  // });
  // return res.render("menu/home/home2", { check: rows.map(row => row.c_check) });
//   if (users) {
//   return res.render("menu/home/home3", { check: users });}
//   else {
// return res.render("menu/home/home3")
//   }

  res.render("menu/home/home3", { check: row });


  
 
}); //기본 홈

router.post("/", async (req, res) => {
  // 추가할것 -
  // 로그인 기능이 구현되면..
  // 데이터를 추가할때 req.body.u_user = 유저id 넣고
  // checklist 앞에다가 if user ${유저}의 넣기 else 그냥체크리스트
  // 로그인후 이용가능합니다
  // else 입력칸, 추가하기 누르면 알림

  // 체크리스트 마지막 번호 가져오기
  const strchecknum = await CHECK.findAll({ order: [["u_num", "DESC"]], limit: 1 });
  const num = strchecknum[0].u_num; // json으로 확인해보니 배열1개로 들어있음
  const intchecknum = Number(num) + 1;

  // test
  // return res.json({ intchecknum }); // 번호생성체크용
  // return res.json({ strchecknum }); // 정상적으로 가져와짐

  // 안보이는 인풋칸 일련번호, 아이디 넣기 자동생성
  req.body.u_num = intchecknum; // 입력데이터 일련번호 자동생성
  req.body.u_user =req.session.user.m_username; //= 로그인한 아이디 자동입력
 
  await CHECK.create(req.body);
  return res.redirect("/");
});
//----------- 홈 리스트 삭제
router.get("/:u_num/delete", async (req, res) => {
  CHECK.destroy({ where: { u_num: req.params.u_num} }).then(() => {
    res.redirect("/");
  });
});
//---------------------------- 홈 반려동물추가
router.get("/insert",(req,res)=>{
  res.render("menu/home/myanimal")
})

// router.post("/insert", (req, res)=>{
//   res.redirect("/");
// })

//-------------------------------

router.get("/youtube", async (req, res) => {
  res.render("menu/home/youtube");
}); //홈에유튜브추천

router.get("/survey", async (req, res) => {
  res.render("menu/home/survey");
}); //홈에설문

router.get("/recom", async (req, res) => {
  res.render("menu/home/recom");
}); //홈에어플추천

// 메뉴들 ------------------------------

// router.get("/freeboard", async (req, res) => {
//   res.render("menu/freeboard/freeboard");
// });
router.get("/notice", async (req, res) => {
  res.render("menu/notice");
});
// router.get("/login", async (req, res) => {
//   res.render("menu/login");
// });
const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID 없음",
  PASS_WRONG: "비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};

router.get("/login", (req, res) => {
  const message = req.query.fail; 
  return res.render("menu/login", { NEED: message });
});
router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;

  const result = await USER.findByPk(username); 
  if (!result) {
    return res.redirect(`/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_username === username) {
    

    if (result.m_password === password) {
       req.session.user = result;
      return res.redirect("/");
    } else {
      return res.redirect(`/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
    }

    // return res.json({ MESSAGE: "PASSWORD WRONG" });
  }
  {
    /**
     * DB 에서 가져온 사용자정보(result)를
     * Server 의 세션영역에 user 라는 이름으로 보관하라
     * 그리고 Session ID 를 발행하라
     */
    req.session.user = result; // server에 세션영역에 유저 변수를 만들고 데이터 사용자정보를 저장하고 세션아이디 발행(?)
    return res.redirect("/");
    // 결과도 비번도같으면
    // return res.json({ MESSAGE: "LOGIN OK" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}); // 로그아웃

// --------------------
router.get("/join", async (req, res) => {
  res.render("menu/join");
});
// 동물들 ---------------------------------------

// pk용
const 동물이름 = {
  기니피그: "기니피그",
  친칠라: "친칠라",
  햄스터: "햄스터",
  금붕어: "금붕어",
  구피: "구피",
  네온테트라: "네온테트라",
  앵무새: "앵무새",
  카나리아: "카나리아",
  십자매: "십자매",
  뱀: "뱀",
  거북이: "거북이",
  도마뱀: "도마뱀",
  강아지: "강아지",
  고양이: "고양이",
  라쿤: "라쿤",
};

router.get("/mouse1", async (req, res) => {
  const animalname = 동물이름.기니피그;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse1", { adata: animaldata });
});
router.get("/mouse2", async (req, res) => {
  const animalname = 동물이름.친칠라;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse2", { adata: animaldata });
});
router.get("/mouse3", async (req, res) => {
  const animalname = 동물이름.햄스터;
  const animaldata = await ANIMAL.findByPk(animalname);

  return res.render("animal/mouse/mouse3", { adata: animaldata });
});
// - 물고기 
router.get("/fish1", async (req, res) => {
  const animalname = 동물이름.금붕어;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish1" , { adata: animaldata });
});
router.get("/fish2", async (req, res) => {
  const animalname = 동물이름.구피;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish2", { adata: animaldata });
});
router.get("/fish3", async (req, res) => {
  const animalname = 동물이름.네온테트라;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/fish/fish3" , { adata: animaldata });
});
//- 새 
router.get("/bird1", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/bird/bird1", { adata: animaldata });
});
router.get("/bird2", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);

  res.render("animal/bird/bird2", { adata: animaldata });
});
router.get("/bird3", async (req, res) => {
  const animalname = 동물이름.앵무새;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/bird/bird3", { adata: animaldata });
});
//- 파충류
router.get("/snake1", async (req, res) => {
  const animalname = 동물이름.뱀;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/snake/snake1", { adata: animaldata });
});
router.get("/snake2", async (req, res) => {
  const animalname = 동물이름.거북이;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/snake/snake2", { adata: animaldata });
});
router.get("/snake3", async (req, res) => {
  const animalname = 동물이름.도마뱀;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/snake/snake3", { adata: animaldata });
});
//- 포유류
router.get("/cat1", async (req, res) => {
  const animalname = 동물이름.강아지;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/cat/cat1", { adata: animaldata });
});
router.get("/cat2", async (req, res) => {
  const animalname = 동물이름.고양이;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/cat/cat2", { adata: animaldata });
});
router.get("/cat3", async (req, res) => {
  const animalname = 동물이름.라쿤;
  const animaldata = await ANIMAL.findByPk(animalname);
  
  res.render("animal/cat/cat3", { adata: animaldata });
});

export default router;
