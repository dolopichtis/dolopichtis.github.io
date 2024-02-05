const dbGraber = document.querySelector('#db');
const textGraber = document.querySelector('#text');
let db;
let secondDB;
const print = document.querySelector('#print');
const print2wordBase = document.querySelector('#print2wdb');
dbGraber.addEventListener('change', (event) => {db = makeDB(event.currentTarget.value);
        secondDB = makeTwoDB(event.currentTarget.value);
});
textGraber.addEventListener('change', (event) => { 
        if (db !== undefined) {
                print.innerHTML = db(event.currentTarget.value);
                print2wordBase.innerHTML = secondDB(event.currentTarget.value);
        } else {
                print.innerHTML = 'create a db first';
        }
});

function makeDB (text) {
        const rawDataArray = text.split(/\r?\n/);
        const uncommentedData = rawDataArray.filter( (item) => { return (item.length > 0 && item.charAt(0) != '#') } );
        //const uData = uncommentedData.map(removeHash);
        const tokenizedData = uncommentedData.map(tokenize);
        const sortedData = tokenizedData.sort( (item1, item2) => { return item2.population - item1.population; } );
        const bestTen = sortedData.slice(0, 10);
        const dbItem = {};
        const db = bestTen.reduce(makeDB,dbItem);
        alert('A new DB was created'); 
        return (string) => {
                Object.keys(db).map( 
                        (city) => {
                                string = string.replaceAll(city, `${city} (${db[city].rate} place in the TOP-10 of towns in the Ukraine, its population is ${db[city].population} ${db[city].population % 10 === 1 ? 'ludyna' : db[city].population % 10 < 5 && db[city].population % 10 > 0  ? 'ludyny' : 'ludey'})`)
                        });
                return string;
        }
        //}
        function tokenize(data) {
                const token = {};
                const items = data.split(',');
                token.name = items[2];
                token.population = items[3];
                return token;
        }
        function removeHash(item) {
                return item = item.replace('#','');
        }
        function makeDB(result, item, rateIndex) {
                let itemName = item.name;
                let itemProperties = {population: item.population, rate: rateIndex + 1};
                result[itemName] = itemProperties;
                return result;
        }
}
function makeTwoDB(text) {
        const rawDataArray = text.split(/\r?\n/);
        const uncommentedData = rawDataArray.filter( (item) => { return (item.length > 0 && item.charAt(0) != '#') } );
        //const uData = uncommentedData.map(removeHash);
        const tokenizedData = uncommentedData.map(tokenize);
        const sortedData = tokenizedData.sort( (item1, item2) => { return item2.population - item1.population; } );
        const bestTen = sortedData.slice(0, 10);
        const dbItem = {};
        const db = bestTen.reduce(makeDB,dbItem);
        const db2w = Object.keys(db).reduce(make2wdb, {});
        console.log(db2w);
        alert('A new DB was created with more that one-word keys'); 
        return (string) => {
                //if single-word city names only - it is faster and works quickly with a long db
                const stringArray = string.split(' ');
                console.log(stringArray);
                const newStringArray = stringArray.map((word) => {
                        return Object.keys(db).includes(word) ? 
                                `${word} have (${db[word].rate} place [the sentence was created by searching a single-word of the entered String in the DB] in the TOP-10 of towns in the Ukraine, its population is ${db[word].population} ${db[word].population % 10 === 1 ? 'ludyna'
                                                : db[word].population % 10 < 5 && db[word].population % 10 > 0  ? 'ludyny' 
                                                : 'ludey'})`
                                : word;
                });
                let newString = newStringArray.join(' ');



                Object.keys(db2w).map( 
                        (city) => {
                                newString = newString.replaceAll(city, `${city} (${db2w[city].rate} place [the sentence was created by searching a more-than-one-word key of the DB in the entered String] in the TOP-10 of towns in the Ukraine, its population is ${db2w[city].population} ${db2w[city].population % 10 === 1 ? 'ludyna' : db2w[city].population % 10 < 5 && db2w[city].population % 10 > 0  ? 'ludyny' : 'ludey'})`)
                        });
                return newString;
        }
        function make2wdb(result, key){
                if (key.includes(' ')){
                        let itemName = key;
                        let itemProperties = {population: db[key].population, rate: db[key].rate};
                        result[itemName] = itemProperties;
                }
                return result;
        }
        function tokenize(data) {
                const token = {};
                const items = data.split(',');
                token.name = items[2];
                token.population = items[3];
                return token;
        }
        function removeHash(item) {
                return item = item.replace('#','');
        }
        function makeDB(result, item, rateIndex) {
                let itemName = item.name;
                let itemProperties = {population: item.population, rate: rateIndex + 1};
                result[itemName] = itemProperties;
                return result;
        }
}
