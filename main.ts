import { enviroment } from "./common/enviroment";
import { dividedController } from "./controllers/divided.controller";
import { itemController } from "./controllers/item.controller";
import { productController } from "./controllers/product.controller";
import { tableController } from "./controllers/table.controller";
import { userController } from "./controllers/user.controller";
import { mainRouter } from "./main.router";
import App from "./server/app";

const app = new App([
    dividedController,
    itemController,
    mainRouter,
    productController,
    tableController,
    userController,
],enviroment.server.port,enviroment.db.url);

app.listen();
