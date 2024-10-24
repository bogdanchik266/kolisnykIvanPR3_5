// 📁 pokemon.js
export class Pokemon {
  constructor(name, defaultHP, elHP, elProgressbar) {
    this.name = name;
    this.defaultHP = defaultHP;
    this.damageHP = defaultHP;
    this.elHP = elHP;
    this.elProgressbar = elProgressbar;
  }

  renderHP() {
    this.renderHPlife();
    this.renderProgressbarHP();
  }

  renderHPlife() {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
  }

  renderProgressbarHP() {
    const hpPercentage = (this.damageHP * 100) / this.defaultHP;
    this.elProgressbar.style.width = `${hpPercentage}%`;

    if (hpPercentage > 50) {
      this.elProgressbar.style.backgroundColor = 'green';
    } else if (hpPercentage > 20) {
      this.elProgressbar.style.backgroundColor = 'yellow';
    } else {
      this.elProgressbar.style.backgroundColor = 'red';
    }
  }

  changeHP(count) {
    this.damageHP -= count;
    if (this.damageHP < 0) {
      this.damageHP = 0;
    }
    this.renderHP();
  }
}
