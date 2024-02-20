import express from "express";
import DB from "../models/index.js";
const NOTICE = DB.models.tbl_notice;
const router = express.Router();

router.get("/nwrite", (req, res) => {
  res.render("menu/notice/nwrite");
});

export default router;
