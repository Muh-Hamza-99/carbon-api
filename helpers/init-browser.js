const puppeteer = require("puppeteer");
const { v4: UUID } = require("uuid");

const initBrowser = async (URL, fileType, whichDirectory) => {
    const browser = await puppeteer.launch({ headless: true, args: ["--start-maximized", "--start-fullscreen", "--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "load" });
    await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
    const exportContainer = await page.$("#export-container");
    const elementBounds = await exportContainer.boundingBox();
    const fileName = UUID();
    await page.screenshot({
		path: `./${whichDirectory}/${fileName}.${fileType}`,
		clip: {
			...elementBounds,
			x: Math.round(elementBounds.x),
			height: Math.round(elementBounds.height) - 1
		},
	});
    await browser.close();
    return fileName;
};

module.exports = initBrowser;