const names = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password");
const btn = document.getElementById("btn")
const registerForm = document.getElementById("register")

function handleRegister(event) {
    event.preventDefault()
    let name = names.value;
    let mail = email.value;
    let pass = password.value;

    if (!name || !mail || !pass) {
        alert("Vui lòng nhập đầy đủ các thông tin")
    }

    firebase.auth().createUserWithEmailAndPassword(mail, pass)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            let userData = {
                name,
                mail,
                pass
            }
            window.location.replace('../login/logIn.html')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`Lỗi: ${errorMessage}`);
            console.log(errorMessage)
        });
}

registerForm.addEventListener("submit", handleRegister)
