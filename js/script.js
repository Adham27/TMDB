//Login&Logout Validation
const usernameInput = document.getElementById("usernameInput"); 
const userEmailInput = document.getElementById("userEmailInput"); 
const userPasswordInput = document.getElementById("userPasswordInput"); 
const signupBtn = document.getElementById("signupBtn"); 
let usersinfo;
if(localStorage.getItem("users") == null)
{
    usersinfo = [];
}else
{
    usersinfo = JSON.parse(localStorage.getItem("users"));
}
function signUp()
{
    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false)
    {
        let user = 
        {
            name:usernameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        }
        usersinfo.push(user)
        localStorage.setItem("users", JSON.stringify(usersinfo));
        const confirmMsg = document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");
        const signin = document.getElementById("signin")
        signin.classList.replace("d-none", "d-block");
    }
    else
    {
        const tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }

}
function usernameValidation()
{
    const usernameAlert = document.getElementById("usernameAlert");
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if( regex.test(usernameInput.value) == true && usernameInput.value != "")
    {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");
        return true
    }
    else
    {
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");
        return false
    }
}
function userPasswordValidation()
{
    let regex = /^.{5,15}$/;
    const userPasswordAlert = document.getElementById("userPasswordAlert");

    if( regex.test(userPasswordInput.value) == true && userPasswordInput.value != "")
    {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");
        return true
    }
    else
    {
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");
        return false
    }
}
function userEmailValidation()
{
    const userEmailAlert = document.getElementById("userEmailAlert");
    let regex = /@[a-z]{5,10}(\.com)$/;
    if( regex.test(userEmailInput.value) == true && userEmailInput.value != "")
    {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");
        return true
    }
    else
    {
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");
        return false
    }
}
function isExist()
{
    let accountExistMsg = document.getElementById("accountExistMsg");
    for(let i = 0; i < usersinfo.length; i++)
    {
        if(usersinfo[i].name.toLowerCase() == usernameInput.value.toLowerCase() || usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase())
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            usernameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            userPasswordInput.classList.remove("is-valid");
            return true
        }
    }
    return false
}
function userInputsValidation()
{
    usernameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (usernameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
}
var username = localStorage.getItem("sessionUsername");
function login()
{
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    let loginBtn = document.getElementById("loginBtn");
    let wrongMsg = document.getElementById("wrongMsg");

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        let fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false
    }

    for(var i = 0; i < usersinfo.length; i++)
    {
        if(usersinfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() && usersinfo[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            localStorage.setItem('sessionUsername', usersinfo[i].name)
            loginBtn.setAttribute("href", "welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
        }
    }
}
function logout() {
    localStorage.removeItem('sessionUsername')
}
//----------------------------------------------------------
//API Request
//----------------------------------------------------------
var myHttpRequest =new XMLHttpRequest();
var allMovies;
let prev=document.getElementById("prev");
let next=document.getElementById("next");
let current=0;
function fetch(){
    var url = `https://api.themoviedb.org/3/trending/all/day?api_key=23352f989a08152f8fd63eb5b07afed3&page=${current}`;
    myHttpRequest.open("GET",url);
    myHttpRequest.send();
    myHttpRequest.addEventListener("readystatechange",function(){
    if(myHttpRequest.readyState==4&&myHttpRequest.status==200){
        allMovies= JSON.parse(myHttpRequest.response).results;
       document.getElementById("currentPage").innerHTML=current; 
        displayPost();
    }
});
}

function nextPage(){
    current++;
    fetch();
}
function prevPage(){
    current--;
    fetch();
}
function displayPost(){
    var box=``;
    for(var i=0;i<allMovies.length;i++){
        box+=`<div class="col-md-3 ">
        <div class="Movie position-relative ">
        <img src="http://image.tmdb.org/t/p/w500${allMovies[i].poster_path} " class="w-100 movie">
        <h3>${allMovies[i].title||allMovies[i].name}</h3>
        <p class="overView">${allMovies[i].overview.split(" ").slice(0,25).join(" ")}</p>
        <div class="vote bg-danger p-2 font-weight-bolder position-absolute">${allMovies[i].vote_average.toFixed(1) }</div>
        </div>
        </div>`;
    }
    document.getElementById("rowData").innerHTML=box;
}


