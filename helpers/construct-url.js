const carbonQueryParameters = {
    "code": "code",
    "backgroundColor": "bg",
    "theme": "t",
    "language": "l",
    "lineheight": "lh",
    "includeLineNumbers": "ln",
};

const constructURL = data => {
    let URL = "https://carbon.now.sh/?";
    for (let entry of Object.entries(data)) {
        if (!carbonQueryParameters[entry[0]]) continue;
        URL += encodeURI(`${carbonQueryParameters[entry[0]]}=${entry[1]}&`);
    };
    return URL.slice(0, -1).replaceAll("BREAK", "%0A").replaceAll("'", '"');
};

module.exports = constructURL;