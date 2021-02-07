var budgetModel = (function(){

var Expense = function(id,desc,value){
    this.id = id
    this.desc = desc
    this.value = value
    this.percentage = -1
}

var Income = function(id,desc,value){
    this.id = id
    this.desc = desc
    this.value = value
}

Expense.prototype.calcPercentage = function(totalInc){

    if( totalInc > 0){
        this.percentage = Math.round((this.value / totalInc)*100)
    }else{
        this.percentage = -1
    }

}

Expense.prototype.getPercentage = function(){
    return this.percentage
}

function calcPercentage(){
    data.allItems.exp.forEach(function(item){
        item.calcPercentage(data.total.inc)
    })
}

function addItem(type,desc,value){

    var newItem,lastId,id
    id = 0
    
    if(data.allItems[type].length > 0){
        lastId = data.allItems[type].length - 1
        id = data.allItems[type][lastId].id + 1
    }
    if(type === "exp"){
        newItem = new Expense(id,desc,value)
    }else{
        newItem = new Income(id,desc,value)
     }

     data.allItems[type].push(newItem)
  
     return newItem
}

function deleteItem(type , id){
    var idArr = data.allItems[type].map(function(item){
        return item.id
    })
    var index = idArr.indexOf(id)
    data.allItems[type].splice(index , 1)
}

function calculateTotalSum(type){
    sum = 0 

    data.allItems[type].forEach(function(item){
        sum = sum + parseFloat(item.value)
    })
    return sum
}

function calculateBudget(){
    data.total.exp = calculateTotalSum('exp')
    data.total.inc = calculateTotalSum('inc')
   
    data.budget = data.total.inc - data.total.exp

    if(data.total.inc > 0){
        data.percentage = Math.round((data.total.exp / data.total.inc)*100)
    }else{
        data.percentage = -1
    }

}

function getBudget(){
    return {
        budget:data.budget,
        totalExp : data.total.exp,
        totalInc : data.total.inc,
        percentage:data.percentage
    }
}

function getAllItemsPercent(){
    var allRec =  data.allItems.exp.map(function(item){
        return [item.id,item.getPercentage()]
    })
    return allRec
}

var data = {
    allItems:{
        inc:[],
        exp:[]
    },
    total:{
        inc:0,
        exp:0
    },
    budget:0,
    percentage:-1
}

return{
    addItem:addItem,
    calculateBudget:calculateBudget,
    getBudget:getBudget,
    deleteItem:deleteItem,
    calcPercentage:calcPercentage,
    getAllItemsPercent:getAllItemsPercent

   
}
})()