// funktio
var myFunc = function () {
    console.log(this); // window
};

// objekti
var myObj = {
    name: "Lorem",
    myMethod: function () {
        //metodi
        console.log("this inside of method", this); // myObj

        // funktio metodin sisällä
        var foo = function () {
            console.log(this); // window. Tätä pidetään yleisesti JS:n bugina
        }

        // Arrow function
        // var foo = () => {
        //     console.log(this); // myObj
        // }

        foo();
    },
    // arrow function with just return
    // or even x => x + 5
    arrowFunc: (x) => { return x + 5 },
};
myObj.myMethod();

console.log(myObj.arrowFunc(5)); // 10


(
    function ($) {
        console.log(this); // window
        $("document").ready(function () {
            // window.document eli jQueryn täytyy tehdä niin ready eventin callback funktio on
            // kiinnitety objektiin, joka on sama kuin window.document
            // eli ollaan window.document objektin metodissa
            console.log(this);
            $('h1').click(function () {
                console.log(this) // h1 DOM-elementti
                console.log($(this)) // jQuery objekti, $ on funktio, joka palauttaa jQuery objektin
            })
        })
    }
)(jQuery);


/*
JavaScript engine luo kaksi muuttujaa ennen kuin koodia suoritetaan:
- Global Object (window selaimessa)
- this muuttuja this = window

this:
===
- this arvo on lähestulkoon aina globaalin objektin arvo eli this === window
- Paitsi jos this on metodin sisällä, niin this viittaa objektiin.
- Mikä ero on metodilla ja funktiolla? Metodi on yksi objektin item, funktio elää "itsenäisenä"

jQuery ja this
==========
ks. esimerkki


*/