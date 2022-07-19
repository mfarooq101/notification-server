const Joi = require('joi');
const express = require('express');
const request = require('request');
const cors = require('cors');

const router = express.Router();

router.get('/supervisors', cors(), async (req, rsp) => {
    try {
        let supervisors = await getSupervisors();

        supervisors.forEach(elm => {
            if(!isNaN(elm.jurisdiction))
                elm.jurisdiction = "";
        });

        supervisors.sort((a, b) => {
            let s1 = a.jurisdiction + a.lastName + a.firstName;
            let s2 = b.jurisdiction + b.lastName + b.firstName;
            return s1.localeCompare(s2);
        });
        
        rsp.send(supervisors);
    }
    catch(e) {
        return rsp.status(404).send("Empty supervisors collection.");
    }
});

router.post('/submit', cors(), (req, rsp) => {
    console.log(req.body);
    delete req.body.supervisor;
    const {error} = validate(req.body);

    if (error)
        return rsp.status(400).send(concat(error.details));

    rsp.status(200).send(req.body);
});

function validate(supervisor) {
    const schema = Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-z ]+$/).required(),
        lastName: Joi.string().pattern(/^[A-Za-z ]+$/).required(),
        emailAddress: Joi.string().email(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/)
    }).options({abortEarly: false});

    return schema.validate(supervisor);
}

function concat(details) {
    let str = "";

    for(let i = 0; i < details.length; ++i) {
        str += details[i].message + "\n";
    }
    return str;
}

function getSupervisors() {
    let url = "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers";

    let options = {json: true};

    return new Promise((resolve, reject) => {

        request(url, options, (error, res, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
        
            if (!error && res.statusCode == 200) {
                resolve(body);
            };
        });
    })
}

module.exports = router;
