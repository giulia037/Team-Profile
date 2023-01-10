class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getEmail(){
      return this.email
    }
    getRole(){
      return "Employee"
    }
    getName(){
      return this.name
    }
    getId(){
      return this.id
    }
  }  
  
  module.exports = Employee