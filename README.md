# restful-resources-js
Small library for using restful resources in your javascript. Inspired by [angularjs-rails-resource](https://github.com/FineLinePrototyping/angularjs-rails-resource), but with the aim to be framework-agnostic.

## Usage
```javascript
var Resource = require('./resource.js');
var User = new Resource({name: 'user', resourceUrl: '/api/v1/users/'});
var localUser, allUsers;

//create a User on the server
User.create({name: 'Peter'}).then(function(user) {

});

//get a User via id
User.get(1).then(function(user) {
    //use it...
    localUser = user;

    //update a UserResource, then save it
    user.name = 'Sami';
    user.save();
});

//get all Users
//(depending on your endpoint this is probably not *all*)
User.get().then(function(users) {
    allUsers = users;
});

//delete a User
User.delete(1).then(function() {

});
```
