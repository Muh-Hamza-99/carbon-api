const fs = require("fs");

const deleteFiles = directoryPath => {
    setInterval(() => {
        const files = fs.readdirSync(directoryPath);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const filePath = `${directoryPath}/${files[i]}`;
                if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
            };
        };
    }, 60000);
};

module.exports = deleteFiles;