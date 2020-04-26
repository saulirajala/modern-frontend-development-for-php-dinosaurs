# Modern frontend development for PHP(&WP)-dinosaurs

Jyväskylä WordPress Meetup 17.9.19

Esitys: [https://docs.google.com/presentation/d/1iHMioLLb3Xr1LG48NQcroD9HdByAw7WtBuiKC-Xnf4k/edit?usp=sharing](https://docs.google.com/presentation/d/1iHMioLLb3Xr1LG48NQcroD9HdByAw7WtBuiKC-Xnf4k/edit?usp=sharing)

# 1. You don't know JavaScript
- Moderni JS on edelleen JS:ää päivän päätteeksi
- Siitä ei pääse mihinkään, että jos et ymmärrä JS:ää, niin sulla tulee vaikeuksia modernin JS:n kanssa
- ES6 ei oo mikään uusi ohjelmointikieli vaan syntaksisia uutuuksia vanhaan kieleen
- JS on ohjelmointikieli
- suoritusympäristö (selain, node)
    - JS koodin suorittaminen vaatii oman suoritusympäristön eli
    - jonku toisen tietokoneohjelman mikä tulkitsee sun kirjoittamaa JS-koodia ja kertoo jollekin toiselle tietokone ohjelmalle että mitä sen pitäis tehdä
- Synkroninen kieli (pääsääntöisesti)
    - eli oletuksena suoritus etenee rivi riviltä ylhäältä alas ellei me itse tehdä jotain jännää siinä välissä
- Löyhästi eli dynaamisesti tyypitetty kieli
    - kielessä on omia tyyppejään string, number, boolean, object, jne.
    - muuttujan tyyppi voi kuitenkin muuttua ajon aikana
    - esim. muuttujaan joka on alustettu booleaniksi voidaan sijoittaa esim. merkkijono eikä kukaan valita asiasta
- Tätä listaa kun katsoo niin kuulostaa oikeastaan aika tutulta
    - Aika PHP:maiselta
    - PHP:lla on oma suoritusympäristönsä Zend engine, mikä tulkitsee PHP koodin
    - PHP on vielä enemmän synroninen kieli
    - PHP on löyhästi tyypitetty kieli
- Mutta nyt kun olen saanut riittävissä määrin teidän huomion väittämällä jotain niinkin törkeää kuin että JS ≈ PHP, niin voin todeta että onhan niissä kyllä sitten taas eroavaisuuksia
- JS:ssä on omat jännät ominaisuutensa
    - this muuttuja: wtf-this.js
    - undefined vai null: variable-value.js
    - oudot funktiot ja objektit: weird-objects.js
- ennen kuin mennään modernin JS-kehittämisen termistöön, niin otetaan lyhyet koodiesimerkit näistä

# 2. Avainsanat
Kaikki mitä tähän mennessä on käyty läpi on sitä vanhaa JavaScriptiä. Mutta niin kuin aiemmin sanoin, moderni JavaScriptiä on edelleen JavaScriptiä

Nyt mennään modernin JavaSriptin muotisanoihin eli niihin yleisiin termeihin, mihin yleensä viitataan vaan ohi mennen eikä tarkemmin selitetä mistä on kyse

## Node.js

- JavaScript runtime, joka on rakennettu Chromen V8 JavaScript Enginen päälle
- Eli sama engine mikä tulkitsee JS-koodia, tulkitsee sitä myös nodessa
- keino suorittaa JS-koodia palvelimella (ei selaimessa)
- globaali objekti on nyt eri => `node node-global.js`
- esim. `node weird-objects.js` toimii kuten ko. tiedoston ajaisi selaimessa
- ei `window`

## NPM

- Node Package Manager
- wordpress.org/plugins JavaScript kirjastoille
- JavaScript kirjastot ovat koodi, jotka tavalla tai toisella helpottavat JS-koodin kirjoittamista
    - on sitten kyse selaimessa ajettavasta js-koodista tai esim. node ympäristössä
- esimerkkejä kirjastoista: jQuery, React, underscore, gulp, webpack
- asentuu tietokoneelle node.js:n mukana
- lisää komentoriville `npm` komennon
- `npx`: voi suorittaa suoraan npm pakettien binääritiedostoja => palataan babelissa tähän
- luodaan uusi npm projekti `npm init --yes` => syntyy package.json

## package.json
- JSON-objektissa on määritetty yleisiä ja tarkempia kuvauksia tästä projektista
- Tällä hetkellä package.jsonissa meitä kiinnostaa vain `scripts`-osio
    - näitä skriptejä voi ajaa `npm run <SKRIPTI>` komennolla
    => Kirjoitetaan oma `npm run moikka`
- `npm install dayjs` => asentaa day.js JS-kirjaston ja lisää tästä merkinnän `package.json` depencies osioon. Oletuksena js-paketit asennetaan as production depencies
- `npm install webpack --save-dev` => asentaa webpack JS-kirjaston ja lisää tästä merkinnän `package.json` devDepencies osioon, koska --save-dev
- versionti noudattaa semanttista versiointia.
    - 4.40.2 => 4 major versio, 40 minor versio ja 2 patches (bug fixes)
    - "^"-merkki alussa viittaa siihen, että major on fiksattu. Esim. ^4.40.2 viittaa siihen, että npm asentaa uusimman major version 4.X.X
    - "~"-merkki alussa viittaa siihen, että minor on fiksattu. Esim. ~4.40.2 viittaa siihen, että npm asentaa uusimman minor version 4.40.X
- paketit asennettiin `node_modules`-kansioon
- depencies ja devdepencies osiota tarvitaan silloin, kun projekti siirtyy toiselle tietokoneelle. Esim. joku teistä haluaisi tulla mukaan tähän projektiin, jolloin hänelle pitää saada asennettua samat versiot dayjs ja webpack paketeista => ei tarvitse ajaa kuin `npm install`
- `node_modules` kansio kasvaa yleensä isoihin mittasuhteisiin, koska js-paketeilla on omat riippuvuuteensa, joilla on omat riippuvuutensa, joilla on omat riippuvuutensa, jne.

## package-lock.json
- Ongelma: devaaja 1 tekee projektin ja asentaa siihen dayjs-kirjaston. package.jsoniin versio numeroksi tulee ^1.8.15
    - dayjs-kirjaston kehittäjät julkaisevat uuden version
    - devaaja 2 tulee mukaan projektiin ja ajaa `npm install` => dayjs-kirjastosta tulee version 1.8.16
    - devaaja 1 ja devaaja 2 on eri versiot samasta kirjastosta, mikä voi aiheuttaa ongelmia
- package-lock.json on ratkaisu tähän ongelmaan
- package-lockiin tulee kiinteä versionumero. Esim. dayjs:n osalta 1.8.15
- Kun devaaja 2 ajaa `npm install` npm katsoo package-lockin tietoja ja asentaa 1.8.15 version
- package-lock.json tulisi olla mukana gitissä
- package-lock.json päivittyy kun asennetaan uusi paketti (uuden paketin osalta) tai ajetaan `npm install` sen jälkeen, kun package.json on päivitetty (esim. versionumeroa nostettu)
- `npm ci` poistaa `node_modules` kansion ja asentaa js-kirjastot package-lockin perusteella => ei modifioi package-lockkia

## ES6
- ES6 (ECMAScript 2015) on suurimmalti osin vain uusi syntaksi vanhoille JS-ominaisuuksille
    - ECMAScript on kielen standardin nimi ja tarkoittaa suunnilleen samaa kuin JavaScript, mikä on yleisesti käytössä business kentällä (kukaan ei hae töihin ECMAScript koodaajaa)
    - esim. ES5 versiossa luokkien luominen oli mahdollista, ES6 tuo vain loogisemman `class` avainsanan siihen
    - jonkin verran ES6 tuo myös uusia toimintoja JavaScriptiin (esim. import/export tai String.includes() )
- Modernit selaimet ymmärtää jo aika hyvin ES6-versiota JavaScriptistä, IE11 on kivi kengässä
    - https://caniuse.com/#search=es6
- arrow functions, class, let/const, template strings, spread&rest, destructuring, shorthand objects, import/export
- arrow functions: wtf-this.js ja myObj, koska this muuttuu => ei voi vaan sokeana lähteä muuttamaan funktioita arrow funktioiksi
- let/const: variable-value.js, koska hoistaus ja scope
- template literals: Human.js
- class: Human.js
- destructuring: main.js
- shorthand objects: main.js
- import/export: Human.js

## Babel
- JS-kirjasto, joka on tarkoitettu ajettavaksi Nodessa
- kääntäjä eli se kääntää ES6 syntaksin ES5 syntaksiin (tai esim. Reactin JSX syntaksin ES5 syntaksiin)
- Oletuksena Babel ei tee mitään vaan kaikki työ tapahtuu plugarien kautta
    - plugins: https://babeljs.io/docs/en/plugins
    - koska plugareita on niin paljon, niin Babelin porukka on kerännyt yleisimmät plugarit presetteihin: https://babeljs.io/docs/en/presets
- preset-env on se mitä tarvitaan ES6 => ES5 muutoksessa
- preset-react tarvitaan, jos kirjoittaa Reactia

## Polyfill
- Eli Babelilla käännetään ES6 syntaksi ES5 syntaksiin
- mutta ES6 tuo mukanaan myös uusia funktioita. Niitä ei voi vaan kääntää ES5 syntaksiin vaan pitää implementoida funktion toiminta ES5-versiolla
- Tätä varten tulee polyfillit
- Esim. String.includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
    - eli jos selaimen JS engine ei vielä ymmärrä esim. includes() funktiota, polyfillaus tarkoittaa sitä, että ko. funktio kirjoitetaan automaattisesti uudestaan niin, että vanhemmat selaimet ymmärtää

## Webpack
- Module bundler eli moduulien niputtaja
- webpackilla tehdään kaikenlaista tänä päivänä ja siksi webpack vaikuttaa yleensä varsin monimutkaiselta
- webpackin perusperiaate on kuitenkin yksinkertainen
    - otetaan kasa js-tiedostoja ja niputetaan yhteen js-filuun
- entries: mikä on input eli mitä js-filuja pitäis lähteä niputtamaan?
- output: mikä on output eli mihin tiedostoon niputetaan?
- loaders: mitä tapahtuu inputin ja outputin välillä?
    - esim. babel-loader muuttaa ES6 => ES5
- plugins: mitä tapahtuu outputin jälkeen?
    - esim. HotModuleReplacementPlugin, mikä päivittää sivun selaimessa ilman sivun täyttä uudelleenlatausta

## Prettier + eslint
- Prettier on JS-kirjasto, joka muotoilee koodin automaattisesti tiettyjen sääntöjen mukaan
    - konfigurointi vaihtoehdot ovat erittäin rajalliset
- eslint on JS-kirjasto, joka tarkistaa koodin laadun ja valittaa esim. turhista muuttujista
    - eslintiä pystyy konfiguroimaan enemmän
- joskus prettier konfliktoi eslint sääntöjen kanssa ja siksi yleensä asennetaan myös eslint-config-prettier, mikä mahdollistaa sen, että prettier jyrää eslintin säännöt
- Millaisia muutoksia prettier tekee:

```
const name = 'Sauli';
if( name ) {
  console.log( "Moikka" )
}
```

```
const name = "Sauli";
if(name) {
    console.log("Moikka");
}
```

- millaisista virheistä eslint valittaa:

```
// Identifier '$arg_1' is not in camel case
const $arg_1 = "moikka";
console.log($arg_1);

// 'Hello' is assigned a value but never used
const thisVarIsNeverUsed = "Hello"

//Expected '===' and instead saw '=='
if (name == "Sale") {
    // Do something
}

```

### Installation and configuration

1. Asenna tarvittavat npm paketit:
`npm install core-js && npm install --save-dev @babel/core @babel/cli @babel/preset-env webpack webpack-cli babel-loader prettier eslint eslint-config-prettier @wordpress/eslint-plugin`

2. Lisää tarvittavat konfiguraatio tiedostot

    a) `.babelrc`: kerrot Babelille mitä plugareita/presettejä sen pitää käyttää

    b) `webpack.config.js`: kerrot webpackille mitä sen pitää tehdä

    c) `.prettierrc`: kerrot Prettierille säännöt, joiden mukaan se formatoi koodia

    d) `.eslintrc`: kerrot ESLintille säännöt, joiden mukaan se tarkistaa koodin laadun
    - esim. WP:llä on omansa https://www.npmjs.com/package/@wordpress/eslint-plugin

