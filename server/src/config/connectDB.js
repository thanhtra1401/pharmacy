import {Sequelize} from "sequelize"
const sequelize = new Sequelize('pharmacy_db', 'root', '01042001', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
export {connectDB}