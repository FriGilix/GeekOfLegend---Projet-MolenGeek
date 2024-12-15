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
}