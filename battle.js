// 📁 battle.js
import { Pokemon } from './pokemon.js';

export function attackCharacter(attacker, defender, damage) {
  defender.changeHP(damage);
  return damage;
}

export function generateLog(firstPerson, secondPerson, damageDealt) {
  return `${firstPerson.name} атакував ${secondPerson.name} на ${damageDealt} HP. Залишилось HP у ${firstPerson.name}: ${firstPerson.damageHP}.`;
}

export function checkWinner(character, enemy) {
  if (character.damageHP === 0) {
    alert(`${enemy.name} wins!`);
    return true;
  } else if (enemy.damageHP === 0) {
    alert(`${character.name} wins!`);
    return true;
  }
  return false;
}
