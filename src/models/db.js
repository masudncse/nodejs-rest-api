const Sequelize = require("sequelize");
const DT = Sequelize.DataTypes;

const db = new Sequelize("nodejsblog", "root", "", {
  dialect: "mysql",
  host: "localhost",
  logging: false
});

const User = db.define("user", {
  username: { type: DT.STRING(30), unique: true, allowNull: false },
  password: { type: DT.STRING, allowNull: true }
});

const Article = db.define("article", {
  title: { type: DT.STRING(150), allowNull: true },
  content: { type: DT.STRING }
});

const Comment = db.define("comment", {
  title: { type: DT.STRING(150), allowNull: true },
  message: { type: DT.STRING }
});

Article.belongsTo(User, { as: "author" });
User.hasMany(Article, { foreignKey: "authorId" });

Comment.belongsTo(Article);
Article.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
  db,
  User,
  Article,
  Comment
};
