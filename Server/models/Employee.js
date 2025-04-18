const mongoose = require("mongoose")

const EmployeeScheme = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const EmployeeModel = mongoose.model("employees", EmployeeScheme)
module.exports = EmployeeModel