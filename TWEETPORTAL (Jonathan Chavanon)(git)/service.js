
/* envoyer twit*/

async function likeService(tweetId) {
  const data = new URLSearchParams();
  data.append("message_id", tweetId);
  return fetch("https://touiteur.cefim-formation.org/likes/send", {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

async function getTweet(tweetId) {
  return fetch("https://touiteur.cefim-formation.org/get?id=" + tweetId).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
    }
  );
}

/* reaction ajouter*/

async function addReactionsService(tweetId, symbol) {
  const data = new URLSearchParams();
  data.append("message_id", tweetId);
  data.append("symbol", symbol);
  return fetch("https://touiteur.cefim-formation.org/reactions/add", {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

/* remove react */

async function removeReactionService(tweetId, symbol) {
  const data = new URLSearchParams();
  data.append("message_id", tweetId);
  data.append("symbol", symbol);

  return fetch("https://touiteur.cefim-formation.org/reactions/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

