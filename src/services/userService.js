const axios = require('axios');

var url = "http://fundoonotes.incubation.bridgelabz.com/api"

// var myToken = localStorage.getItem('ForgetToken');



//this flow goes to router in backend
export function login(loginData) {
    console.log("log in data in services--> ", JSON.stringify(loginData))
    var login = axios.post(url+'/user/login', loginData)
    console.log("Returned login data--------->", login);

    return login;

}

export function register(registerData) {
    console.log("register data in services--> ", JSON.stringify(registerData))
    //      axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', registerData)
    //     .then((data)=>{
    // console.log(data);
    // return data;

    //     })
    //     .catch((err)=>{
    // return err;
    //     })
   return axios.post(url+'/user/userSignUp',registerData)
        

}

export function forgetpassword(forgetData) {
    console.log("forget password data in services--> ", forgetData)
    var forget = axios.post(url+'/user/reset', forgetData)

    return forget;
}

export function resetpassword(resetData, myToken) {
    console.log("reset password data in services--> ", resetData)
    console.log("token ----->", myToken);

    var reset = axios.post(url+'/user/reset-password', resetData, 
    {
        headers: {
            authorization: myToken
        }
    }
    );

    return reset;
}
