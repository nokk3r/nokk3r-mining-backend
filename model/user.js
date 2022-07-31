module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}