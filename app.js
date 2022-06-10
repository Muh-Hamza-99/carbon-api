const express = require("express");
const app = express();

const expressRateLimit = require("express-rate-limit");

const AppError = require("./utilities/app-error");
const catchAsync = require("./utilities/catch-async");
const globalErrorHandler = require("./utilities/error-handler");

const imageDataSchema = require("./helpers/joi-validation");
const constructURL = require("./helpers/construct-url");
const initBrowser = require("./helpers/init-browser");
const deleteFiles = require("./helpers/delete-files");

deleteFiles("tmp");

const limiter = expressRateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this device! Please try again after an hour!",
});

app.use(express.json({ limit: "20kb" }));

app.use("/api", limiter);

app.post("/api/v1/get-image", catchAsync(async (req, res, next) => {
    const { value, error } = imageDataSchema.validate(req.body);
    if (error) return next(error);
    const URL = constructURL(value);
    const fileName = await initBrowser(URL);
    if (!fileName) return next(new AppError("There was an error with the headless browser; try again later!", 456));
    res.status(200).sendFile(`${process.cwd()}/tmp/${fileName}.png`);
}));

app.all("*", (req, res, next) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;