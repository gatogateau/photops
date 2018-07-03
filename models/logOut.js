const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photoOps");

// the /logout path destroys the session, removing the login credentials, and redirects to the "/" route, which runs the splashPage function.
module.exports.logout = function (req, res) {
    
        _id: token
        isDeleted: false,
         {
     $set: { isDeleted: true } 
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
    
        return res.send({
            success: true,
            message: 'Good'
        });
    }
    
    req.UserSession.destroy(function (err) {
      res.redirect('/');
    });
  }

