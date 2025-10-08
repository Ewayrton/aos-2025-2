import bcrypt from "bcryptjs";

const getUserModel = (sequelize, { DataTypes }) => {

  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],// Senha deve ter entre 7 e 42 caracteres
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  // Hook que criptografa a senha antes de salvar um novo usuário
  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  // Método para gerar o hash da senha
  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  // Método para validar a senha
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default getUserModel;
