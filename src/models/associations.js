import User from "./user.model.js";
import Todo from "./todo.model.js";

User.hasMany(Todo, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Todo.belongsTo(User, {
    foreignKey: "userId",
});