const express = require("express");
const app = express();

const expressRateLimit = require("express-rate-limit");

const AppError = require("./utilities/app-error");
const catchAsync = require("./utilities/catch-async");
const globalErrorHandler = require("./utilities/error-handler");
const cloudinary = require("./utilities/cloudinary");

const deleteFiles = require("./helpers/delete-files");

const dataToImage = require("./helpers/data-to-image");

deleteFiles("tmp");

const limiter = expressRateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this device! Please try again after an hour!",
});

app.use(express.json({ limit: "20kb" }));
app.use(express.static(__dirname + "/public"));

app.use("/api", limiter);

app.post("/api/v1/get-image/file", catchAsync(async (req, res, next) => {
    const { fileName, fileType } = await dataToImage(req.body);
    res.status(200).sendFile(`${process.cwd()}/tmp/${fileName}.${fileType}`);
}));

app.post("/api/v1/get-image/link", catchAsync(async (req, res, next) => {
    const { fileName, fileType } = await dataToImage(req.body);
    res.status(200).send({ status: "success", link: `${req.protocol}://${req.get("host")}/${fileName}.${fileType}` });
}));

app.all("*", (req, res, next) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;