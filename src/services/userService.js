const axios = require('axios');

var url = "http://fundoonotes.incubation.bridgelabz.com/api"

var token = localStorage.getItem('LoginToken')

class user {



    // var myToken = localStorage.getItem('ForgetToken');


    //this flow goes to router in backend
    login(loginData) {
        console.log("log in data in services--> ", JSON.stringify(loginData))
        var login = axios.post(url + '/user/login', loginData)
        console.log("Returned login data--------->", login);

        return login;

    }

    register(registerData) {
        console.log("register data in services--> ", JSON.stringify(registerData))
        //      axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', registerData)
        //     .then((data)=>{
        // console.log(data);
        // return data;

        //     })
        //     .catch((err)=>{
        // return err;
        //     })
        return axios.post(url + '/user/userSignUp', registerData)


    }

    forgetpassword(forgetData) {
        console.log("forget password data in services--> ", forgetData)
        var forget = axios.post(url + '/user/reset', forgetData)

        return forget;
    }

    resetpassword(resetData, myToken) {
        console.log("reset password data in services--> ", resetData)
        console.log("token ----->", myToken);

        var reset = axios.post(url + '/user/reset-password', resetData, {
            headers: {
                authorization: myToken
            }
        });

        return reset;
    }

    createNote(noteData, token) {
        console.log("create note data in services--> ", noteData)

        var note = axios.post(url + '/notes/addNotes', noteData, {
            headers: {
                authorization: token
            }
        });

        return note;
    }


    getAllNotes() {

        console.log("Token in getAllNotes--> ", token)

        return axios.get(url + '/notes/getNotesList', {
            headers: {
                authorization: token
            }
        });

        // return notes;
    }

    update(updateData) {
        console.log("update note data in services--> ", updateData)

        var updatedNote = axios.post(url + '/notes/updateNotes', updateData, {
            headers: {
                authorization: token
            }
        });

        return updatedNote;
    }

    archiveNote(archiveData) {
        console.log("archive note data in services--> ", archiveData)
        console.log("Token in archive", token);


        return axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes', archiveData, {
            headers: {
                authorization: token
            }
        });


    }



    TrashNote(Data) {
        console.log("delete note data in services--> ", Data)
        console.log("Token in delete", token);

        var trashNotes = axios.post(url + '/notes/trashNotes', Data, {
            headers: {
                authorization: token
            }
        });

        return trashNotes;
    }

    getArchivedNote() {
        console.log("Token in getArchivedNote", token);

        var archived = axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList', {
            headers: {
                authorization: token
            }
        });

        return archived;
    }


    getTrashedNotes() {
        console.log("Token in getTrashedNotes", token);

        var trashed = axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList', {
            headers: {
                authorization: token
            }
        });

        return trashed;
    }

    color(code) {
        console.log("color note data in services--> ", code)
        console.log("Token in color", token);

        var colorNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes', code, {
            headers: {
                authorization: token
            }
        });

        return colorNotes;
    }

    reminder(Reminder){
        console.log("Reminder note data in services--> ", Reminder)
        console.log("Token in color", token);

        var reminder = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/addUpdateReminderNotes', Reminder, {
            headers: {
                authorization: token
            }
        });

        return reminder;
    }

    getLabels(){
        var label = axios.get('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList',  {
            headers: {
                authorization: token
            }
        });

        return label; 
    }

    getReminderedNotes(){
        var remindered = axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getReminderNotesList',  {
            headers: {
                authorization: token
            }
        });

        return remindered;  
    }

    addLabelOnNote(noteData){
        console.log("addLabelOnNote in service",noteData);
        
        var addLabelOnNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels', noteData, {
            headers: {
                authorization: token
            }
        });

        return addLabelOnNotes;  
    }

    deleteLabelFromNote(requestObject){
        var deleteLabelFromNotes = axios.delete('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/{id}/deleteNoteLabel',requestObject,  {
            headers: {
                authorization: token
            }
        });

        return deleteLabelFromNotes;  
    }
     
    updateLabelOnNote(noteData){
        console.log("update Label On Note",noteData);
        
        var updateLabelOnNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/{id}/updateNoteLabel',noteData,  {
            headers: {
                authorization: token
            }
        });

        return updateLabelOnNotes;     
    }




}

module.exports = new user();