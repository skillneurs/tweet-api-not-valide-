/*lien avec api*/
let usernamelogged ="";
if(localStorage.getItem("access_token")!=""){
  const accesstoken = localStorage.getItem("access_token");
  fetch("", {
    method: "GET",
    headers: {
      Authorization:` Bearer ${accesstoken},`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Utilisateur connecté :", data);
      
      nom.style.display="none"
    })
    
}
let lastTweetTs = 0;
function fetchMessages() {
  const promise = fetch(
    "" + lastTweetTs
  );

  promise
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error");
      }
    })
    .then((json) => {
      lastTweetTs = json.ts;
      const listtwuit = document.getElementById("twouit");
      json.messages.forEach((item) => {
        /* creation/affichage des twit */
        const boite = document.createElement("div");
        boite.className = "divboite";
        listtwuit.insertBefore(boite, listtwuit.firstChild);

        const pname = document.createElement("p");
        pname.textContent = "Name : " + item.name;

        const avatarimg = document.createElement("img");
        avatarimg.src = generateAvatarUrl(item.name, 50);
        pname.appendChild(avatarimg);
        boite.appendChild(pname);

        pname.className = "pname";

        const pmessage = document.createElement("p");
        pmessage.classList.add("pmessage");
        pmessage.textContent = "Message : " + item.message;
        boite.appendChild(pmessage);

        const containerAction = document.createElement("div");
        containerAction.className = "tweet-action-container";
        boite.appendChild(containerAction);

        const reactionContainer = document.createElement("div");
        reactionContainer.className = "reaction-container";
        containerAction.appendChild(reactionContainer);

        const supreact = document.createElement("button");
        supreact.textContent = "Del react";
        supreact.className = "testt";

        reactionContainer.appendChild(supreact);
        supreact.addEventListener("click", () => {
          displayReaction(reactionListContainer, (symbole) => {
            removeReactionService(item.id, symbole)
              .then(() => {
                return getTweet(item.id);
              })
              .then((tweetUpdated) => {
                reaction.innerHTML = "";
                Object.keys(tweetUpdated.data.reactions).forEach(
                  (uneReaction) => {
                    const li = document.createElement("li");
                    li.className = "reaction-item-element";
                    li.textContent = `${uneReaction} ${tweetUpdated.data.reactions[uneReaction]}`;
                    reaction.appendChild(li);
                  }
                );
              });
          });
        });
        const reactbouton = document.createElement("button");
        reactbouton.textContent = "React";
        reactbouton.classList.add("boutonreact");

        reactionContainer.appendChild(reactbouton);
        reactbouton.addEventListener("click", () => {
          displayReaction(reactionListContainer, (symbole) => {
            addReactionsService(item.id, symbole)
              .then(() => {
                return getTweet(item.id);
              })
              .then((tweetUpdated) => {
                reaction.innerHTML = "";
                Object.keys(tweetUpdated.data.reactions).forEach(
                  (uneReaction) => {
                    const li = document.createElement("li");
                    li.className = "reaction-item-element";
                    li.textContent = `${uneReaction} ${tweetUpdated.data.reactions[uneReaction]}`;
                    reaction.appendChild(li);
                  }
                );
              });
          });
        });

        const DISLIKE = document.createElement("button");
        DISLIKE.textContent = "👎";
        DISLIKE.classList.add("boutondislike");
        containerAction.appendChild(DISLIKE);

        const JAIME = document.createElement("button");
        JAIME.textContent = "👍";
        JAIME.classList.add("boutonlike");
        containerAction.appendChild(JAIME);

        const reactionListContainer = document.createElement("div");
        boite.appendChild(reactionListContainer);

        const counterContainer = document.createElement("div");
        counterContainer.className = "counter-container";
        boite.appendChild(counterContainer);

        const like = document.createElement("p");
        like.textContent = "Likes : " + item.likes;
        counterContainer.appendChild(like);

        const commentaire = document.createElement("p");
        commentaire.textContent = "Commentaire : " + item.comments_count;
        counterContainer.appendChild(commentaire);

        const reaction = document.createElement("ul");
        reaction.classList.add("listreaction");
        Object.keys(item.reactions).forEach((uneReaction) => {
          const li = document.createElement("li");
          li.className = "reaction-item-element";
          li.textContent = `${uneReaction} ${item.reactions[uneReaction]}`;
          reaction.appendChild(li);
        });
        counterContainer.appendChild(reaction);

        const com = document.createElement("button");
        com.classList.add("btncom");
        com.textContent = "Commentaire";
        boite.appendChild(com);

        const boitecom = document.createElement("div");
        boitecom.className = "boitecom";
        boite.appendChild(boitecom);

        /*like un twit*/

        JAIME.addEventListener("click", function () {
          likeService(item.id).then(() => {
            getTweet(item.id).then((tweetUpdated) => {
              like.textContent = "likes : " + tweetUpdated.data.likes;
            });
          });
        });

        /*dislike un twit*/

        DISLIKE.addEventListener("click", function () {
          const data = new URLSearchParams();
          data.append("message_id", item.id);

          fetch("", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
          }).then(() => {
            getTweet(item.id).then((tweetUpdated) => {
              like.textContent = "likes : " + tweetUpdated.data.likes;
            });
          });
        });

        /*afficher / publier com*/

        com.addEventListener("click", function () {
          const baseURL = "";

          const params = new URLSearchParams();
          params.append("message_id", item.id);

          const url = `${baseURL}?${params.toString()}`;

          fetch(url)
            .then((response) => {
              if (response.ok) {
                console.log(json);
                return response.json();
              } else {
              }
            })
            .then((json) => {
              json.comments.forEach((comment) => {
                const commentname = document.createElement("p");
                const commentElement = document.createElement("p");
                const sousboitecom = document.createElement("div");

                sousboitecom.className = "sousboite";

                commentname.textContent = `name :  ${comment.name}`;
                commentElement.textContent = `commentaire :  ${comment.comment}`;

                sousboitecom.appendChild(commentname);
                sousboitecom.appendChild(commentElement);

                boitecom.appendChild(sousboitecom);
              });
              const btnnewcom = document.createElement("button");
              btnnewcom.className = "btnnewcom";
              btnnewcom.textContent = "ADD com";
              boitecom.appendChild(btnnewcom);

              console.log(json);
              com.addEventListener("click", function () {
                boitecom.innerHTML = "";
              });
              btnnewcom.addEventListener("click", function () {
                const boiteNewCom = document.createElement("div");
                boiteNewCom.className = "boitenewcom";
                boitecom.appendChild(boiteNewCom);

                const inputcomNom = document.createElement("input");
                inputcomNom.className = "inputComNom";
                boitecom.appendChild(inputcomNom);
                inputcomNom.placeholder = "Nom";
                boiteNewCom.appendChild(inputcomNom);

                const inputcomMessage = document.createElement("input");
                inputcomMessage.className = "inputComMessage";
                boitecom.appendChild(inputcomMessage);
                inputcomMessage.placeholder = "Message";
                boiteNewCom.appendChild(inputcomMessage);

                const btnsendCom = document.createElement("button");
                btnsendCom.className = "btnsendCom";
                boitecom.appendChild(btnsendCom);
                btnsendCom.textContent = "Send";
                boiteNewCom.appendChild(btnsendCom);
                btnnewcom.addEventListener("click", function () {
                  boiteNewCom.innerHTML = "";
                });

                btnsendCom.addEventListener("click", function () {
                  const params = new URLSearchParams();

                  params.append("name", inputcomNom.value);
                  params.append("message_id", item.id);
                  params.append("comment", inputcomMessage.value);
                  inputcomNom.value = "";
                  inputcomMessage.value = "";
                  return fetch(
                    "",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: params,
                    }
                  ).then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                  });
                });
              });
            });
        });
      });
    });
}
fetchMessages();
setInterval(fetchMessages, 1000); /*{fetchMessages(lastTweetTs) }*/

