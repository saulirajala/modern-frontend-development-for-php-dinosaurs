var greet = function (name) {
    console.log("Function name: ", greet.name); // Function name:  greet
    var who = name;
    if (greet.anotherName) {
        who = greet.anotherName;
    }
    console.log("Hello " + who + "\r\n");
};
greet('Jyväskylä WordPress meetup'); // Hello Jyväskylä WordPress meetup

/**
 * JavaScriptissä funktiot on objekteja
 * - niitä voi passata muuttujina toisille funktioille
 * - voi antaa muita ominaisuuksia
 */
greet.anotherName = 'Sale';
console.log(greet.anotherName); // Sale
greet('Jyväskylä WordPress meetup'); // Hello Sale

var superGreet = function (func, name) {
    func.anotherName = name;
    func(); // Hello John Doe
}
superGreet(greet, 'John Doe');

/**
 * Primitiivistä tyyppiä oleviin muuttujiin viitataan arvon mukaan
 * eli arvo kopioituu
 *
 * Primitiiviset tyypit: number, string, boolean
 */

var age = 12;
var newAge = age;
age = 22;

console.log(age); // 22
console.log(newAge); //12

/**
 * Viittaus objekteihin tapahtuu viittauksen (by reference) mukaan
 * eli viittaus muistipaikkaan kopioituu.
 *
 * Näin käy myös silloin kun objekti passataan funktiolle!
 *
 * Näin ollen jos jossain muutetaan objektin arvoa => se muuttuu kaikkialla
 */

var sauli = {
    name: "Sauli",
    age: 34
}

var scamSauli = sauli;
scamSauli.age = 25; // Oops, this will also change sauli.age to 25!
console.log(sauli); //{name: "Sauli", age: 25}

function makeMeAnonymous(obj) {
    obj.name = "John Doe"; // Oops, this will change sauli.name to John Doe!
}

makeMeAnonymous(sauli);
console.log(sauli); // {name: "John Doe", age: 25}
