// URL to connect to on FETCH
const serverURL = "https://630f59da37925634188d7eb8.mockapi.io/form/list";

// to know if some record is in Edit mode
let isEditOn = false;
let editOpenID = 0;


/*********************************
* GET ALL RECORDS FROM DATA
* AND ADD EACH ONE TO THE HTML TABLE
**********************************/
async function getData(url) {
    try {
        console.log('loading');
        // window.alert("loading");
        // Loading spinner - ON
        document.getElementById("loading").hidden = false;
        
        console.log('Server= ', url);
        console.log('getting data');
        const response = await fetch(url);
        const result = await response.json();
        result.forEach((record, index) => {
            console.log('record:',index,'name= ', record.name);
            addRecordToPage(record);
        })
        
        /* adds event listner only AFTER all 
        * records were added to html        */
       initAfterApendData();
       const newRecForm = document.getElementById("add-record-form");
       newRecForm.addEventListener("submit", submitNewRec);
       
       /* now adding event-listners for each record */  
       
    } catch(err) {
        console.log('error:', err);
        window.alert("error retrieving data");
    } finally {
        /* Loading spinner - off! */
        document.getElementById("loading").hidden = true;
        console.log('Done loading');
    }
    console.log('after catch');
}

/*********************************
* ADD NEW RECORD FROM HTML TO DATA
**********************************/
async function sendPOSTRequest(url, body) {
    try {
        console.log('posting!!!');
    
        const response = fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        const result = response.json();
        console.log(result);
        location.reload();
    } catch(err) {
        console.log('error:', err);
        window.alert("error retrieving data");
    }
}

/*****************************
*DELETS RECORD BY ID FROM DATA 
******************************/
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

/*********************************
* SENDS FETCH-PUT TO 'EDIT' RECORD
*IN JSON ORIGIN
*********************************/
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
        // console.log(error);
        throw(error);
    })
}

/*******************
*ADD RECORD TO HTML 
********************/
function addRecordToPage(record) {
    const id = record.id;
    const name = record.name;
    const email = record.email;
    const trTemplate = `
        <tr id="tr${id}">
            <th scope="row">${id}</th>
            <td id="td-name${id}" onclick="turnEditOn(${id})">
                <div id="name-text${id}">${name}</div>
                <div id="name-input${id}" hidden>
                    <input id="name-input-box${id}" type="text" value="${name}" class="form-control">
                </div>
            </td>
            <td id="td-email${id}" onclick="turnEditOn(${id})">
                <div id="email-text${id}">${email}</div>
                <div id="email-input${id}" hidden>
                    <input id="email-input-box${id}" type="text" value="${email}" class="form-control">
                </div>
            </td>
            <td id="td-save-btn${id}">
                <button type="button" id="save-btn${id}" hidden class="btn btn-success btn-sm" onclick="submitEditRec(${id})">Save</button>
            </td>
            <td id="td-cancel-btn${id}">
                <button type="button" id="cancel-btn${id}" hidden class="btn btn-warning btn-sm" onclick="turnEditOff(${id})">Cancel</button>
            </td>
            <td id="td-del-btn${id}">
                <button type="button" id="delete-btn${id}" class="btn btn-danger btn-sm" onclick="sendDELETEequest(${id})">Delete</button>
            </td>  
        </tr>
    `;

    // Adding a new TR of the 'record' to the table using the template
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML += trTemplate;


    // const newRecForm = document.getElementById("add-record");
    // newRecForm.addEventListener("submit", submitNewRec);
    // newRecForm.addEventListener("submit", myFunc);
}

/****************************
 * SUBMITS (ADDS) NEW RECORD
 *  FROM HTML TO THE DATA
 ****************************/
function submitNewRec(e) {
    e.preventDefault();
    console.log('new rec submit!!');
    // Window.alert("FDF");

    const nameToSubmit = document.getElementById("new-name").value;
    const emailToSubmit = document.getElementById("new-email").value;
    // console.log(nameToSubmit, emailToSubmit);

    const submissionObj = {
        name: nameToSubmit,
        email: emailToSubmit
    }
    sendPOSTRequest(serverURL, submissionObj);
}

/*********************************
 * CALLS FETCH-PUT TO UPDATE
 *  A RECORD WITH NEW NAME, EMAIL
 ********************************/
function submitEditRec(id) {
    // e.preventDefault();
    console.log('edit rec submit!!! id=', id);


    const nameToSubmit = document.getElementById("name-input-box" + id).value;
    const emailToSubmit = document.getElementById("email-input-box" + id).value;
    console.log(nameToSubmit, emailToSubmit);

    const submissionObj = {
        name: nameToSubmit,
        email: emailToSubmit
    }

    sendPUTRequest(serverURL + "/" + id, submissionObj);
}

/*********************************
 * WHEN RECORD CLICKED - 
 * HIDES THE TEXT-BOXES AND
 * UNHIDES THE INPUT-BOXES
 ********************************/
function turnEditOn(lineID) {
    console.log('turnEditOn');

    if (isEditOn) {
        turnEditOff(editOpenID);
    }

    document.getElementById("name-text" + lineID).hidden = true;
    document.getElementById("name-input" + lineID).hidden = false;
    document.getElementById("email-text" + lineID).hidden = true;
    document.getElementById("email-input" + lineID).hidden = false;
    document.getElementById("save-btn" + lineID).hidden = false;
    
    document.getElementById("cancel-btn" + lineID).hidden = false; 

    isEditOn = true;
    editOpenID = lineID;
}

/*********************************
 * WHEN OTEHR RECORD CLICKED - 
 * UNHIDES THE TEXT-BOXES AND
 * HIDES THE INPUT-BOXES
 ********************************/
function turnEditOff(lineID) {
    console.log('turnEditOff');

    document.getElementById("name-text" + lineID).hidden = false;
    document.getElementById("name-input" + lineID).hidden = true;
    document.getElementById("email-text" + lineID).hidden = false;
    document.getElementById("email-input" + lineID).hidden = true;
    document.getElementById("save-btn" + lineID).hidden = true;
    
    document.getElementById("cancel-btn" + lineID).hidden = true; 

    isEditOn = false;
    editOpenID = 0;
}
/*********************************
 * TOGGLES HIDE/UNHIDE 
 * OF THE ADD NEW RECORD INPUTS
 * AND BOX
 ********************************/
function showHideAddNew() {
    if (document.getElementById("name-input-new").hidden) {
        console.log('show new');
        document.getElementById("name-input-new").hidden = false;
        document.getElementById("email-input-new").hidden = false;
        document.getElementById("submit-form-btn").hidden = false;
        document.getElementById("toggle-add-rec").innerHTML = "X";
    } else {
        console.log('hide new');
        document.getElementById("name-input-new").hidden = true;
        document.getElementById("email-input-new").hidden = true;
        document.getElementById("submit-form-btn").hidden = true;
        document.getElementById("toggle-add-rec").innerHTML = "+";
    }
}


function init() {
    /* adds only one record, not from data, for debugging */
    // addRecordToPage({id: 111, name: "Eli", email: "@#$"});
    getData(serverURL);
    console.log('after getData');        
}

function initAfterApendData() {
    console.log('init after append data');

    
}

window.onload = () => {
    init();
}

