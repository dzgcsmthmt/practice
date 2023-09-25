const execa = require("execa");

exports.executeCommand = function executeCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        execa(command, args, {
            cwd,
            stdio: ["inherit", "inherit", "inherit"]
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
