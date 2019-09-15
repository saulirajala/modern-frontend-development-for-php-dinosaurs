// Traditional way
function foo($arg_1, $arg_2) {
    console.log($arg_1 + ' ' + $arg_2 + "\n");
}
foo("moi", "hei");

const hei = "Moi";

// Anonymous function variable assignment
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
    greet.anotherName = name;
    func(); // Hello John Doe
}
superGreet(greet, 'John Doe');

/**
 * IIFE: Immediately Invoked Function Expression
 * - Funktio, joka suoritetaan välittömästi
 * - muuttujat ja funktiot ovat käytettävissä vain IIFE:n sisällä
 * - hyvä keino välttää muuttujien ja funktioiden ylikirjoittaminen
 */
(function (name) {

    var helloing = 'Inside IIFE: Hello';
    console.log(helloing + ' ' + name);

    function foo() {
        console.log('Yet another foo function');
    }
    foo();

}('Sale'));
/*
Tämä ylikirjoittaisi tiedoston alussa olevan foo-funktion määrityksen
function foo() {
    console.log('Yet another foo function');
}
*/
// Tässä ei kutsuta IIFE:n sisällä olevaa foo() vaan tiedoston alussa olevaa foo()
foo("moi", "hei");
