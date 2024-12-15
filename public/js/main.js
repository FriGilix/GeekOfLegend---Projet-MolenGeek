// Classe pour créer les héros
class Hero {
    constructor(name, hp, attack, role) {
      this.name = name;
      this.hp = hp;
      this.attack = attack;
      this.role = role;
      this.posture = "attaque"; // Par défaut, la posture est "attaque"
  
      // Particularités des rôles
      if (role === "guerrier") this.rage = 0;
      if (role === "mage") this.mana = 7;
      if (role === "archer") this.arrows = 6;
    }
  
    // Méthode pour attaquer
    attackBoss(boss) {
      let damage = this.attack;
  
      if (this.posture === "attaque") {
        damage *= 1.2; // Bonus de 20% en posture d'attaque
      }
  
      if (this.role === "guerrier" && this.rage >= 4) {
        damage *= 1.25; // Bonus de 25% avec 4 points de rage
        this.rage = 0; // Réinitialisation de la rage
      }
  
      if (this.role === "mage") {
        if (this.mana >= 2) {
          this.mana -= 2; // Consomme 2 points de mana
        } else {
          console.log(`${this.name} récupère 7 points de mana.`);
          this.mana += 7; // Récupère 7 points de mana
          return;
        }
      }
  
      if (this.role === "archer") {
        if (this.arrows >= 2) {
          this.arrows -= 2; // Consomme 2 flèches
        } else {
          console.log(`${this.name} récupère 6 flèches.`);
          this.arrows += 6; // Récupère 6 flèches
          return;
        }
      }
  
      console.log(`${this.name} inflige ${Math.round(damage)} dégâts à ${boss.name}.`);
      boss.hp -= Math.round(damage);
    }
  
    // Méthode appelée lorsque le boss attaque ce héros
    takeDamage(damage) {
      if (this.posture === "défense") {
        damage /= 2; // Réduit les dégâts de moitié
      }
      this.hp -= Math.round(damage);
      if (this.hp < 0) this.hp = 0;
    }
  
