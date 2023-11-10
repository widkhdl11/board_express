import express, { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const client = new PrismaClient();

interface JwtPayload {
  account: String;
}

router.post("/", async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({
        ok: false,
        message: "Already exist user.",
      });
    }
    const user = await client.user.findUnique({
      where: { account },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Not exist user.",
      });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        ok: false,
        message: "Incorrect password.",
      });
    }

    // account
    // user.account
    const token = jwt.sign({ account: user.account }, process.env.JWT_SECRET!);

    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Server Error.",
    });
  }
});

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.substring(7);

    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "Not exist Token.",
      });
    }

    // 검증// 발급할때 넣었던 정보들을 꺼내올 수 있음.
    const { account } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.account = account;

    // 미들웨어 실행후 다음으로 넘김
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Server Error.",
    });
  }
};

// router.get("/", verifyToken, (req: any, res) => {
//   console.log(req.account);
//   res.send("ok");
// });

export default router;
