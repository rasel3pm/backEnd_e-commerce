const error = require("../error/error")

const authorization = (role) => {
    return (req, res, next) => {
        console.log(role);

        if (!req.user.role.includes(role)) {
            return next(
                error("Your role is not allowed to access")
            )
        }
        next()
    }
}

module.exports = authorization;