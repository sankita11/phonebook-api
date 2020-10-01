const firebase = require("../models/firebase");


exports.login = ( req, res ) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
 
    firebase.signIn(idToken, expiresIn).then((sessionCookie) => {
        const options = {maxAge: expiresIn, httpOnly: true,  path: "/"};
        res.cookie('session', sessionCookie, options);
        res.status(200).send(JSON.stringify({status: 'success'}));
       }, error => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
       });
}

exports.createContact = (req, res) => {
    firebase.writeTo('contacts/1', req.body);
    res.status(200).send("Contact created");
}

exports.getAllContacts = (req, res) => {
    firebase.getList( (contactList) => {
        res.status(200).send(contactList);
    });

}

exports.getContactByID = (req, res) => {
    firebase.getByID( req.params.id, ( contactList) => {
        res.status(200).send(contactList);
    });

}

exports.updateContactByID = (req, res) => {
    firebase.update("contacts/1/" + req.params.id, req.body);
    res.status(200).send("Contact updated");

}

exports.deleteContact = (req, res) => {
    firebase.remove("contacts/1/" + req.params.id);
    res.status(200).send("Contact deleted");
}