import express from "express";
import sequelize from "./config/db.js";
import User from "./models/user.model.js";
import Todo from "./models/todo.model.js";
import Image from "./models/image.model.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import "./models/associations.js";
import cors from "cors";
import path from "path";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);



try {
  await sequelize.authenticate();
  console.log("Database connected successfully!");

  await sequelize.sync({ alter: true });
  console.log("Tables synchronized successfully!");
} catch (error) {
  console.log("Database connection failed!");
  console.error(error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
