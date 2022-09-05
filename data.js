const serverURL = "https://630f59da37925634188d7eb8.mockapi.io/form/list";
// const serverURL = "file:///C:/Users/vadim/Documents/ITC%20Full%20Stack/05_JavaScript/lesson_06_2.9/new_list.json";


function getData(url) {
    console.log('Server= ', url);
    console.log('getting data');

    fetch(url).then((response) => {
        response.json().then((result) => {
            // console.log(result);
            result.forEach((record, index) => {
                // console.log('record:',index,'name= ', record.name);
                addRecordToPage(record);
            })
        })
    })
    .catch((error) => {
        console.log(error);
    }) 

}

function sendPOSTRequest(url, body) {
    console.log('posting!!!');

    fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        response.json().then((result) => {
            console.log(result);
            // location.reload();
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

function sendDELETEequest(idToDelete) {
    // const idToDelete = 11;
    console.log('delete id=', idToDelete,' was sent!!!');
    const urlID = serverURL + "/" + idToDelete;
    console.log(urlID);

    fetch(urlID, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => {
        response.json().then((result) => {
            console.log(result);
            location.reload();
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

function sendPUTRequest(url, body) {
    console.log('putting!!!');

    fetch(url, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        response.json().then((result) => {
            console.log(result);
            location.reload();
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

function addRecordToPage(record) {
    // console.log('The record=', record);

    // Building TR + ID
    const tr = document.createElement("tr");
    tr.id = "tr" + record.id;

    const th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = record.id;

    //  Building TD NAME
    const tdName = document.createElement("td");
    tdName.id = "td-name" + record.id;
    // div as text inside the TD = visible
    const nameText = document.createElement("div");
    nameText.id = "name-text" + record.id;
    nameText.innerHTML = record.name;
    // div as input inside the TD = hidden
    const nameInputDiv = document.createElement("div");
    nameInputDiv.id = "name-input" + record.id;
    nameInputDiv.hidden = true;
    nameInputDiv.setAttribute("style", "width:5px");
    // input box inside the div
    const nameInputBox = document.createElement("input");
    nameInputBox.type = "text";
    nameInputBox.value = record.name;

    //  Building TD EMAIL
    const tdEmail = document.createElement("td");
    tdEmail.id = "td-email" + record.id;
    // div as text inside the TD = visible
    const emailText = document.createElement("div");
    emailText.id = "email-text" + record.id;
    emailText.innerHTML = record.email;
    // div as input inside the TD = hidden
    const emailInputDiv = document.createElement("div");
    emailInputDiv.id = "email-input" + record.id;
    emailInputDiv.hidden = true;
    emailInputDiv.setAttribute("style", "width:5px");
    // input box inside the div
    const emailInputBox = document.createElement("input");
    emailInputBox.type = "text";
    emailInputBox.value = record.email;

    //  Building TD for save button
    const tdSaveBtn = document.createElement("td");
    tdSaveBtn.id = "td-save-btn" + record.id;
    const btnSave = document.createElement("button");
    btnSave.id = "save-btn" + record.id;
    btnSave.type = "button";
    btnSave.hidden = true;
    btnSave.className = "btn btn-success btn-sm";
    btnSave.innerHTML = "Save";

    //  Building TD for cancel button
    const tdCancelBtn = document.createElement("td");
    tdCancelBtn.id = "td-cancel-btn" + record.id;
    const btnCancel = document.createElement("button");
    btnCancel.id = "cancel-btn" + record.id;
    btnCancel.type = "button";
    btnCancel.hidden = true;
    btnCancel.className = "btn btn-warning btn-sm";
    btnCancel.innerHTML = "Cancel";

    //  Building TD for DELETE button
    const tdDelBtn = document.createElement("td");
    tdDelBtn.id = "td-del-btn" + record.id;
    const btnDelete = document.createElement("button");
    btnDelete.id = "delete-btn" + record.id;
    btnDelete.type = "button";
    btnDelete.className = "btn btn-danger btn-sm";
    btnDelete.innerHTML = "Delete";

    
    document.getElementById("table-body").appendChild(tr);
    const newAppendedTr = document.getElementById("tr" + record.id);
    document.getElementById("tr" + record.id).setAttribute( "onClick", "turnEditOn(" + record.id + ")");
    
    newAppendedTr.appendChild(th);

    newAppendedTr.appendChild(tdName);
    const appendedTdName = document.getElementById("td-name" + record.id);
    appendedTdName.appendChild(nameText);
    appendedTdName.appendChild(nameInputDiv);
    const appendedNameInputDiv = document.getElementById("name-input" + record.id);
    appendedNameInputDiv.appendChild(nameInputBox);

    newAppendedTr.appendChild(tdEmail);
    const appendedTdEmail = document.getElementById("td-email" + record.id);
    appendedTdEmail.appendChild(emailText);
    appendedTdEmail.appendChild(emailInputDiv);
    const appendedEmailInputDiv = document.getElementById("email-input" + record.id);
    appendedEmailInputDiv.appendChild(emailInputBox);


    newAppendedTr.appendChild(tdSaveBtn);
    tdSaveBtn.appendChild(btnSave);
    document.getElementById("save-btn" + record.id).setAttribute( "onClick", "submitEditRec(" + record.id + ")");
    
    newAppendedTr.appendChild(tdCancelBtn);
    tdCancelBtn.appendChild(btnCancel);
    document.getElementById("cancel-btn" + record.id).setAttribute( "onClick", "turnEditOff(" + record.id + ")");    

    newAppendedTr.appendChild(tdDelBtn);
    tdDelBtn.appendChild(btnDelete);
    document.getElementById("delete-btn" + record.id).setAttribute( "onClick", "sendDELETEequest(" + record.id + ")");
    
}

function submitNewRec(e) {
    e.preventDefault();
    console.log('new rec submit!!');

    const nameToSubmit = document.getElementById("new-name").value;
    const emailToSubmit = document.getElementById("new-email").value;
    // console.log(nameToSubmit, emailToSubmit);

    const submissionObj = {
        name: nameToSubmit,
        email: emailToSubmit
    }
    sendPOSTRequest(serverURL, submissionObj);
}

function submitEditRec(id) {
    // e.preventDefault();
    console.log('edit rec submit!!! id=', id);


    const nameToSubmit = document.getElementById("name-input" + id).firstChild.value;
    const emailToSubmit = document.getElementById("email-input" + id).firstChild.value;
    console.log(nameToSubmit, emailToSubmit);

    const submissionObj = {
        name: nameToSubmit,
        email: emailToSubmit
    }

    sendPUTRequest(serverURL + "/" + id, submissionObj);
}


function toggleEdit(lineID) {
    console.log('edit button clicked');
    document.getElementById("name-text" + lineID).hidden = !document.getElementById("name-text" + lineID).hidden;
    document.getElementById("name-input" + lineID).hidden = !document.getElementById("name-input" + lineID).hidden;
    document.getElementById("email-text" + lineID).hidden = !document.getElementById("email-text" + lineID).hidden;
    document.getElementById("email-input" + lineID).hidden = !document.getElementById("email-input" + lineID).hidden;
    document.getElementById("save-btn" + lineID).hidden = !document.getElementById("save-btn" + lineID).hidden;
    // document.getElementById("save-btn" + lineID).disabled = !document.getElementById("save-btn" + lineID).disabled;
    
    const editCancelBtn = document.getElementById("edit-btn" + lineID);
    if (editCancelBtn.innerHTML == "Edit") {
        editCancelBtn.innerHTML = "Cancel";
    } else {
        editCancelBtn.innerHTML = "Edit";
    }
}

function turnEditOn(lineID) {
    console.log('turnEditOn');
    document.getElementById("name-text" + lineID).hidden = true;
    document.getElementById("name-input" + lineID).hidden = false;
    document.getElementById("email-text" + lineID).hidden = true;
    document.getElementById("email-input" + lineID).hidden = false;
    document.getElementById("save-btn" + lineID).hidden = false;
    // document.getElementById("save-btn" + lineID).disabled = !document.getElementById("save-btn" + lineID).disabled;
    
    document.getElementById("cancel-btn" + lineID).hidden = false; 
}

function turnEditOff(lineID) {
    console.log('turnEditOff');
    document.getElementById("name-text" + lineID).hidden = false;
    document.getElementById("name-input" + lineID).hidden = true;
    document.getElementById("email-text" + lineID).hidden = false;
    document.getElementById("email-input" + lineID).hidden = true;
    document.getElementById("save-btn" + lineID).hidden = true;
    // document.getElementById("save-btn" + lineID).disabled = !document.getElementById("save-btn" + lineID).disabled;
    
    document.getElementById("cancel-btn" + lineID).hidden = true; 
}


function editNew1() {
    console.log('new editttt');
}

function init() {
    getData(serverURL);
    

    const newRecForm = document.getElementById("add-record");
    newRecForm.addEventListener("submit", submitNewRec);

    

    
    
    

    // const myForm = document.getElementById("my-form");
    
    // myForm.addEventListener("submit", formSubmit);
}

window.onload = () => {
    init();
}