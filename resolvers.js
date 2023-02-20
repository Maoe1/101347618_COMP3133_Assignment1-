const User = require('./models/User');
const Employee = require('./models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server');
const Joi = require('joi');
const { Types } = require('mongoose');





const resolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
        try {
          const user = new User({ username, email, password });
          await user.save();
          return  {
            success: true,
            message: 'User added successfully!',
            user: user
        };
       } catch (err){
        return {
           success: false,
           message: err.message,
           user: null
        }
      }
    },
     addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
          try {
            const employee = new Employee({ first_name, last_name, email, gender, salary});
            await employee.save();
            return {
              success: true,
              message: 'Employee added successfully!',
              employee: employee
            };
          } catch (err) {
            return {
              success: false,
              message: err.message,
              employee: null
            };
          }
        },
        async updateEmployee(_, { id, input }) {
          const employeeSchema = Joi.object({
            first_name: Joi.string(),
            last_name: Joi.string(),
            email: Joi.string().email(),
            gender: Joi.string(),
            salary: Joi.number().positive(),
          });
          const { error, value } = employeeSchema.validate(input);

         if (error) {
          throw new UserInputError(error.details[0].message);
         }
          
          try {
            const employee = await Employee.findById(id);
    
            if (!employee) {
              return {
                success: false,
                message: 'Employee Id does not exist',
                employee: null,
              };
            }

            // Validate input fields
            if (input.salary && input.salary < 0) {
              throw new UserInputError('Salary cannot be negative');
             }
             if (input.salary && input.salary < 0) {
              throw new UserInputError('Salary cannot be negative');
             }
             if (input.salary && input.salary < 0) {
              throw new UserInputError('Salary cannot be negative');
             }

    
            const updatedEmployee = await Employee.findByIdAndUpdate(
              id,
              input,
              { new: true }
            );
    
            return {
              success: true,
              message: 'Employee details updated',
              employee: updatedEmployee,
            };
          } catch (error) {
            console.error(error);
    
            return {
              success: false,
              message: 'Failed to update Employee details',
              employee: null,
            };
          }
        },
        async deleteEmployee(_, { id }) {
          try {

            if (!Types.ObjectId.isValid(id)) {
              return {
                success: false,
                message: 'Invalid Id',
                employee: null,
              };
            }
            const employee = await Employee.findById(id);
            console.log(employee)

            const deletedEmployee = await Employee.findByIdAndDelete(id);
            console.log(deletedEmployee)
    
            if (!deletedEmployee) {
              return {
                success: false,
                message: 'Employee id does not exist',
                employee: null,
              };
            }
    
            return {
              success: true,
              message: 'Employee  deleted',
              employee: deletedEmployee,
            };
          } catch (error) {
            console.error(error);
    
            return {
              success: false,
              message: 'Failed to delete employee',
              employee: null,
            };
          }
        },
  },
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      if (password !== user.password) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return token;
    },
    async employees() {
      const employees = await Employee.find();
      return employees;
    },
    async searchEmployee(_, args) {
      try {
        const employee = await Employee.findById(args.id);

        if (!employee) {
          return {
            success: false,
            message: 'Emloyee Id does not exist',
            employee: null,
          };
        }

        return {
          success: true,
          message: 'Employee exist',
          employee,
        };
      } catch (error) {
        console.error(error);

        return {
          success: false,
          message: 'Error searching for Employee',
          employee: null,
        };
      }
    },    
  },

};

module.exports = { resolvers };