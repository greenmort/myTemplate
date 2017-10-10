class User {

    constructor (name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    sayHiTo(name){
        let person = name;
        return ("hello, " + person + "! My name is " + this.name + "I'm " + this.age);
    }
}

let vasya = new User("Vasya", 23, "male");

document.querySelector(".class_header").addEventListener("click", () => {
    alert(vasya.sayHiTo("Igor"));
})