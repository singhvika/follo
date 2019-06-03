let authService = require(__dirname + '/../../services/authenticationService/authenticationService.js');

let signup = (req, res) => {
    //call the service to perform signup
    let newUserJSON = req.body;
    if (req.file) {
        newUserJSON.profilePicture = req.file.location;
    }

    authService.signup(newUserJSON)
        .then((result) => {
            if (result) {
                let user = {
                    email: result.user.email,
                    username: result.user.username,
                    firstName: result.user.firstName,
                    lastName: result.user.lastName,
                    token: result.newToken
                }
                res.send(user);
            } else {
                res.status(400).send({
                    status: 400,
                    message: 'user already exists'
                })
            }
        })
        .catch((result) => {
            res.status(400);
            res.send({
                message: "Cannot signup",
                status: 400
            });

        })
}

let login = async (req, res) => {
    // call the service to perform login
    console.log(req.body);
    let result = await authService.login(req.body);
    console.log(result);
    if (result) {
        res.send({
            email: result.user.email,
            username: result.user.username,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            token: result.token
        });
    } else {
        res.status(400).send({
            status: 400,
            message: 'cannot login'
        });
    }
}


let logout = async (req, res) => {
    try {
        //console.log(req.user.token);
        let token = req.header('Authorization').replace('Bearer ', '');
        let user = req.user;
        await authService.logout(user, token).then((status) => {
                res.send({
                    status: 200,
                    message: 'logged out'
                })
            })
            .catch((e) => {
                res.send(e);
            })
    } catch (e) {
        console.log("cannot logout");
        console.log(e);
        res.status(400).send({
            status: 400,
            message: 'cannot logout'
        })
    }

}

module.exports = {
    signup,
    login,
    logout
}