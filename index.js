const checkBoxlist =  document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorMessage = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue =  document.querySelector('.progress-value')
const reset = document.querySelector('.reset')

const allQuates = [
    'Raise the bar by comleting your goals!',
    'well begun is half don!e',
    'just a step away, keep going!',
    'WoW! You just completed all the goals, time for chill :)',
]


const allGoals = JSON.parse(localStorage.getItem('allGoles')) || {
    first:{
       name:'',
       completed:false,
    },
     second:{
       name:'',
       completed:false,
    },
    third:{
       name:'',
       completed:false,
    }
}
let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressLabel.textContent = allQuates[completedGoalCount]
progressValue.style.width = `${completedGoalCount / 3 * 100}%`
progressValue.firstElementChild.textContent = `${completedGoalCount}/3 completed`


checkBoxlist.forEach((checkBox)=>{
    checkBox.addEventListener('click',(e) =>{
        const allFieldFilled = [...inputFields].every((input)=>{
         return input.value
        })

        console.log(allFieldFilled)

        if(allFieldFilled == true){
          checkBox.parentElement.classList.toggle('completed')
          const inputId = checkBox.nextElementSibling.id
          allGoals[inputId].completed = !allGoals[inputId].completed
          completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
          progressValue.style.width = `${completedGoalCount / 3 * 100}%`
          progressValue.firstElementChild.textContent = `${completedGoalCount}/3 completed`
          progressLabel.textContent = allQuates[completedGoalCount]
          localStorage.setItem('allGoles',JSON.stringify(allGoals))
        }else{
            progressBar.classList.add('show-error')
        }
    })
})



inputFields.forEach((input)=>{
    input.value = allGoals[input.id].name
   
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
        reset.style.display = 'block';
    }

    input.addEventListener('focus',()=>{
       progressBar.classList.remove('show-error')
        reset.style.display = 'block';
    })
    input.addEventListener('input',(e)=>{
     if(allGoals[input.id].completed){
        input.value = allGoals[input.id].name
        return
     }
        allGoals[input.id].name = input.value 
        localStorage.setItem('allGoles',JSON.stringify(allGoals))
    })
    
})




reset.addEventListener('click', function() {
    Object.keys(allGoals).forEach(key => {
        allGoals[key].completed = false;
    })

     checkBoxlist.forEach(checkbox => {
        checkbox.parentElement.classList.remove('completed');
        progressValue.style.width = '0%'
    });

     inputFields.forEach(input => {
        input.value = '';
    });
    
    localStorage.setItem('allGoles', JSON.stringify(allGoals));
    reset.style.display = 'none';
    localStorage.removeItem('allGoles')

})                                   