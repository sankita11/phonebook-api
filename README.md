# phonebook-api

Initialize app
npm install

Start the server
npm start

server will start on port 3006 

APIs included

# create session for authenticating user in subsequent API calls
POST /login

# All the APIs listed below will require session cookies in request headers otherwise they will fail
# create contact
POST /create
Request Body
{
    "firstName" : "..",
    "lastName" : "..",
    "mobile": "..",
    "landline": ".."
}

# get full list of contacts
GET /contacts

# get a contact by id
GET /contact/:id

# update a contact 
POST /contact/update/:id
Request Body
{
    "firstName" : "..",
    "lastName" : "..",
    "mobile": "..",
    "landline": ".."
}

# delete contact
POST /contact/delete/:id

