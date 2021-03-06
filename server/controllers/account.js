import cookiesConfigs from "../configs/cookies.js";
import {validationResult} from "express-validator";
import account from "../services/account.js";

async function registerPost(req, res) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const created = await account.register(req.body);
    delete created["id"];
    res.status(200).send(created);
}

async function loginPost(req, res) {
    console.log(req.body);
    res.cookie(cookiesConfigs.authenticationCookieName, JSON.stringify(["User"]), cookiesConfigs.options);
    res.status(200).send("POST: /Account/Login");
}

async function logoutPost(req, res) {
    res.clearCookie(cookiesConfigs.authenticationCookieName);
    res.status(200).send("POST: /Account/Logout");
}

async function profileGet(req, res) {
    console.log(req.user);
    res.status(200).send("GET: /Account/Profile");
}

async function profileUpdate(req, res) {
    res.status(200).send("PUT: /Account/Profile");
}

async function profileDelete(req, res) {
    res.status(200).send("DELETE: /Account/Profile");
}

export default {
    registerPost,
    loginPost,
    logoutPost,
    profileGet,
    profileUpdate,
    profileDelete
}
