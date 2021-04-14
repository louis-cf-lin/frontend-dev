enum Role { ADMIN, READ_ONLY = 3, AUTHOR } // can assign custom values, otherwise will increment automatically; default start 0

// type Person = {
//   name: string;
//   age: number;
//   hobbies: string[];
//   bookes: [number, string];
//   role: Role;
// }

const person = {
  name: 'Louis',
  age: 22,
  hobbies: ['Sports', 'Design'],
  books: [2, 'author'], // union type array if not declared as tuple
  role: Role.ADMIN
}

// person.role.push('admin')
// person.role[1] = 10

let favouriteActivities: string[];
favouriteActivities = ['Sports']

console.log(person.name)

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()) // knows it's an array of strings
}

if (person.role === Role.AUTHOR) {
  console.log('is author')
}
