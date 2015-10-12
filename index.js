'use strict';

var phoneBook = require('./phoneBook');

// Добавляем записи
phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');
phoneBook.add('Сергей 2', '111 777-2-222', 'info@example.com.ru');
phoneBook.add('Олег', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
phoneBook.add('Дима', '71117772222', 'info@инфо.рф');

// Невалидные данные не должны попадать в книгу!
phoneBook.add('Честный Хрюндель', 'invalid phone', 'honest-hrundel');
phoneBook.add('Честный Хрюндель', '+34 111 777-2-222', 'info@yandex@ya.ru');
phoneBook.add('Честный Хрюндель', '+34 111 777-2-222', 'info.yandex.ru');
phoneBook.add('Честный Хрюндель', '+34 111 777-2-222', 'info@yandex');
phoneBook.add('Честный Хрюндель', '-7 (111) 777-2-222', 'info@yandex.ru');
phoneBook.add('Честный Хрюндель', '+7 (111 777-2-222', 'info@yandex.ru');
phoneBook.add('Честный Хрюндель', '-7 (111) 777-2-222', 'info@yandex.ru');
phoneBook.add('Честный Хрюндель', '+7 (111) 777%2%222', 'info@yandex.ru');
phoneBook.add('Честный Хрюндель2', 'АБС-6666', 'gs@example.com');

phoneBook.find('777');
phoneBook.find(0);
phoneBook.find(undefined);
phoneBook.find(".");
// Выводит построчно записи, все поля через запятую:
// Сергей, +7 (999) 666-7-778, gogolef@yandex-team.ru
// Олег, +7 (999) 777-7-777, just7@yandex-team.ru

phoneBook.remove('Олег');
// Выводит количество удалённых контактов, которые удовлетворят запросу:
// Удален 1 контакт

// Экспортируем записи, пример файла рядом
phoneBook.importFromCsv('./backup.csv');
// Добавлено 4 контакта

// Выводит записи в виде красивой таблички
phoneBook.showTable();
// Выводит
// ┌─────────────┬────────────────────╥──────────────────┐
// │ Имя         │ Телефон            ║ email            │
// ├─────────────┼────────────────────╫──────────────────┤
// │ Сергей      │ +7 (999) 666-77-78 ║ gs@example.com   │
// │ Сергей 2    │ +7 (999) 443-34-44 ║ gs@example.com   │
// └─────────────┴────────────────────╨──────────────────┘

