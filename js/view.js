var budgetView = (function(){
    var DOMelem = {
       type:"#input__type",
       desc:"#input__description",
       value:"#input__value",
       form:"#budget-form",
       incomeList : "#income__list",
       expenseList : "#expenses__list",
       budget : "#budget-value",
       sumExpense : "#sum-expense",
       sumIncome : "#sum-income",
       percent : "#percent",
       budgetTable:"#budget-table",
       monthLabel:"#month",
       yearLabel:"#year"
    }
    

    function getInput(){
        return {
            type:document.querySelector(DOMelem.type).value,
            desc:document.querySelector(DOMelem.desc).value,
            value:document.querySelector(DOMelem.value).value
        }
    }

    function renderListItem(obj , type){
        var html,containerElement,newHtml
        if(type ==="inc"){
            containerElement = DOMelem.incomeList
          html = `<li id="inc-%id%" class="budget-list__item item item--income">
            <div class="item__title">%desc%</div>
            <div class="item__right">
                <div class="item__amount">%value%</div>
                <button class="item__remove">
                    <img
                        src="./img/circle-green.svg"
                        alt="delete"
                    />
                </button>
            </div>
            </li>`
            
        }else{
            containerElement = DOMelem.expenseList
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
            <div class="item__title">%desc%</div>
            <div class="item__right">
                <div class="item__amount">
                %value%
                    <div class="item__badge">
                        <div class="item-percent badge badge--dark">
                            15%
                        </div>
                    </div>
                </div>
                <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                </button>
            </div>
        </li>`
        }
        

        newHtml = html.replace("%id%" , obj.id )
        newHtml = newHtml.replace("%desc%" ,obj.desc )
        newHtml = newHtml.replace("%value%" , formatNumber(obj.value , type) )


        document.querySelector(containerElement).insertAdjacentHTML('beforeend' , newHtml)
    }

    function clearFields(){
        var inputDesc = document.querySelector(DOMelem.desc)
        var inputValue = document.querySelector(DOMelem.value)
        inputDesc.value =" "
        inputDesc.focus()
        inputValue.value = " "
    }

    function updateBudget(obj){
        var type


        if(obj.totalInc > obj.totalExp){
            type = "inc"
        }else{
            type = "exp"
        }
        document.querySelector(DOMelem.budget).innerHTML = formatNumber(obj.budget , type) 
        document.querySelector(DOMelem.sumIncome).innerHTML = formatNumber(obj.totalInc , "inc") 
        document.querySelector(DOMelem.sumExpense).innerHTML = formatNumber(obj.totalExp , "exp")  

        if(obj.percentage === -1){
            document.querySelector(DOMelem.percent).innerHTML = "--"
        }else{
             document.querySelector(DOMelem.percent).innerHTML = obj.percentage
            
        }


    }

    function deleteListItem(itemId){
        document.getElementById(itemId).remove()
    }

    function updateItemsPercentage(items){

        items.forEach(function(item){
            var element = document.getElementById(`exp-${item[0]}`).querySelector('.item-percent')

            if(item[1] >= 0){

                element.parentElement.style.display = "block"

                element.innerHTML = item[1] + ' %'

            }else{
                
                element.parentElement.style.display = "none"
            }

        })

    }

    function formatNumber(num , type){
        var numSplit,int,dec,newInt,resultNum

        num = Math.abs(num)

        num = num.toFixed(2)
        
        numSplit = num.split(".")

        int = numSplit[0]

        dec = numSplit[1]
       
        if(int.length > 3 ){
            newInt = ""
            for(var i = 0 ; i < int.length / 3; i++ ){
                newInt = "," +  int.substring(int.length - 3 * (i + 1) , int.length - i * 3 ) + newInt
            }
            if(newInt[0] === ","){
                newInt = newInt.substring(1)
            }
            
        }else if (int === "0"){
            newInt = "0"
        }else{
            newInt = int
        }

        resultNum = newInt + "." + dec

        if(type === "exp"){
            resultNum = "-" + resultNum
        }else{
            resultNum = "+" + resultNum
        }

        return resultNum
    }

    function displayMonth(){
        var now,year,month,monthArr
        now = new Date()
        year = now.getFullYear()
        month = now.getMonth()
        monthArr = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь", ]
        
        document.querySelector(DOMelem.monthLabel).innerText = monthArr[month]
        document.querySelector(DOMelem.yearLabel).innerText = year


    }




    return{
        getInput:getInput,
        renderListItem:renderListItem,
        clearFields :clearFields,
        updateBudget:updateBudget,
        deleteListItem:deleteListItem,
        updateItemsPercentage:updateItemsPercentage,
        displayMonth:displayMonth,
        test(){
console.log(data)
        },
        getDOMelem(){
            return DOMelem
        }
    }
    
})()