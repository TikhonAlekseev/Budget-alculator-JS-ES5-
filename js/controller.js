var budgetCtrl = (function(budgetModel , budgetView){
    
    var DOM = budgetView.getDOMelem()
    document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)
    document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem)
    budgetView.displayMonth()
    updateBudget()

    function updatePercentage(){
        budgetModel.calcPercentage()
        var idAndPercentsItems = budgetModel.getAllItemsPercent()
        budgetView.updateItemsPercentage(idAndPercentsItems)

    }

    function ctrlDeleteItem(e){
        if(e.target.closest(".item__remove")){
           var itemID =  e.target.closest(".budget-list__item").id
           var splitId = itemID.split("-")
           var type = splitId[0]
           var ID = parseInt(splitId[1])

           budgetModel.deleteItem(type,ID)
           budgetView.deleteListItem(itemID)
           updateBudget()
        }
    }
    function ctrlAddItem(e){
        e.preventDefault()
        var dataItem = budgetView.getInput()

        if(dataItem.desc !== "" && !isNaN(dataItem.value)  && dataItem.value > 0 ){
            var newItem = budgetModel.addItem(dataItem.type,dataItem.desc,dataItem.value)
            budgetView.renderListItem(newItem , dataItem.type)
            budgetView.clearFields()
        }
        updateBudget()
    }

    function updateBudget(){
        budgetModel.calculateBudget()
        var budgetResult = budgetModel.getBudget()
        budgetView.updateBudget(budgetResult)
        updatePercentage()

        
    }



})(budgetModel,budgetView)