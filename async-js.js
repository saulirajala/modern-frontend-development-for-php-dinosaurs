(
    function ($) {
        $("document").ready(function () {
            /**
             * This will fail
             */
            var myResponse = $.ajax({
                url: 'my-awesome-api.test',
            });
            // JavaScript engine ei jää odottamaan ajax kutsua
            // vaan lähettää kutsun matkaan ja jatkaa suoritustaan seuraavaan riviin
            // tästä syystä response = undefined
            console.log(myResponse);


            /**
             * Tämä toimii
             */
            $.ajax('my-awesome-api.test')
                .done(function (response) {
                    // Tämä funktio on ns. callback funktio eli funktio, jota ei suoriteta heti tässä ja nyt
                    // vaan vasta sitten kun tapahtuma X tapahtuu
                    // tapahtuma X on tässä tapauksessa se, että ajax-pyyntö suoritetaan loppuun
                    console.log(response);
                });
        })
    }
)(jQuery);

/*
Asynkroninen JS – just like life
- samaan aikaan tapahtuu useampia asioita
- komennon loppumista ei jäädä odottamaan vaan suoritus etenee
- jos käsken jotain hakemaan mulle vettä, esitys ei stoppaa siksi aikaa kun pyyntö on suoritettu
- tyypillisiä asynkronisia js-funktioita: ajax(), fetch(), setTimeout(), addEventListener(), …
*/