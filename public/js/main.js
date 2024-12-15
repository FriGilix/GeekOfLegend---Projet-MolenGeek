// Créer les héros
class Hero {
    constructor(name, hp, attack, role){
        this.nom = nom
        this.hp = hp
        this.attaque = attaque 
        this.role = role 
        this.posture = "attaque" // Par défaut

        // Rôles
        if (role === "guerrier") this.rage = 0
        if (role === "mage") this.mana = 7
        if (role === "archer") this.arrows = 6
    }

    // Attaquer
    attackBoss(boss){
        let damage = this.attaque

        if (this.posture === "attaque"){
            damage *= 1.2 // Bonus 20% d'attaque
        }

        if (this.role === "guerrier" && this.rage >= 4){
            damage *= 1.25 // Bonus 25% avec 4 points de rage
            this.rage = 0 // Réinitialisation de l'ulti
        }

        if (this.role === "mage"){
            if (this.mana >= 2){
                this.mana -= 2 // Consomme 2 points de mana
            } else {
                console.log (`${this.nom} récupère 7 points de mana.`)
                this.mana += 7 // Récupère 7 points de mana
                return
            }

            if (this.role === "archer") {
                if (this.arrows >= 2) {
                  this.arrows -= 2; // Consomme 2 flèches
                } else {
                  console.log(`${this.nom} récupère 6 flèches.`);
                  this.arrows += 6; // Récupère 6 flèches
                  return;
                }
              }
        }
}