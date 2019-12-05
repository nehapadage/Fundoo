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

    unArchiveNote(data){
        console.log("unarchive note data in services--> ", data)
        console.log("Token in unarchive", token);


        return axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes', data, {
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

    addLabel(noteData){
        console.log("addLabelOnNote in service",noteData);
        
        var addLabelOnNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels', noteData, {
            headers: {
                authorization: token
            }
        });

        return addLabelOnNotes;  
    }
                                                        //  POST /notes/{noteId}/addLabelToNotes/{lableId}/add
    

    deleteLabel(id){
        var deleteLabelFromNotes = axios.delete('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/'+id.id+'/deleteNoteLabel',id,  {
            headers: {
                authorization: token
            }
        });

        return deleteLabelFromNotes;  
    }
     
    updateLabel(noteData){
        console.log("update Label On Note",noteData);
        
        var updateLabelOnNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/'+noteData.id+'/updateNoteLabel',noteData,  {
            headers: {
                authorization: token
            }
        });

        return updateLabelOnNotes;     
    }


    getNotesByLabel(label){
        console.log("get Notes By Label in userservice",label); 
        
        var getNotesByLabels = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesListByLabel/'+label,label, {
            headers: {
                authorization: token
            }
        });

        return getNotesByLabels;     
    }

    addLabelOnNote(noteData){
        console.log("addLabelOnNote in service",noteData);
        
        var addLabelOnNotes = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/'+noteData.noteId+'/addLabelToNotes/'+noteData.id+'/add', noteData, {
            headers: {
                authorization: token
            }
        });

        return addLabelOnNotes;  
    }

    deleteLabelFromNotes(noteData){
        console.log("addLabelOnNote in service",noteData);
        
        var label = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/'+noteData.noteId+'/addLabelToNotes/'+noteData.id+'/remove', noteData, {
            headers: {
                authorization: token
            }
        });

        return label;  
    }

    removeReminder(Data){
        console.log("addLabelOnNote in service",Data);
        
        var label = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/removeReminderNotes', Data, {
            headers: {
                authorization: token
            }
        });

        return label;    
    }

    setProfile(data){
        console.log("In set profile in userService",data);
        var profile = axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/uploadProfileImage', data, {
            headers: {
                authorization: token
            }
        });

        return profile;   
    }

    DeleteForever(data){
        console.log("In delete forever in userService",data);
        var delet= axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes', data, {
            headers: {
                authorization: token
            }
        });

        return delet;   
    }

    getUserList(data){
        console.log("In getUserList in service",data);
        var list= axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList',data,{
            headers: {
                authorization: token
            }
        });

        return list;   

        
    }

    addCollaborator(data){
        console.log("In add collaborator in service",data);
        var add= axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/'+data.id+'/AddcollaboratorsNotes',data,{
            headers: {
                authorization: token
            }
        });

        return add;   

        
    }
 
    removeCollaborator(data){
        console.log("In remove collaborator in service",data);
        var remove= axios.delete('http://fundoonotes.incubation.bridgelabz.com/api/notes/'+data.id+'/removeCollaboratorsNotes/'+data.collaboratorUserId,{
            headers: {
                authorization: token
            }
        });

        return remove;
    }

    getNoteDetails(id){
        console.log("In getNoteDetails in service",id);
        var ids= axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesDetail/'+id,{
            headers: {
                authorization: token
            }
        });

        return ids;
    }

    askQuestion(data){
        console.log("In add question in service",data);
        var add= axios.post('http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/addQuestionAndAnswer',data,{
            headers: {
                authorization: token
            }
        });

        return add;   
    }

    Like(data){
        console.log("In like question in service",data.parentId);
        var like= axios.post('http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/like/'+data.parentId,data,{
            headers: {
                authorization: token
            }
        });

        return like;   
    }



    

 }






module.exports = new user();