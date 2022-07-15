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

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  


  /// can't figure out yet
  closestCommonAncestor(vampire) {
    let visited = [];

    while (this.creator) {
      visited.push(this.creator.name);
      this.creator = this.creator.creator;
    }

    for (let vamp of visited) {
      if (vamp === vampire.creator) return vamp;
      vampire.creator = vampire.creator.creator;
    }
    return null;
  }
}


module.exports = Vampire;

