export default class UserModel{
    constructor(name, age, email, password, avatar){
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }
    static signup(name, email, password){
        const user = new UserModel(name, email, password);
        user.id = getUniqueId();
        users.push(user);
        return {status: true, user: user};
    }

    static signin(email, password){
        const user = users.find((user)=>{
            return user.email == email && user.password == password;
        })
        if (user) {
            return {status: true, user: user};
        } else {
            return {status: false, user: user};
        }
    }
}

const users = [
    new UserModel('Aditya','aditya@gmail.com','Aditya1234',1),
    new UserModel('User2','user2@gmail.com','User1234',2)
];

function getUniqueId() {
    const id = users[users.length-1].id + 1;
    return id;
}