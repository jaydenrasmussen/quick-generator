const fs = require('fs-extra');
const base = process.cwd() + '/';
let date = new Date();
date = date.getFullYear();
const license = `
Copyright ${date}

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
`;
const editorconfig = `root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = spaces
indent_size = 4
`;
const readme = `# INIT`;
module.exports = async dir => {
    await fs.emptyDir(base + dir);
    await fs.outputFile(base + dir + '/README.md', readme);
    await fs.outputFile(base + dir + '/LICENSE.md', license);
    await fs.outputFile(base + dir + '/.editorconfig', editorconfig);
};
