// Will output undefined
console.log(myVar);
var myVar = "Hello"
console.log(myVar); // Hello

// Will output error: myVar2 is not defined
// console.log(myVar2);

// How in the world can I call a function before its declared?
test();
function test() {
    var myVar3;
    console.log(myVar3);
    console.log(c)
    var c = {
        name: "Moi"
    }
}

/*
- JavaScriptissä undefined on yksi primitiivisistä tyypeistä: number, string, boolean, undefined, jne.
- undefined arvo on oletusarvo kaikille muuttujille JavaScriptissä
- undefined on seurausta hoistingista
- ennen kuin js-koodia aletaan suorittamaan rivi riviltä läpi,
    JavaScript engine lukee koodin läpi ja tallentaa muistiin funktio määritykset ja muuttujat.
    Funktiot tallennetaan muistiin kokonaisuudessaan
    Muuttujille ei aseteta arvoa (esim. myVar = "Hello" rivi suoritetaan vasta suoritusvaiheessa)
    Eli muuttujille tulee ikään kuin placeholderina undefined arvo
*/

/**
 * ES6-part
 * - var variables are function scoped
 * - let/const variables are {}-block scoped
 * - var variables gets undefined default value, let/const does not
 */

if (true) {
    var varName = "Sauli";
}
// let variable
if (true) {
    let letName = "Sauli";
}
console.log(varName);
// console.log(letName); // Uncaught ReferenceError: letName is not defined
// const constName;
// console.log(constName); // Real error, no more undefined 🎉

// let, if value change. const, if not
// Tip: always const, let if needed
const age = 19;
// age = 20; // Uncaught TypeError: Assignment to constant variable.

// You can change value of object item even in const
// Even if JS allows this, do not do it
const sale = {
    name: "Sale",
    age: 34
};

sale.age = 25;

// // Uncaught TypeError: Assignment to constant variable.
// sale = {
//     name: "Sale",
//     age: 25,
// }