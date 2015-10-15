'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/

module.exports.add = function add(name, phone, email) {
    addRecord(name, phone, email);
};

function isValidMail(email) {
    return /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-ZА-Яа-я]+([-.][0-9a-zA-ZА-Яа-я]+)*([0-9a-zA-ZА-Яа-я]*[.])[a-zA-ZА-Яа-я]{2,6}$/.test(email);
};

function isValidName(name){
    return /^[А-Яа-я\d ]{1,20}$/.test(name);
};

function isValidPhone(phone){
    return /^(((\d{1,3})|(\+\d{1,3}))[\- ]?)?(\(\d{3}\)[\- ]?)?[\d\- ]{10,13}$/.test(phone);
};

/*
   Функция поиска записи в телефонной книге.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    console.log('\nПоиск по запросу ' + query + ' :');
    phoneBook.forEach(function(element, index, array){
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
    console.log('\nПо запросу ' + query + ' kонтактов удалено: ' + count);
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var records = data.split('\n');
    var params = [];
    console.log('\nИмпорт:');
    for (var i=0;i<records.length;i++){
        params = records[i].split(';');
        addRecord(params[0],params[1],params[2]);
    }
};

function addRecord (name, phone, email){
    if (isValidPhone(phone) && isValidName(name) &&  isValidMail(email)){
        console.log(name + " " + phone + " " + email + ' Добавлено');
        var record = {
            name: name,
            phone: phone.replace(/[^\d]/gi, ''),
            email: email
        };
        phoneBook.push(record);
    } else console.log(name + " " + phone + " " + email + ' Не добавлено');
}

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {
    console.log('\nТаблица:');
    var header = '%:::::::::::::Имя::::::::::::||:::::::::::Номер::::::::::::||:::::Электронная-почта::::::%';
    var horisontalSeparator = '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%';//90
    var verticalSeparator = '%';
    console.log(horisontalSeparator);
    console.log(header);
    console.log(horisontalSeparator);
    phoneBook.forEach(function(element, index, array){
        getNiceNumber(element.phone.replace(/[^0-9]/gi, ''));
        console.log(verticalSeparator+getCell(element.name) + '||' +getCell(getNiceNumber(element.phone)) + '||' + getCell(element.email) + verticalSeparator);
        console.log(horisontalSeparator);
    });
};

function getCell(word) {
    var cell = '';
    var lengthOfCell = 28;
    var countOfHyphens =  (lengthOfCell - word.length-1) /2;
    for (var i = 0; i<countOfHyphens; i++){
        cell += '-';
    }
    cell += word;
    for ( i = 0; i<countOfHyphens; i++){
        cell += '-';
    }
    if (cell.length<lengthOfCell){
        cell += '-';
    }
    return cell;
}
function getNiceNumber(number){
    var i = number.length % 10;
    var niceNumber = '+';
    for(var j=0; j < number.length;j++){
        switch (j) {
            case i:
                niceNumber += '('+ number[j];
                break;
            case i+3:
                niceNumber += ')' + number[j];
                break;
            case i+6:
                niceNumber += '-' + number[j];
                break;
            case i+8:
                niceNumber += '-' + number[j];
                break;
            default:
                niceNumber += number[j];
        }
    }
    return niceNumber;
}
