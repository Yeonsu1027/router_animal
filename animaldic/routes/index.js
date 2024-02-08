import express from "express";
import DB from "../models/index.js";
const ANIMAL = DB.models.tbl_animal;
const CHECK = DB.models.tbl_check;

const router = express.Router();

router.get("/", async (req, res) => {
  // const row = await CHECK.findByPk("1");
  const row = await CHECK.findAll();
  // findAll 로 가져오고 id 칼럼조회해서 가져오는걸로바꿔야함
  // 지금은 id하나여서 가능
  res.render("menu/home/home2", { check: row });
}); //기본 홈

router.post("/", async (req, res) => {
  // 추가할것 -
  // 로그인 기능이 구현되면..
  // 데이터를 추가할때 req.body.u_user = 유저id 넣고
  // checklist 앞에다가 if user ${유저}의 넣기 else 그냥체크리스트
  // 로그인후 이용가능합니다

  // 체크리스트 마지막 번호 가져오기
  const strchecknum = await CHECK.findAll({ order: [["u_num", "DESC"]], limit: 1 });
  const num = strchecknum[0].u_num; // json으로 확인해보니 배열이었네
  const intchecknum = Number(num) + 1;

  // return res.json({ intchecknum }); // 번호생성체크용
  // return res.json({ strchecknum }); // 정상적으로 가져와짐..

  req.body.u_num = intchecknum; // 입력데이터 일련번호 자동생성
  req.body.u_user = "callor"; // 후에 = 로그인한 아이디로 수정

  await CHECK.create(req.body);
  return res.redirect("/");
});

//----------------------------

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
router.get("/login", async (req, res) => {
  res.render("menu/login");
});
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
// -
router.get("/fish1", async (req, res) => {
  res.render("animal/fish/fish1");
});
router.get("/fish2", async (req, res) => {
  res.render("animal/fish/fish2");
});
router.get("/fish3", async (req, res) => {
  res.render("animal/fish/fish3");
});
//-
router.get("/bird1", async (req, res) => {
  res.render("animal/bird/bird1");
});
router.get("/bird2", async (req, res) => {
  res.render("animal/bird/bird2");
});
router.get("/bird3", async (req, res) => {
  res.render("animal/bird/bird3");
});
//-
router.get("/snake1", async (req, res) => {
  res.render("animal/snake/snake1");
});
router.get("/snake2", async (req, res) => {
  res.render("animal/snake/snake2");
});
router.get("/snake3", async (req, res) => {
  res.render("animal/snake/snake3");
});
//-
router.get("/cat1", async (req, res) => {
  res.render("animal/cat/cat1");
});
router.get("/cat2", async (req, res) => {
  res.render("animal/cat/cat2");
});
router.get("/cat3", async (req, res) => {
  res.render("animal/cat/cat3");
});

export default router;
