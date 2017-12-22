const fs = require('fs-extra');
const base = process.cwd() + '/';

module.exports = async dir => {
    return Promise.all([
        fs.ensureFile(`${base + dir}/src/app.go`),
        fs.emptyDir(`${base + dir}/build/`)
    ]);
};
