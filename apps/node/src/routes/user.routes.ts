import Router from "@koa/router";
import { UserController } from "../controllers";

const router = new Router({ prefix: "/users" });

// 用户路由
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
