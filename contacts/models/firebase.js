const firebase          = require("firebase-admin");
const serviceAccount = require("../../config/tranfertribe-phonebook-sdk.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://tranfertribe-phonebook.firebaseio.com"
});

// Get a reference to the database service
const database = firebase.database();

const writeTo = (dataToWriteTo = '', value) => {
    const databaseRef = database.ref(dataToWriteTo);

    const newRef = databaseRef.push();
    newRef.set(value);
}

const getList = ( sendList) => {
    const databaseRef = database.ref('contacts/1'); 
    databaseRef.once('value', function(snapshot) {
        sendList(snapshot.val());
    });
}

const getByID = ( id, sendList) => {
    const databaseRef = database.ref('contacts/1').orderByChild(id).limitToLast(1); 
    databaseRef.once('value', function(snapshot) {
        sendList(snapshot.val());
    });
}

const update = (keyToUpdate = '', value) => {
    const databaseRef = database.ref(keyToUpdate);

    databaseRef.update(value);
}

const remove = (keyToUpdate = '') => {
    const databaseRef = database.ref(keyToUpdate);

    databaseRef.remove();
}

const getCurrentUser = () => {
    return firebase.auth().currentUser;
}

const isLoggedIn = () => {
    if (firebase.auth().currentUser) {
        return true;
    }

    return false;
}

const signIn = (idToken, expiresIn) => {

   return firebase.auth().createSessionCookie(idToken, {expiresIn})

}

const onLoginChange = (callbackFunction = () => {}) => {
    const authRef = firebase.auth().onAuthStateChanged((user) => {
        callbackFunction(user);
    });

    return authRef;
}

const signOut = () => {
    return firebase.auth().signOut();
}


const verifyUser = ( sessionCookie) => {
    return firebase.auth().verifySessionCookie(
        sessionCookie, true);
}

module.exports = {
    writeTo,
    update,
    remove,
    getCurrentUser,
    isLoggedIn,
    signIn,
    onLoginChange,
    signOut,
    getList,
    getByID,
    verifyUser
}
