// Styles
import './../css/style.css';
//import img from '../images/back.png'; 

import { OtherInterface } from '../js/services/otherInterface'; //доп фции всякие которые засоряют место(таймеры и бордеры)

import {element} from '../js/config/UIelements';//UI элементы

import {storage, MainUItemplate} from '../js/view/markup'; //разметка сама и масив

import {Budgetdelete} from '../js/services/deleteFunc';
import {Tablo}from '../js/view/tablo';

const del = new Budgetdelete(); //класс содержит фции отвечающие за удаление
const main = new MainUItemplate(); //
const tablo = new Tablo(); //класс содержит фции отвечающие за удаление
const other = new OtherInterface(); //класс содержит фции отвечающие за удаление

//Events
element.select.addEventListener("change", other.staticBorder); //статик бордер візівается в другом файле
document.addEventListener("DOMContentLoaded", other.timer); //тайме рсрабатывает на васт документ тоже в другом файле
element.contain.addEventListener('click', controllDelete);
element.container.addEventListener("click", controll);


/**
 * @desc Function that add data that users write to storage and generate id ,after return this data from array(discribe and val) and use that create other functions
 * @callback addElem - add template to page
 */
function addNewTodoToStorage(descrip, val) {
    const newTask = {
        descrip,
        val,
        id: String(Date.now())
    };

    storage.todos.push(newTask);
    addElem(newTask);
    return storage.todos;
}

/**
 * @desc Function that call adding data to array and template after click on container and reset input data
 * @callback -generalTablo - output data to general tablo
 * @callback -addNewTodoToStorage - add data from to storage and call function that add template to page
 */
function controll() {
    addNewTodoToStorage(descrip.value, val.value);
    tablo.generalTablo()
    element.decription.value = " "; //сброс значений с инпутов при нажатии 
    element.inputNum.value = null;
}


/**
 * @desc Function that responsible for adding template to page
 * @param {Array} - current task from Array
 */
function addElem(task) {
    for (var i = 0; i < element.selectedOptions.length; i++) {
        if (element.selectedOptions[i].value == "income") { //если  нажат такой то вставляем ипут и тег бр в конец
            if (!element.description.value || !element.addValue.value) return other.alerts(), other.deleteAlert(); //сразу 2 вызываем сообщение и его удаление
            const templateIncome = main.markupLeft(task, "+");
            element.income.insertAdjacentHTML('afterbegin', templateIncome);
            storage.income.push(task);
            tablo.incomeTablo();
        } else if (element.selectedOptions[i].value == "expense") {
            if (!element.description.value || !element.addValue.value) return other.alerts(), other.deleteAlert();
            const templateExpense = main.markupLeft(task, "-");
            element.expenses.insertAdjacentHTML('afterbegin', templateExpense);
            storage.expense.push(task);
            tablo.expenseTablo();
        }
    }
}

/**
 * @desc Function that responsible for delete  from view and storage
 * @param {string} - cuttent id from storage
 */
function controllDelete(e) {
    if (e.target.classList.contains('ion-ios-close-outline')) { //тоесть еще раз делегирование клацая на родитель этого элемента мы его отловили просто проверив содержит ли текущее нажатие такой то класс(в нашем случае клас удаления для кнопки)
        let id = e.target.closest('[data-id]').dataset.id;
        del.deleteTodoFromStorage(id);
        del.deleteTodoFromIncome(id);
        del.deleteTodoFromExpense(id)
        tablo.init(); //все 3 метода вызовет сразу для инком ексенс и дженерал
        return;
    }
}
