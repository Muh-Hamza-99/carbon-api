const JOI = require("joi");

const imageDataSchema = JOI.object({
    code: JOI.string()
        .min(5)
        .max(10000)
        .trim()
        .messages({ 
            "string.base": "'code' must be a 'string'!",
            "string.min": "'code' should have a minimum length of {#limit} characters!",
        }),
    backgroundColor: JOI.string()
        .pattern(/^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/)
        .trim()
        .messages({
            "string.base": "'backgroundColor' should be a 'string'!",
            "string.pattern.base": "'backgroundColor' doesn't adhere to an RGBA color pattern!",
        }),
    theme: JOI.string()
        .trim()
        .messages({
            "string.base": "'theme' should be a 'string'!",
        }),
    language: JOI.string()
        .trim()
        .messages({
            "string.base": "'language' should be a 'string'!",
        }),
    lineheight: JOI.number()
        .min(1.0)
        .max(2.5)
        .messages({
            "number.base": "'lineheight' should be a 'number'!",
            "number.min": "'lineheight' can be a minimum of 1.00!",
            "number.max": "'lineheight' can be a maximum of 2.50!",
        }),
    includeLineNumbers: JOI.boolean()
        .truthy("yes")
        .falsy("no")
        .sensitive()
        .messages({
            "boolean.base": "'includeLineNumbers' should be a 'boolean'!",
        }),
});

module.exports = imageDataSchema;