module.exports = function TestModel(sequelize, DataTypes) {
    const Test = sequelize.define('Test', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Test;
}
