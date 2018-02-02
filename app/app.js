'use strict';
const meow = require('meow');
const parse = require('./parse');
module.exports = (async () => {
    const cli = meow(
        `Usage: qg [command] <flag> [project name]
Commands: electron <e> - generates an electron app 
          go <g> - generates a go app
          init <i> - generates a project directory
          node <n> - generates a node app
          micro <m> - generates micro app
          polka <p> - generates polka app
          express <e> - generates an express app
          micro <m> - generates a zeit/micro app
Flags: repo <r> 

Examples: qg n -r sweet-tea`,
        {
            flags: {
                repo: {
                    type: 'boolean',
                    alias: 'r'
                }
            }
        }
    );
    await parse(cli);
})();
