module.exports = function(seq, Types) {
    const User = seq.define('User', {
        id: {
            type: Types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Types.STRING,
            allowNull: false,
        },
        encPassword: {
            type: Types.STRING,
            allowNull: false,
        },
    });
    return User;
}