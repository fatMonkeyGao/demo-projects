import Router from "@koa/router";
import { PhotoController } from "../controllers";

const router = new Router({ prefix: "/photos" });

router.post("/generatePhoto", PhotoController.generatePhoto);

export default router;
