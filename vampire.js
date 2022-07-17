class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let totalToOriginal = 0;
    let current = this;

    while (current.creator) {
      totalToOriginal++;
      current = current.creator;
    }
    return totalToOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal;
  }
  
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) return this;
    
    // if not found, search offspring
    for (let next of this.offspring) {
      // assign result to variable so it can be returned if found
      let find = next.vampireWithName(name);
      if (find) return find;
    }
    
    return null;
  }
  
  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    
    for (let next of this.offspring) {
      total++;
      total += next.totalDescendents;
    }
    return total;
  }
  
  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let result = [];
    
    // condition to push into arr
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    
    // recursive
    for (let next of this.offspring) {
      const vamps = next.allMillennialVampires;
      result = result.concat(vamps);
    }
    return result;
  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  
  closestCommonAncestor(vampire) {
    // arrays to store path to root from both vampires
    const thisParentsArr = [this];
    const vampireParentsArr = [vampire];

    // iterate through this vampire's parents
    let currentThis = this;
    while (currentThis.creator) {
      // add parent to array
      thisParentsArr.push(currentThis.creator);
      // move to parent of this vampire
      currentThis = currentThis.creator;
    }

    // iterate through vampire's parents
    while (vampire.creator) {
      // add parent to array
      vampireParentsArr.push(vampire.creator);
      // move to parent of this vampire
      vampire = vampire.creator;
    }

    // compare arrays, return first item that matches
    for (let i = 0; i < thisParentsArr.length; i++) {
      // value for current item in array
      let current = thisParentsArr[i];
      // loop through vampire's parents
      for (let j = 0; j < vampireParentsArr.length; j++) {
        if (current === vampireParentsArr[j]) {
          return current;
        }
      }
    }
  }
}

module.exports = Vampire;

