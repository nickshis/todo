let form = document.forms.todo
let input = form.querySelector('input')
let cont = document.querySelector('.container')
let todos = []


form.onsubmit = (e) => {
    e.preventDefault();
    
    let task = {
        id: Math.random(),
        isDone: false,
        task: input.value,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    if(input.value.length !== 0) {
        todos.push(task)
        reload(todos, cont)
        console.log(todos)
        input.style.border = '2px solid blue'
    } else {
        input.style.border = '2px solid red'
    }

}

function reload(arr, place) {
    place.innerHTML = ""
    for(let item of arr) {
        let item_div = document.createElement('div')
        let div_top = document.createElement('div')
        let span_top = document.createElement('span')
        let span_time = document.createElement('span')
        let delete_btn = document.createElement('button')

        item_div.classList.add('item')
        div_top.classList.add('top')
        span_time.classList.add('time')
        
        span_top.innerHTML = item.task
        span_time.innerHTML = item.time
        delete_btn.innerHTML = "x"
    
        place.append(item_div)
        div_top.append(span_top, delete_btn)
        item_div.append(div_top, span_time)   
        
        delete_btn.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            item_div.classList.add('active')
            setTimeout(() => {
                item_div.style.display = 'none'
            }, 250)
        }

        span_top.onclick = () => {
            item.isDone = !item.isDone
            span_top.classList.add('spanTop')
            span_top.onclick = () => {
                item.isDone = !item.isDone
                span_top.classList.remove('spanTop')
                reload(todos, cont)
            }
        }
    }
}