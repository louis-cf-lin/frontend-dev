"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 3] = "READ_ONLY";
    Role[Role["AUTHOR"] = 4] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: 'Louis',
    age: 22,
    hobbies: ['Sports', 'Design'],
    books: [2, 'author'],
    role: Role.ADMIN
};
var favouriteActivities;
favouriteActivities = ['Sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
if (person.role === Role.AUTHOR) {
    console.log('is author');
}
