
$(document).ready(function() {             
  $('#loginModal').modal('show');

  });

$('#loginModal').modal({
  backdrop: 'static',
  keyboard: false
});

const loginForm = document.getElementById("loginForm");
const username = document.getElementById('username');
const password = document.getElementById("password");
const user_err = document.getElementById('user_err');

function checkInputs() {
  if (username.value === "")
  { 
    username.style.border = "1px solid red";
    document.getElementById("user_div").style.color = "red";
    user_err.textContent = "Enter Username";
    username.focus();
    // return true
    
  } 
  else 
  {
    username.style.border = "1px solid green";
    document.getElementById("user_div").style.color = "green";
    user_err.textContent = "";
  }

  if (password.value === "")
  { 
    password.style.border = "1px solid red";
    document.getElementById("pass_div").style.color = "red";
    pass_err.textContent = "Enter Password";
    password.focus();
    // return true
    
  } 
  else 
  {
    password.style.border = "1px solid green";
    document.getElementById("user_div").style.color = "green";
    pass_err.textContent = "";
  }
}

function toToggle(){
  if(password.type === 'password'){
    password.type = 'text'
  }
  else{
    password.type = 'password';
  }
  // return false
}

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  checkInputs()
});

togglePassword.addEventListener('click', function (e) {
  e.preventDefault();
  toToggle();
});
