import express from "express";

const router = express.Router();

router.post("/signup",(req, res) => {
    res.send("sign routes");
})

router.post("/login",(req, res) => {
    res.send("login routes");
})

router.post("/logout",(req, res) => { 
    res.send("logout routes")
})

export default router;