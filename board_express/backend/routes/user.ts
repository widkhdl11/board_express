import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./auth";

const router = express.Router();

const client = new PrismaClient();

// User 생성
router.post("/", async (req, res) => {
  try {
    const { account, password } = req.body;

    // 받아온 값 유효성
    if (
      !account ||
      !password ||
      account.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({
        ok: false,
        message: "Already exist user.",
      });
    }

    // 해당 유저 찾기
    const existUser = await client.user.findUnique({
      where: { account },
    });

    // 있는 회원은 에러
    if (existUser) {
      return res.status(400).json({
        ok: false,
        message: "Not exist data.",
      });
    }

    // 비밀번호 암호화
    const hashedPassword = bcrypt.hashSync(password, 10); // 10번 스크램블

    // 유저 객체 생성
    const user = await client.user.create({
      // 객체에 담을 값
      data: {
        account,
        password: hashedPassword,
      },

      // 반환할 값
      select: {
        account: true,
      },
    });

    // 토큰 생성
    const token = jwt.sign({ account: user.account }, process.env.JWT_SECRET!);

    return res.json({ ok: true, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      message: "Server Error.",
    });
  }
});

router.post("/me", verifyToken, async (req: any, res) => {
  try {
    const { account } = req;

    const user = await client.user.findUnique({
      where: {
        account,
      },
      select: {
        account: true,
      },
    });

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Server Error.",
    });
  }
});

export default router;