/*envoyer un twit*/

const inputnom = document.getElementById("nom");
const inputnewtwit = document.getElementById("contenue");
const bouton = document.getElementById("button");
bouton.addEventListener("click", function () {
  const data = new URLSearchParams();
  data.append("name", inputnom.value);
  data.append("message", inputnewtwit.value);
  const token = localStorage.getItem("token");
  fetch("", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      inputnom.value = "";
      inputnewtwit.value = "";
    }
  });
});

/*afficher le twit le plus like*/

const BESTLIKE = document.getElementById("bestlike");

const ptest = document.getElementById("testp");

BESTLIKE.addEventListener("click", function () {
  const promise2 = fetch(
    ""
  );

  promise2
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error response");
      }
    })
    .then((json) => {
      const sectionbestlike = document.getElementById("besttwuit");
      sectionbestlike.classList.add("sectionbestlike");
      const pplike = document.getElementById("pplike");
      const ppname = document.getElementById("ppname");
      const ppmessage = document.getElementById("ppmessage");
      const ppcomment = document.getElementById("ppcomment");
      console.log(json.top);
      ppmessage.textContent = "message : " + json.top[0].message;
      ppname.textContent = "name : " + json.top[0].name;
      pplike.textContent = "likes : " + json.top[0].likes;
    });
});

