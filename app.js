	
function ReadFile(files){	
    let file = inputfile.files[0];	
    let reader = new FileReader();	
    reader.readAsText(file);	
    reader.onload = function(){	
        filecontent.value = reader.result;	
    }
    getCheck(reader.result);	
}

async function getCheck(data){
    let url = "https://api.textgears.com/grammar?key=wF4nKAm0SzmgBeEd&text="+data;
    let response = await fetch(url);
    if(response.ok){
        let spell = await response.json();
        console.log(spell);
        // for(let item of spell){
        //     console.log(item);
        // }
    }
}
