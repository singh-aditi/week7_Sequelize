var _a = require('sequelize'), Sequelize = _a.Sequelize, DataTypes = _a.DataTypes;
var connection = new Sequelize({
    host: 'localhost',
    port: 5432,
    username: 'me',
    password: 'password',
    database: 'Sequelize',
    dialect: 'postgres'
});
// async function test()
// {
//     try {
//         await connection.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// test();
var user = connection.define('user', {
    firstName: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING
});
//table is currentli sequelize memory
connection
    .sync({
    logging: console.log
})
    .then(function () {
    console.log('connecion has been established');
    user.create({
        firstName: 'Aditi',
        phone: '12345678',
        email: 'a@a.com'
    });
})["catch"](function (err) {
    console.log('unable to connect to database' + err);
});