    // Fin du tour
    endTurn() {
      if (this.role === "guerrier") {
        this.rage += 1; // Le guerrier gagne 1 point de rage à la fin du tour
      }
    }
  }
  
  // Fonction pour créer les héros avec entrée utilisateur
  function createHeroes() {
    const totalHp = 150;
    const totalAttack = 120;
    let remainingHp = totalHp;
    let remainingAttack = totalAttack;
  
    const roles = ["guerrier", "mage", "archer"];
    const heroes = [];
  
    for (const role of roles) {
      console.log(`\nCréation du ${role.toUpperCase()}`);
      const name = prompt(`Entrez un nom pour le ${role}: `);
  
      // Assurer au moins 1 HP par héros
      const hp = parseInt(prompt(`Attribuez des points de vie (reste: ${remainingHp}): `));
      if (hp < 1 || hp > remainingHp) {
        console.log("Valeur invalide. Assurez-vous de respecter les points restants.");
        return createHeroes();
      }
      remainingHp -= hp;
  
      // Assurer au moins 1 point d'attaque par héros
      const attack = parseInt(prompt(`Attribuez des points d'attaque (reste: ${remainingAttack}): `));
      if (attack < 1 || attack > remainingAttack) {
        console.log("Valeur invalide. Assurez-vous de respecter les points restants.");
        return createHeroes();
      }
      remainingAttack -= attack;
  
      const posture = prompt(`Choisissez la posture initiale (attaque/défense): `).toLowerCase();
      if (posture !== "attaque" && posture !== "défense") {
        console.log("Posture invalide. Par défaut, attaque sera utilisée.");
      }
  
      const hero = new Hero(name, hp, attack, role);
      hero.posture = posture || "attaque";
      heroes.push(hero);
    }
  
    return heroes;
  }
  
  // Classe pour créer les Boss
  class Boss {
    constructor(name, hp, attack) {
      this.name = name;
      this.hp = hp;
      this.attack = attack;
    }
  }
  
  // Création des boss
  const bosses = [
    new Boss("Sauron", 250, 35),
    new Boss("Chronos", 300, 30),
    new Boss("Lilith", 200, 40),
  ];
  
  // Sélection aléatoire d'un boss
  function selectRandomBoss() {
    return bosses[Math.floor(Math.random() * bosses.length)];
  }
  
  // Fonction pour choisir un héros aléatoire encore vivant
  function getRandomHero(heroes) {
    const aliveHeroes = heroes.filter((hero) => hero.hp > 0);
    if (aliveHeroes.length === 0) return null;
    return aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
  }
  
  // Fonction pour afficher l'état actuel des personnages
  function displayStatus(heroes, boss) {
    console.log("\n--- État des personnages ---");
    heroes.forEach((hero) => {
      console.log(
        `${hero.name}: ${hero.hp > 0 ? hero.hp : "KO"} HP | Posture: ${hero.posture} | ${
          hero.role === "guerrier"
            ? `Rage: ${hero.rage}`
            : hero.role === "mage"
            ? `Mana: ${hero.mana}`
            : `Flèches: ${hero.arrows}`
        }`
      );
    });
    console.log(`${boss.name}: ${boss.hp > 0 ? boss.hp : "KO"} HP`);
    console.log("-----------------------------\n");
  }
  
  // Liste des énigmes
  const enigmas = [
    { question: "Je suis un nombre pair, mais je deviens impair si on me retire une lettre. Qui suis-je ?", answer: "huit" },
    { question: "Qu'est-ce qui monte et descend sans bouger ?", answer: "un escalier" },
    { question: "Je commence la nuit, et je finis le matin. Qui suis-je ?", answer: "la lettre n" },
  ];
  
  // Fonction pour poser une énigme
  function poseEnigma() {
    const enigma = enigmas[Math.floor(Math.random() * enigmas.length)];
    console.log(`Enigme : ${enigma.question}`);
  
    for (let i = 0; i < 3; i++) {
      const answer = prompt("Votre réponse : ").toLowerCase();
      if (answer === enigma.answer) {
        console.log("Bravo ! Vous avez résolu l'énigme. Le boss est vaincu !");
        return true;
      } else {
        console.log("Mauvaise réponse.");
      }
    }
  
    console.log("Échec ! Les héros sont décimés par le boss.");
    return false;
  }
  
  // Boucle du jeu
  function playGame() {
    console.log("Début de la création des héros...");
    const heroes = createHeroes();
  
    console.log("Choix aléatoire du boss...");
    const boss = selectRandomBoss();
    console.log(`Le boss choisi est ${boss.name} avec ${boss.hp} HP et ${boss.attack} ATK!\n`);
  
    console.log("Début du combat !\n");
    displayStatus(heroes, boss);
  
    while (true) {
      // Tour des héros
      for (const hero of heroes) {
        if (hero.hp > 0 && boss.hp > 0) {
          hero.attackBoss(boss);
          if (boss.hp <= 0) {
            boss.hp = 0;
            console.log("Le boss est vaincu ! Les héros gagnent !\n");
            displayStatus(heroes, boss);
            return;
          }
  
          // Vérifier si l'énigme doit être posée
          if (boss.hp > 0 && boss.hp <= boss.hp * 0.2) {
            if (poseEnigma()) return;
            else return;
          }
        }
      }
  
      displayStatus(heroes, boss);
  
      // Tour du boss
      if (boss.hp > 0) {
        const targetHero = getRandomHero(heroes);
        if (targetHero) {
          console.log(`${boss.name} attaque ${targetHero.name} pour ${boss.attack} dégâts !`);
          targetHero.takeDamage(boss.attack);
          if (targetHero.hp <= 0) {
            targetHero.hp = 0;
            console.log(`${targetHero.name} est KO !`);
          }
        }
      }
  
      displayStatus(heroes, boss);
  
      // Fin du tour pour les héros
      heroes.forEach((hero) => {
        if (hero.hp > 0) hero.endTurn();
      });
  
      // Vérification si tous les héros sont KO
      if (heroes.every((hero) => hero.hp <= 0)) {
        console.log("Tous les héros sont vaincus. Le boss gagne !\n");
        return;
      }
    }
  }
  
  // Lancer le jeu
  playGame();
  