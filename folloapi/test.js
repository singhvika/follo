let bcrypt = require('bcrypt');




let hashPassword = async (pwd) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, (err, hash) => {
            if (!err)
            {
                resolve(hash);
            }else{
                reject(err)
            }
        })
    })
}

let getHash = async (pwd) => {
    let hash = await hashPassword(pwd);
    return hash;
}

getHash('vikas').then((hash) => {
    console.log(hash);
})
