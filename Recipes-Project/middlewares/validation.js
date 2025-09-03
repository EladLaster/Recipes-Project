const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const recipeSchema = require('../schemas/recipeSchema');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validatefunc = ajv.compile(recipeSchema)
const partialSchema = { ...recipeSchema, required: [] };
const validatefuncPut = ajv.compile(partialSchema);


function validation(req,res,next){

    const valid = validatefunc(req.body);
    if(valid)
        next();
    else
        return res.status(400).json({ success: false, errors: validatefunc.errors });
}

function validationPut(req, res, next) {
    const valid = validatefuncPut(req.body);
    if(valid)
        next();
    else
        return res.status(400).json({ success: false, errors: validatefuncPut.errors });
}

module.exports = {validation,validationPut}