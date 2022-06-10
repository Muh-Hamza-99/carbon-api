require("dotenv").config({ path: "./config.env" });

process.on("uncaughtException", error => {
    console.log(`Uncaught Exception! ${error.name}, ${error.message}.`);
    process.exit(1);
});

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`Server is up and running on port ${PORT}...`));

process.on("unhandledRejection", error => {
    console.log(`Unhandled Rejection! ${error.name}, ${error.message}.`);
    server.close(() => process.exit(1));
});