const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");
let sqlcode="";
const primarykeys = document.getElementById("primarykeys");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;
//opens the popupbox fo new table creation
addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Table";
    addBtn.innerText = "Add Table";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    //titleTag.focus();
});
//if table creation is aborted this happens or when add note is pressed this function is called
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";  
    //add create element and append to child
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove()); //important
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        //filterDesc = note.description.replaceAll(" ", ',');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span ">${filterDesc}</span>                            
                        </div>
                        <div class="bottom-content">                            
                            <div class="settings"> 
                                <i onclick="updateNote(${id}, '${note.title}', '${filterDesc}')" class="uil uil-pen"></i>
                                <i onclick="deleteNote(${id})" class="uil uil-trash"></i>                                
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Edit Table";
    addBtn.innerText = "Update Table";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        

        let noteInfo = {title, description}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});



const popupBox2 = document.querySelector(".popup-box2"),
closeIcon2 = popupBox2.querySelector("header i"),
descTag2 = popupBox2.querySelector("textarea"),
addBtn2 = popupBox2.querySelector("button");

closeIcon2.addEventListener("click", () => {    
    popupBox2.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function maketable(tablename,data){
    let tabledata=`CREATE TABLE ${tablename} (`;
    tabledata+=`\n`;
    let x = data.replaceAll(`,`,` `);
    let data_final = x.replaceAll(`\n`,`,\n`);
    tabledata+=data_final;    
    tabledata+=`\n);`
    return tabledata;
}
function generatesqlcode(notes,sqlcode){
    let length = notes.length;
    //return sqlcode.concat(`${length1}`);
    let tablename,data,table;
    for (let i = 0; i<length; i++) {
        tablename = notes[i].title;
        
        data = notes[i].description;
        
        table = maketable(tablename,data);
        
        sqlcode+=table;
        sqlcode+="\n\n";
    }
    return sqlcode;
//PersonID,int\nLastName,varchar(255)\nFirstName,varchar(255)\nAddress,varchar(255)\nCity,varchar(255)
}
function opencodePopup(){
    if(notes.length===0){
        alert("Add Entries!");
        return;
    }     
    popupBox2.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    sqlcode=``;
    let code = generatesqlcode(notes,sqlcode);
    descTag2.value = code;
    
}
function CopytoClipboard(){
    var copy = descTag2;
    copy.select();
    navigator.clipboard.writeText(copy.value);
    alert("Copied the code!");
}
//