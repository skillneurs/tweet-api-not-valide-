
//ce fichier JS est fait a 80% par chatGPT :


// Sélection des éléments
const square = document.getElementById("square");
const portalOrange = document.getElementById("portal-orange");
const portalBlue = document.getElementById("portal-blue");

// Variable pour suivre l'état de téléportation
let recentlyTeleported = false;
let lastPortal = null; // Pour garder une trace du dernier portail utilisé

// Fonction pour détecter les collisions
function isColliding(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// Animation du carré via GSAP
function teleportSquare() {
  // Récupère la transformation actuelle
  const currentTransform = square.style.transform;
  // Si le carré entre en collision avec le portail orange
  if (isColliding(square, portalOrange) && !recentlyTeleported) {
    gsap.to(square, {
      duration: 0.3,
      scale: 0,
      onComplete: () => {
        // Changer la position du carré au portail bleu
        square.style.top = `${portalBlue.offsetTop + 25}px`;
        square.style.left = `${portalBlue.offsetLeft + 25}px`;
        // Réappliquer la transformation après l'animation
        gsap.to(square, {
          duration: 0.3,
          scale: 1,
          onComplete: () => {
            recentlyTeleported = true; // Marquer que le carré vient de réapparaître
            lastPortal = "blue"; // Marquer le dernier portail comme bleu
            square.style.transform = currentTransform; // Réappliquer la transformation
          },
        });
      },
    });
  }
  // Si le carré entre en collision avec le portail bleu
  if (isColliding(square, portalBlue) && !recentlyTeleported) {
    gsap.to(square, {
      duration: 0.3,
      scale: 0,
      onComplete: () => {
        // Changer la position du carré au portail orange
        square.style.top = `${portalOrange.offsetTop + 25}px`;
        square.style.left = `${portalOrange.offsetLeft + 25}px`;
        // Réappliquer la transformation après l'animation
        gsap.to(square, {
          duration: 0.3,
          scale: 1,
          onComplete: () => {
            recentlyTeleported = true; // Marquer que le carré vient de réapparaître
            lastPortal = "orange"; // Marquer le dernier portail comme orange
            square.style.transform = currentTransform; // Réappliquer la transformation
          },
        });
      },
    });
  }
}

// Fonction pour vérifier si le carré sort du dernier portail où il a été téléporté
function checkExitPortal() {
  if (lastPortal === "orange" && !isColliding(square, portalOrange)) {
    recentlyTeleported = false; // Réinitialiser l'état après avoir quitté le portail orange
  }
  if (lastPortal === "blue" && !isColliding(square, portalBlue)) {
    recentlyTeleported = false; // Réinitialiser l'état après avoir quitté le portail bleu
  }
}

// Déplacement du carré (avec les flèches du clavier)
document.addEventListener("keydown", (event) => {
  const step = 10; // Distance de déplacement

  const squareRect = square.getBoundingClientRect();

  switch (event.key) {
    case "ArrowUp":
      square.style.top = `${square.offsetTop - step}px`;
      square.style.transform = "rotate(-90deg) scaleX(1)";
      break;
    case "ArrowDown":
      square.style.top = `${square.offsetTop + step}px`;
      square.style.transform = "rotate(90deg) scaleX(1)";

      break;
    case "ArrowLeft":
      square.style.transform = "rotate(0deg) scaleX(-1)";
      square.style.left = `${square.offsetLeft - step}px`;
      break;
    case "ArrowRight":
      square.style.transform = "rotate(0deg) scaleX(1)";
      square.style.left = `${square.offsetLeft + step}px`;
      break;
  }

  // Vérifier la collision après le déplacement
  teleportSquare();
  checkExitPortal(); // Vérifier si le carré quitte son dernier portail
});

// Vérification continue si le carré est en dehors de son dernier portail
setInterval(checkExitPortal, 50); // Vérification toutes les 50ms
