const { findBy } = require('../api/users/users-model.js')

module.exports = (req, res, next) => {
    let { username, email } = req.body;

    findBy({ username: username })
        .then(user => {
            if (user.length) {console.log("user",user);
                res.status(400).json({
                    message: "Sorry. That username has been taken. Please choose another."
                });
            } else {
                findBy({ email: email })
                    .then(user => {
                        if (user.length)
                            res.status(400).json({
                                message:
                                    "Sorry. That email has been taken. Please choose another."
                            });
                        else next();
                    })
                    .catch(err =>
                        res.status(500).json({
                            message:
                                `Sorry. Something went wrong in validating that email is unique.----${"--",console.error(err),"----"}----`,
                            error: err,
                            error_mesage: err.message
                        })
                    );
            }
        })
        .catch(err =>
            res.status(500).json({
                message:
                    "Sorry. Something went wrong in validating that username is unique.",
                error: err,
                error_mesage: err.message
            })
        );
}