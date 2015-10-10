'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/

module.exports.add = function add(name, phone, email) {
    if (isValidPhone(phone) && isValidName(name) &&  isValidMail(email)){
        var record = {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(record);
    } else console.log(name + " " + phone + " " + email + " Не добавлено");
};

function isValidMail(email) {
    return /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/.test(email);
};

function isValidName(name){
    return /^[А-Яа-я\d ]{1,20}$/.test(name);
};

function isValidPhone(phone){
    return /^(((\d{1,3})|(\+\d{1,3}))[\- ]?)?(\(\d{3}\)[\- ]?)?[\d\- ]{7,11}$/.test(phone);//((\+7|8)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d \-]{7,9}
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    phoneBook.forEach(function(element, index, array){
        //var name = element.name;
        if (element.name.indexOf(query) > -1 || element.phone.indexOf(query) > -1 || element.email.indexOf(query) > -1 ){
            console.log(element.name + ", " + element.phone + ", " + element.email);
        }

    });
};
/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var count = 0;
    phoneBook.forEach(function(element, index, array){
        if (element.name.indexOf(query) > -1 || element.phone.indexOf(query) > -1 || element.email.indexOf(query) > -1 ){
            array.slice(index, 1);
            count++;
        }
    });
    console.log("Контактов удалено:" + count);
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var records = data.split('\n');
    var params=[];console.log("\nИмпорт:");
    for (var i=0;i<records.length;i++){
        params = records[i].split(';');
        if (isValidName(params[0]) && isValidPhone(params[1]) &&  isValidMail(params[2])){
            console.log('Запись ' + params + ' добавлена.');
            var record = {
                name: params[0],
                phone: params[1],
                email: params[2]
            };
        }
        phoneBook.push(record);
    }
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    console.log("\nТАБЛИЦА:");
    var params = [];
    var horisontalSeparator = "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%";//90
    var verticalSeparator = "%";
    console.log(horisontalSeparator);
    phoneBook.forEach(function(element, index, array){
        console.log(verticalSeparator+getCell(element.name) + '||' +getCell(element.phone.replace(/[^0-9^\+]/gi, '')) + '||' + getCell(element.email) + verticalSeparator);
        console.log(horisontalSeparator);
    });
};

function getCell(word) {
    var cell = '';
    var lengthOfCell = 28;
    var countOfHyphens =  (lengthOfCell - word.length-1) /2;
    for (var i=0; i<countOfHyphens; i++){
        cell += '-';
    }
    cell+=word;
    for (var i=0; i<countOfHyphens; i++){
        cell += '-';
    }
    if (cell.length<lengthOfCell){
        cell+= '-';
    }
    return cell;
}
