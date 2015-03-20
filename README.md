# restful-resources-js
Small library for using restful resources in your javascript code. Inspired by [angularjs-rails-resource](https://github.com/FineLinePrototyping/angularjs-rails-resource), but with the aim to be framework-agnostic.

## Usage
```javascript
var Resource = require('./resource.js');
var UserResource = new Resource({name: 'user', resourceUrl: '/api/v1/users/'});
var localUser;

//create a UserResource on the server
UserResource.create({name: 'Peter'}).then(function(user) {

});

//get a UserResource via id
UserResource.get(1).then(function(user) {
    //use it...
    localUser = user;

    //update a UserResource, then save it
    user.name = 'Sami';
    user.save();
});

//delete a UserResource
UserResource.delete(1).then(function() {

});
```
