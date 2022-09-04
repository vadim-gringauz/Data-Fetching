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
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = record.id;
    const tdName = document.createElement("td");
    tdName.innerHTML = record.name;
    const tdEmail = document.createElement("td");
    tdEmail.innerHTML = record.email;
    const tdDelBtn = document.createElement("td");
    tdDelBtn.id = "td-del-" + record.id;
    const buttonDeleteRec = document.createElement("button");
    buttonDeleteRec.innerHTML = "Delete";
    buttonDeleteRec.type = "button";
    buttonDeleteRec.className = "btn btn-danger btn-sm";
    buttonDeleteRec.className = "btn btn-danger btn-sm";
    buttonDeleteRec.id = "delete-rec-" + record.id;

    
    document.getElementById("table-body").appendChild(tr);
    const newTr = document.getElementsByTagName("tr")[document.getElementsByTagName("tr").length - 1];
    
    newTr.appendChild(th);
    newTr.appendChild(tdName);
    newTr.appendChild(tdEmail);
    newTr.appendChild(tdDelBtn);
    tdDelBtn.appendChild(buttonDeleteRec);
    document.getElementById("delete-rec-" + record.id).setAttribute( "onClick", "sendDELETEequest(" + record.id + ")" );
    
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

function submitEditRec(e) {
    e.preventDefault();
    console.log('edit rec submit!!!');

    const nameToSubmit = document.getElementById("new-name-edit").value;
    const emailToSubmit = document.getElementById("new-email-edit").value;
    // console.log(nameToSubmit, emailToSubmit);

    const submissionObj = {
        name: nameToSubmit,
        email: emailToSubmit
    }
    sendPUTRequest("https://630f59da37925634188d7eb8.mockapi.io/form/list/5", submissionObj);
}


function toggleEdit() {
    console.log('edit button clicked');
    document.getElementById("name-text").hidden = !document.getElementById("name-text").hidden;
    document.getElementById("name-input").hidden = !document.getElementById("name-input").hidden;
    document.getElementById("email-text").hidden = !document.getElementById("email-text").hidden;
    document.getElementById("email-input").hidden = !document.getElementById("email-input").hidden;
    document.getElementById("save-btn1").disabled = !document.getElementById("save-btn1").disabled;

}



function init() {
    getData(serverURL);
    

    const newRecForm = document.getElementById("add-record");
    newRecForm.addEventListener("submit", submitNewRec);

    const editRecForm = document.getElementById("edit-record");
    editRecForm.addEventListener("submit", submitEditRec);

    
    
    

    // const myForm = document.getElementById("my-form");
    
    // myForm.addEventListener("submit", formSubmit);
}

window.onload = () => {
    init();
}