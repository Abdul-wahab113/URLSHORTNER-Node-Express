import express from 'express';
import { ensureAuthenticated } from '../Middlewares/auth.middleware.js'
import { urlShortnerPostRequestSchema } from '../Validation/url.validation.js'
import { nanoid } from 'nanoid';
import { insertNewURL } from '../Services/url.service.js'

const routes = express.Router();


routes.post('/shorten', ensureAuthenticated, async (req, res) => {

    const userID = req?.user.id;

    const validationResult = await urlShortnerPostRequestSchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json(validationResult.error.format());
    }

    const { shortCode, targetURL } = validationResult.data;

    // if the user gives its own nano id then it's ok otherwise system will generates its own shortcode using nanoid
    const finalShortCode = shortCode ?? nanoid(6);

    const result = await insertNewURL({
        finalShortCode,
        targetURL,
        userID
    });

    if (!result) {
        return res.status(400).json({
            error: "Error in urls record saving"
        });
    }

    return res.status(200).json({
        status: "success",
        urlID: result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetUrl
    })


});



export default routes;