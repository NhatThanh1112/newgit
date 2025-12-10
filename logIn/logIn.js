const email = document.getElementById("email")
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");


function handleLogin(event){
    event.preventDefault()
    let mail = email.value;
    let pass = password.value;

    if(!mail || !pass){
        alert("Vui lòng điền đầy đủ thông tin")
    }

    firebase.auth().signInWithEmailAndPassword(mail, pass)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert("Đăng ký thành công")
            window.location.href = "../Home/sneaker.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

loginForm.addEventListener("submit", handleLogin)