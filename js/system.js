//Sign Up Inputs
var signupUserNameInput =  document.getElementById('signupUserNameInput');
var signupEmailInput =  document.getElementById('signupEmailInput');
var signupPassInput =  document.getElementById('signupPassInput');
var success = document.getElementById('success');
var signup_btn = document.querySelector('.signup');

//Login Inputs
var loginEmailInput =  document.getElementById('loginEmailInput');
var loginPasslInput =  document.getElementById('loginPasslInput');
var inCorrect = document.getElementById('inCorrect');
var login_btn = document.querySelector('.login');


var usersContainer = [];


//check inputs is empty or not function
function isImpty(){
    if(signupUserNameInput.value == "" || signupEmailInput.value == "" || signupPassInput.value == ""){
        return false;
    }
    else{
        return true;
    }
}

// check email is exist function
function isEmailExist() {
    for(var i = 0 ; i<usersContainer.length; i++){
        if(usersContainer[i].email == signupEmailInput.value ){
            return false
        }
    }
}

//Sign Up Function
function signup(){

    var user = {
        name:signupUserNameInput.value,
        email:signupEmailInput.value,
        pass:signupPassInput.value,
    }

    if( isImpty() == false){
        success.innerHTML ='<p class="text-center text-danger mt-4">All inputs are required</p>'
    
    }

    else if(isEmailExist() == false){
        success.innerHTML ='<p class="text-center text-danger mt-4">email already exists</p>'
    }
    else{
        usersContainer.push(user);
        localStorage.setItem('users',JSON.stringify(usersContainer));
        success.innerHTML ='<p class="text-center text-success mt-4">success</p>'
        clearSignUpForm()
    }
}

//check email is in Local Storage before starting Login Function
function checkEmail(){
    usersContainer =  JSON.parse(localStorage.getItem('users'))
    for(var i = 0 ; i<usersContainer.length; i++){
        if(loginEmailInput.value == usersContainer[i].email && loginPasslInput.value == usersContainer[i].pass)
        {
            localStorage.setItem('userName',usersContainer[i].name)
            return false;
        }
        else{
            return true;
        }
    }
}

// Login Function
function login(){
    if(checkEmail() == false)
    {
        window.open("home.html", " _self");
        clearLoginForm()
    }
    else{
        inCorrect.innerHTML = '<p  class=" text-danger text-center mt-4">In Correct Email or Password</p>'
    }
}

// say Welcome 
var userNameFromLocal = localStorage.getItem("userName")
if(userNameFromLocal != null){

    if(document.getElementById("homeH"))
    {
        document.getElementById("homeH").innerHTML = "Welcome " + userNameFromLocal ;
    }
}

function logout() {
    localStorage.removeItem('userName')
}
//Clear SignUp Form Function
function clearSignUpForm(){
    signupUserNameInput.value = "";
    signupEmailInput.value = "";
    signupPassInput.value = "";
    
}

//Clear Login Form Function
function clearLoginForm(){
    loginEmailInput.value = "";
    loginPasslInput.value = "";
    inCorrect.classList.add("d-none")
}