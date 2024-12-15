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
  
  