3. Lisää package.json
```
scripts: {
    …
    "watch": "npx webpack --watch",
    "dev": "npx webpack --mode development",
    "build": "npx webpack --mode production",
    …
}
"browserslist": "last 2 version, not dead",
```

- browserslists on JS-kirjasto, mitä Babel käyttää
    - `npx browserslist` komennolla näet mitä selaimia yo. määritykseen kuuluu

`npx`-komennolla voi suorittaa suoraan npm pakettien binääritiedostoja. Mitä ne binääritiedostot on?
    - node_modules/.bin kansiossa olevat npm paketit
    - `node node_modules/.bin/browserslist`
    - `npx babel variable-value.js` => const/let muuttuu var
    - `npx babel Human.js` => class muuttuu funktioksi, mutta includes() ei tehdä mitään

4. importtaa core-js projektiin (polyfill)
`import "core-js";`

5. Aja webpack:
```bash
# Käynnistää webpackin watch moodissa eli
# watchaa js-filujen muutoksia ja pyöräyttää webpackin läpi, jos jotain muuttuu
npm run watch

# Pyöräyttää webpackin läpi siten, että mode on development
npm run dev

# Pyöräyttää webpackin läpi siten, että mode on production
# Eli js-koodiin tehdään tiettyjä optimointeja (mm. minifointi)
npm run build
```


6. Testaa prettier ja eslint
```bash
npx prettier --check "./*.js"
npx eslint functions.js
```

7. Integroi prettier ja eslint osaksi koodieditoria ja/tai buildaus prosessia
    - esim. meillä Valulla buildauksen yhteydessä ajetaan sekä prettier että eslint tarkistukset ja jos failaa => ei mee tuotantoon
    - Koodieditoriin olen asettanut, että prettier ajetaan aina kun tallennan js-koodia ja editori tekee eslint tarkistuksia on-the-fly


# Bonus
https://twitter.com/MrAhmadAwais/status/1173598977830338560
````js
// What is happening here?
const shuffle = array => array.sort(()=> 0.5 - Math.random());
export default shuffle;
```
