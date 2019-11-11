//lista med redan inlagda uppgifter
let myTasks = [
    {id: Date.now(),text:'skapa todo-list', date:'2019-11-07', cat:'Studier'},
    {id: Date.now()+1,text:'klipp klorna på katten', date:'2019-11-05', cat:'Husdjur'},
    {id: Date.now()+2,text:'köp julgran', date:'2019-12-20', cat:'Hem'}
]

//DOM-elementen
const taskInput = document.querySelector('#task')
const date = document.querySelector('#date')
date.valueAsDate = new Date()
const category = document.querySelector('#category')
const submit = document.querySelector('#submit')
const filtertext = document.querySelector('#filtertext')
const categoryBtns = document.querySelectorAll('.radio') 
const tasklist = document.querySelector('#tasklist')

//första anrop
drawList()

//att-göra-listan, här ritar vi och sätter DOM-element
function drawList(){
    tasklist.innerHTML = ''
    const filteredList = filterText(filterCat())

    filteredList.forEach(function(item){
        const li = document.createElement('li')
        const text = document.createElement('span')
        text.textContent = item.text
        text.classList.add('task')
        const date = document.createElement('span')
        date.textContent = item.date
        date.classList.add('date')
        if(checkDate(item)){
            date.classList.add('expired')
        }
        const cat = document.createElement('span')
        cat.textContent = item.cat
        cat.classList.add('category')
        const del = document.createElement('button')
        del.textContent = '❌'
        del.classList.add('delete')
        del.dataset.taskID = item.id
        del.addEventListener('click', deleteTask)
        
        li.appendChild(text)
        li.appendChild(date)
        li.appendChild(cat)
        li.appendChild(del)

        tasklist.appendChild(li)
    })
}

//eventListeners
submit.addEventListener('submit', addTask)
filtertext.addEventListener('input', drawList)
for(let i=0; i<categoryBtns.length; i++){
    categoryBtns[i].addEventListener('click', drawList)
}

//lägg till todo/task i listan
function addTask(event){
    event.preventDefault()
    
    const newTask = 
        {id: Date.now(),
        text: taskInput.value,
        date: date.value,
        cat: mapCategory(category.value)}

    myTasks.push(newTask)
    taskInput.value = ''
    date.valueAsDate = new Date()
    drawList()    
}

//mappning selectbox value/text
function mapCategory(prop){
    const categories = {
        study: 'Studier',
        home: 'Hem',
        pets: 'Husdjur'
    }
    return categories[prop]  
}
    
//ta bort todo/task från listan
function deleteTask(event){
    const taskID = parseInt(event.currentTarget.dataset.taskID)
    const removedTasks = myTasks.filter(function(item){
        const itemID = item.id
        return itemID !== taskID
    })
    myTasks = removedTasks
    drawList()
}

//filtrera att-göra-listan på kategori(radiobutton)
function filterCat(){
    const checkedBtn = document.querySelector('input[name="ctgbtn"]:checked')
    if(checkedBtn.id !== 'Alla'){
    const categoryTasks = myTasks.filter(function(item){
            if (item.cat === checkedBtn.id){
                return item
            }
        })
        return categoryTasks
    }
    else{
        return myTasks
    }
}

//filtrera att-göra-listan på fritext, får in en array från filterCat
function filterText(preFilteredTasks){
    const searchStr = filtertext.value.toLowerCase()
    const filteredTasks = preFilteredTasks.filter(function(item){
        return item.text.toLowerCase().includes(searchStr)
    })
    return filteredTasks
}

//bevaka slutdatum
function checkDate(item){
    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(), now.getDate())
    const d = new Date(item.date)
    if(d < today){
       return true
    }
    else{
        return false
    }       
}