/*message frec */
const btnfrec = document.getElementById("termes");

const baseURL = "";
fetch(baseURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
    }
  })
  .then((json) => {
    console.log(json);

    const keys = Object.keys(json);
    const values = Object.values(json);

    console.log(keys);
    console.log(values);

    const sectionfrec = document.createElement("bestfrec");
    sectionfrec.classList.add("bestfrec");

    const ppfrec1 = document.getElementById("frec1");
    const ppfrec2 = document.getElementById("frec2");
    const ppfrec3 = document.getElementById("frec3");

    ppfrec1.textContent = keys[0];
    ppfrec2.textContent = keys[1] ? keys[1] : "Non disponible";
    ppfrec3.textContent = values[0] ? values[0] : "Non disponible";

    console.log(keys[0]);
  });

/* afficher reaction */

function displayReaction(container, onSymbolSelect) {
  document.querySelectorAll(".reaction-list").forEach((item) => item.remove());

  fetch("")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error");
      }
    })
    .then((json) => {
      const reactions = json;
      const sectionReact = document.createElement("section");
      sectionReact.className = "reaction-list";
      container.appendChild(sectionReact);

      reactions.forEach((reactions) => {
        const reactionButton = document.createElement("button");
        reactionButton.textContent = reactions;
        sectionReact.append(reactionButton);

        reactionButton.addEventListener("click", () => {
          sectionReact.remove();
          onSymbolSelect(reactions);
        });
      });
    });
}
function generateAvatarUrl(username, size = 850) {
  return `=${encodeURIComponent(
    username
  )}&size=${size}`;
}


fetch("",{
  method:"GET",
  headers: {
    "content-type":"application/x-www-form-urlencoded",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((json) => {
    console.log(json)
 
    const toppUser1 = document.getElementById("topUser1");


    toppUser1.textContent =`Nombre total d'utilisateurs : ${json.user_count}`;
    Object.entries(json.influencers).forEach(([name, stats]) => {
      const textline = document.createElement('p')
      textline.textContent ="Pseudo : " + name + ", Commentaires : " + stats.comments + ", Messages : " + stats.messages
      const influserction = document.getElementById("bigUser")
      influserction.appendChild(textline)
    });
  })
  

const back = document.getElementById("back")
back.addEventListener("click", function () {

window.location = "index.html"

})

