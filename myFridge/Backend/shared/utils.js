module.exports = {
    generateId: function (length = 16) {
        const allowedChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

        let output = [];
        for (let i = 0; i < length; i++) {
            output.push(allowedChar[Math.floor(Math.random() * allowedChar.length)]);
        }
        return output.join('');
    },
};