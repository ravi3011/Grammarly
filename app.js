var MainToDoContainer = document.getElementById('mainContainer');
var textCheck = document.querySelector('#filecontent');	
let reader;
let spell;
let bad;
function ReadFile(files){	
    let file = inputfile.files[0];	
    reader = new FileReader();	
    reader.readAsText(file);	
    reader.onload = function(){	
        filecontent.value = reader.result;	
    }
}

async function getCheck(data){
    let url = "https://api.textgears.com/spelling?key=wF4nKAm0SzmgBeEd&text="+data;
    let response = await fetch(url);
    if(response.ok){
        let spell1 = await response.json();
        return spell1;
        // (spell["response"]["errors"]["0"];    
    }
}


textCheck.addEventListener('contextmenu', async function(ev){
     ev.preventDefault();
     let res = await getCheck(reader.result);
     bad = res["response"]["errors"]["0"]["bad"];
     let value = res["response"]["errors"]["0"]["better"];
     addSuggestion(value);
    //  console.log(myOutput[response][errors][0]);
},false);

function addSuggestion(value){
    var ulTag = document.createElement('select');
    ulTag.classList.add('todo-list-container');

    // var todoList = document.createElement('div');
    // todoList.classList.add('todo-list');

    // ulTag.appendChild(todoList);
    for(var i = 0 ; i < value.length; i++){
        var liTag = document.createElement('option');
        liTag.innerText = value[i];
        liTag.classList.add('todo-item');
        ulTag.appendChild(liTag);
    }
    MainToDoContainer.appendChild(ulTag);
    var btnTag = document.createElement('button');
    btnTag.classList.add('button-submit');
    btnTag.innerText = "Click here";
    MainToDoContainer.appendChild(btnTag);
    btnTag.onclick = changeText();

}

function changeText(){
    var e = document.querySelector(".todo-list-container");
    console.log(e.value);
    filecontent.value = filecontent.value.replace(bad,e.value);
}