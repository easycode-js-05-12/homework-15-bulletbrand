export let storage = {
    todos: [],
    income: [],
    expense: []
};
export class MainUItemplate {


    markupLeft(task, item) {
        console.log(task);
        return `
    <div class="item clearfix" data-id="${task.id}">
    <div class="item__description">${task.descrip}</div>
    <div class="right clearfix">
        <div class="item__value">${item}${Number(task.val).toFixed(2)}</div>
        <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>
</div>    `
    }
}


