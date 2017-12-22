// J. Rasmussen 2017
// Main generator for node apps
const program = require('commander');
module.exports = (() => {
    program
        .version('2.0.0')
        .usage('[command] [flags] [name]')
        .command('repo [name]', 'Creates a git repo with the specified name')
        .command(
            'init [name]',
            'Creates a folder with the specified flags and initializes it'
        )
        .parse(process.argv);
})();
