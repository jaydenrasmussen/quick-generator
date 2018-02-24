'use strict';
// go specific directories
const fs = require('fs-extra');
const def = require('../utils/util.default');
module.exports = async project => {
    await fs.ensureDir(`${process.cwd()}/${project}`);
    await Promise.all([
        fs.ensureDir(`${process.cwd()}/${project}/src`),
        fs.ensureDir(`${process.cwd()}/${project}/bin`),
        def(project)
    ]);
};
