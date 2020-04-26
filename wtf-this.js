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
        };

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
// myObj.myMethod();

// console.log(myObj.arrowFunc(5)); // 10


(
    function ($) {
        console.log(typeof this, this); // object, window
        $(document).ready(function () {
            // jQuery tekee niin, että ready eventin callback funktio
            // kiinnitetään window.document objektiin
            // eli ollaan window.document objektin metodissa
            console.log(typeof this, this); // object, window.document
            $('h1').click(function () {
                console.log(typeof this, this); // h1 DOM-elementti (objekti)

                // https://api.jquery.com/Types/#jQuery
                console.log(typeof $(this), $(this)); // jQuery objekti, $ on funktio, joka palauttaa jQuery objektin
            });
        });
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
- jQueryssä ollaan lähes aina jonkin metodin sisällä
ks. esimerkki


*/
