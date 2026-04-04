import express from 'express';
import { ensureAuthenticated } from '../Middlewares/auth.middleware.js'
import { urlShortnerPostRequestSchema } from '../Validation/url.validation.js'
import { nanoid } from 'nanoid';
import { insertNewURL, getAllShortCodesByCurrentUser, deleteUrl } from '../Services/url.service.js'
import { id } from 'zod/locales';


const routes = express.Router();

// user can map a short code to a long url
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


// get all the generated short codes by a the current logged in user
routes.get('/my-urls', ensureAuthenticated, async (req, res) => {

    const userID = req?.user.id;

    const result = await getAllShortCodesByCurrentUser(userID);

    if (result.length === 0) {
        return res.status(404).json({
            error: "There is no registered short URL by this user"
        });
    }

    return res.status(200).json(result);
});


// delete the url
routes.delete('/:urlid', async (req, res) => {

    const urlID = req.params.urlid;
    const userID = req?.user.id;


    const deletedURL = await deleteUrl(urlID, userID);

    if (!deletedURL) {
        return res.status(400).json({
            error: `URL with id: ${urlID} not found! to be deleted`
        });
    }

    return res.status(200).json({
        success: "URL deleted successfully."
    });
});

export default routes;