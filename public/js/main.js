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
  
  // L'utilisateur crée les héros
  function createHeroes(){
    const totalHp = 150
    const totalAttack = 120
    let remainingHp = totalHp
    let remainingAttack = totalAttack

    const roles = ["guerrier", "mage", "archer"]
    const heroes = []

    for (const role of roles){
        console.log(`\nCréation du ${role.toUpperCase()}`)
        const name = prompt(`Entrez un nome pour le ${role}: `)

        // Assurer au moins 1 HP par héros
        const hp = parseInt(prompt(`Attribuez des points de vie (reste : ${remainingHp}): `))
        if (hp < 1 || hp > remainingHp){
            console.log("Valeur invalide. Assurez-vous de respecter les points restants.")
            return createHeroes()
        }
        remainingHp -= hp

        // Assurer au moins 1 point d'attaque par héros
        const attack = parseInt(prompt(`Attribuez des points d'attaque (reste: ${remainingAttack}): `))
        if (attack < 1 || attack > remainingAttack){
            console.log("Valeur invalide. Assurez-vous de respecter les points restants.")
            return createHeroes()
        }
        remainingAttack -= attack

        const posture = prompt(`Choisissez la posture initiale (attaque/défense): `).toLowerCase()
        if (posture !== "attaque" && posture !== "défense"){
            console.log("Posture invalide. Par défaut, attaque sera utilisée.")
        }

        const hero = new Hero(name, hp, attack, role)
        hero.posture = posture || "attaque"
        heroes.push(hero)
    }

    return heroes
  }

  // Classe pour créer les Boss
  class Boss {
    constructor(name, hp, attack){
        this.name = name
        this.hp = hp
        this.attack = attack
    }
  }

  // Création des Boss
  const bosses = [
    new Boss("Sauron", 250, 35),
    new Boss("Chronos", 300, 30),
    new Boss("Lilith", 200, 40),
  ]

  // Sélection aléatoire d'un boss
  function selectRandomBoss(){
    return bosses[Math.floor(Math.random() * bosses.length)]
  }

  
