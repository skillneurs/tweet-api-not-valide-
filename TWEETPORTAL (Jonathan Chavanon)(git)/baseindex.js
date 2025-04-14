const nonconect = document.getElementById("btnnoco")

const username = ""
const btnsendC = document.getElementById("btnsendC")

btnsendC.addEventListener("click", function () {


    const NameCreate = document.getElementById("namecreate")
    const mdpCreate = document.getElementById("mdpcreate")
    console.log(NameCreate , mdpCreate);
    
    const params = new URLSearchParams();

    params.append("username", NameCreate.value );
    params.append("password", mdpCreate.value);

   

    return fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
        const boitecreate = document.getElementById("creationcompte")
        const validation1 = document.createElement("h2")
        boitecreate.appendChild(validation1)
        validation1.textContent="COMPTE CREE !"
        NameCreate.value = "";
        mdpCreate.value = "";

    });
})


const btnsendL = document.getElementById("btnsendL")

btnsendL.addEventListener("click", function () {


    const Namelog = document.getElementById("namelog")
    const mdplog = document.getElementById("mdplog")
    console.log(mdplog , Namelog);
    
    const params = new URLSearchParams();

    params.append("username", Namelog.value );
    params.append("password", mdplog.value);

   
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
        localStorage.setItem('token', json.access_token);
        const validation = document.createElement("h2")
        const boitelog = document.getElementById("log")
        boitelog.appendChild(validation)
        validation.textContent = "CONNEXION REUSSI ! "
        const btnGo = document.createElement("button")
        boitelog.appendChild(btnGo)
        btnGo.textContent="GO TWEET"
        Namelog.value = "";
        mdplog.value = "";


        btnGo.addEventListener("click", function () {
        
            window.location = "tweet.html"
        
        })
        


    });
});


function ServiceTokenlog() {
    const token = localStorage.getItem('token')
    fetch('', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    .then(response => response.json())
    .then(data => {
     
    })

    .catch(error => console.error('Erreur :', error));

    
    
}


nonconect.addEventListener("click", function () {
        setTimeout(() => {
          window.location = "tweet.html"
        }, 3);
    

})