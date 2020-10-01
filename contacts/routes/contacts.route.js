const ContactController = require("../controllers/contacts.controller");
const Auth = require("../auth/auth");


exports.contactRoutes = function(app){

    app.post("/login", [ContactController.login])

    app.post("/create", [Auth.authorizeUser, ContactController.createContact]);

    app.get("/contacts", [Auth.authorizeUser, ContactController.getAllContacts]);

    app.get("/contact/:id", [Auth.authorizeUser,ContactController.getContactByID]);

    app.post("/contact/update/:id", [Auth.authorizeUser,ContactController.updateContactByID]);

    app.post("/contact/delete/:id", [Auth.authorizeUser,ContactController.deleteContact]);
}