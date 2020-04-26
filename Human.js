import 'core-js/stable';
// class-keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Human {
    constructor(settings) {
        this.name = settings.name;
        this.age = settings.age;
    }

    changeName(name) {
        this.name = name;
    }

    sayHello() {
        if (this.name.includes("Kekkonen")) {
            console.log("Hello master");
            return;
        }
        // Template literals with backticks
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        console.log(`Hello! My name is ${this.name} and I'm ${this.age} year old`);
        // // Old way
        // console.log('Hello! My name is' + this.name + ' and I\'m ' + this.age + 'year old');
    }
}

// Default export
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
export default Human;
