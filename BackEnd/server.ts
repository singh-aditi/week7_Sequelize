let express = require('express');
let fs = require('fs');
let app = express();
const PORT = process.env.PORT || 5000;
let cORS = require('cors');

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: 'true'    
}));

app.listen(3000);

app.use(cORS());

const { Pool, Client } = require('pg');

const {Sequelize, DataTypes}= require ('sequelize');
const connection=new Sequelize ({
    host: 'localhost',
    port: 5432,
    username: 'me',
    password: 'password',
    database: 'Sequelize',
    dialect: 'postgres'
})


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

const Users=connection.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allownull: false
    },
    middleName: DataTypes.STRING,
    lastName: {
        type: DataTypes.STRING,
        allownull: false
    },
    email: {
        type: DataTypes.STRING,
        allownull: false
    },
    phoneNo: {
        type: DataTypes.STRING,
        allownull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allownull: false
    },
    c_id: {
        type: DataTypes.INTEGER,
        allownull: false
    }
});
const Customers= connection.define('Customer', {
    name:{
        type: DataTypes.STRING,
        allownull: false
    },
    address:
    {
        type: DataTypes.STRING,
        allownull: false
    },
    description:
    {
        type: DataTypes.STRING,
        allownull: false
    },
    c_id:{
        type: DataTypes.INTEGER,
        allownull: false
    }
});
const Roles= connection.define('Roles',{
    role_name:{
        type: DataTypes.STRING,
        allownull: false
    },
    role_id:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    description:{
        type: DataTypes.STRING,
        allownull: false
    }
})
//table is currentli sequelize memory

connection
    .sync({
        logging : console.log
    })
    .then (() => { 
        console.log('connecion has been established');
        app.listen(PORT, ()=>{
            console.log('The server starts at', PORT);
        })
    })
    .catch((err) =>{
        console.log('unable to connect to database'+err)
    });
        
    app.delete('/EmployeeTable/:id', deleteRow);    
    function deleteRow(req: any, res: any) {
        Users.destroy({
            where: {
                id: req.params.id
            }
        })
    }
    app.get('/BussinessLogic', (req: any, res: any) => {
        let users=  Users.findAll ({
            include: [{model: Customers}, {model: Roles}],
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(users);
    });
    
    //role drop down api
    app.get('/RoleData', (req:any,res:any)=>
    {
        let roles= Roles.findAll()
        res.json(roles);
    });
    //ends
    
    //customer dropdown api
    app.get('/CustomerData', (req:any,res:any)=>
    {
        let customers=Customers.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(customers);
    });
    //ends
    
    app.put('/Update', Update);
    function Update(req: any, res: any) {
        let user=req.body;
        Users.update({
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            phoneNo: user.phoneNo,
            role_id: parseInt(user.role_id),
            address: user.address,
            c_id: parseInt(user.c_id)}, {
                where: {
                    id: req.params.id
                }
        })
        res.status(200);
    
    }
    
    app.post('/Add', AddRow)
    function AddRow(req: any, res: any) {
    
        let user= req.body;
        Users.create(user)
    
    }
