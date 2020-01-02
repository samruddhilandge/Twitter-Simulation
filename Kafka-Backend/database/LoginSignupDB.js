const dbConnection = require('./dbConnectionPool');

module.exports = class LoginSignUpDB {

  async checkIfUserExists(table, email) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let result = await con.query('SELECT * FROM ?? WHERE username = ?', [table, email]);
      await con.query("COMMIT");
      result = JSON.parse(JSON.stringify(result));
      return result;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }


  async createNewUser(table, inputData) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedUser = await con.query('INSERT INTO ?? SET ?', [table, inputData]);
      await con.query("COMMIT");
      inputData.id = savedUser.insertId;
      console.log(inputData);
      return inputData;
    } catch (ex) {
      console.log(ex);
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async userLogin(table, emailId, password) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      //select * from buyerTable where emailId = 'admin' and userPassword = 'd033e22ae348aeb5660fc2140aec35850c4da997'
      let result = await con.query('SELECT * FROM ?? WHERE username = ? AND userPassword = ?', [table, emailId, password]);
      await con.query("COMMIT");
      result = JSON.parse(JSON.stringify(result));
      console.log("result in login db" + result)
      return result;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
}