const imageDataSchema = require("./joi-validation");
const constructURL = require("./construct-url");
const initBrowser = require("./init-browser");

const AppError = require("./../utilities/app-error");

const dataToImage = async (bodyData, whichDirectory) => {
    const { value, error } = imageDataSchema.validate(bodyData);
    if (error) return next(error);
    const URL = constructURL(value);
    const fileName = await initBrowser(URL, value.fileType, whichDirectory);
    if (!fileName) return next(new AppError("There was an error with the headless browser; try again later!", 456));
    return { fileName, fileType: value.fileType };
};

module.exports = dataToImage;