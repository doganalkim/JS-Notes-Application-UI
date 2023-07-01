const form = document.querySelector("#noteform");
const inputforform = document.querySelector("#newnote");
const notelist = document.querySelector(".list-group");
const firstcardbody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-notes");

// console.log(form,inputforform,notelist,firstcardbody,secondcardbody,filter,clearbutton);

eventlisteners();

function eventlisteners(){
    form.addEventListener("submit",addnote);
    document.addEventListener("DOMContentLoaded",loadallnotestoui);
    secondcardbody.addEventListener("click",deletenote);
    filter.addEventListener("keyup",filternotes);
    clearbutton.addEventListener("click",clearallnotes);
}

function clearallnotes(e){
    // console.log(e.target);
    if(confirm("Are you sure you want to delete all Notes?")){
        while(notelist.firstElementChild != null){
            notelist.removeChild(notelist.firstElementChild);
        }
    }
    localStorage.removeItem("notes");
}

function filternotes(e){
    //console.log(e.target.value);
    const filterval = e.target.value.toLowerCase();
    const noteitems = document.querySelectorAll(".list-group-item");
    for(let i=0;i<noteitems.length;i++){
        //console.log(noteitems[i].textContent);
        let s = noteitems[i].textContent.toLocaleLowerCase(); 
        if(s.indexOf(filterval) === -1){
            noteitems[i].setAttribute("style","display:none !important");
        }
        else{
            noteitems[i].setAttribute("style","display:block");
        }
    }
}

function deletenote(e){
    //console.log(e.target);
    if(e.target.className ==="fa-sharp fa-solid fa-trash"){
        //console.log("I will delete");
        e.target.parentElement.parentElement.remove();
        deletenotefromstorage(e.target.parentElement.parentElement.textContent);
        showalert("success","The note has been deleted!");
    }
}

function deletenotefromstorage(deletednote){
    let notes = getnotesfromstorage();
    for(let i=0; i<notes.length;i++){
        if(notes[i] === deletednote){
            notes.splice(i,1);
        }
    }
    localStorage.setItem("notes",JSON.stringify(notes));
}

function loadallnotestoui(){
    const notes = getnotesfromstorage();
    for(let i = 0 ; i<notes.length;i++){
        addnotetoui(notes[i]);
    }
}

function addnote(e){
    const newnote = inputforform.value.trim();
    if(newnote === ""){
        // <div class="alert alert-danger" role="alert"> </div>
        showalert("danger","You cannot add an empty Note!");
        return;
    }
    // console.log(newnote);
    addnotetoui(newnote);
    addnotetostorage(newnote);
    showalert("success","The Note has been added!");
    inputforform.value  = "";
    e.preventDefault();
}

function addnotetostorage(newnote){
    let notes = getnotesfromstorage();
    notes.push(newnote);
    localStorage.setItem("notes",JSON.stringify(notes));
}

function getnotesfromstorage(){
    let notes;
    if(localStorage.getItem("notes") === null){
        notes = [];
    }
    else{
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    return notes;
}

function showalert(type,message){
    const newdiv = document.createElement("div");
    const newtext = document.createTextNode(message);
    newdiv.className=`alert alert-${type}`;
    newdiv.appendChild(newtext);
    // console.log(newdiv);
    form.appendChild(newdiv);
    setTimeout(function(){
        newdiv.remove();
    },2000);
    
}

function addnotetoui(newnote){
    const newli = document.createElement("li");
    const newa = document.createElement("a");
    const newi = document.createElement("i");
    const newtext = document.createTextNode(newnote);
    newa.href = "#";
    newa.className = "delete-item";
    newi.className = "fa-sharp fa-solid fa-trash";
    newi.style = "color: 8400ff;";
    newli.className = "list-group-item d-flex justify-content-between";
    newa.appendChild(newi);
    newli.appendChild(newtext);
    newli.appendChild(newa);
    notelist.appendChild(newli);
    // console.log(newli);
}