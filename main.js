// main.js

// Утиліта для випадкових чисел
const random = num => Math.ceil(Math.random() * num);

// Генерація журналу атак
const generateLog = (firstPerson, secondPerson, damageDealt, firstPersonRemainingHP, enemyDamage, enemyRemainingHP) =>
    `${firstPerson.name} атакував ${secondPerson.name} на ${damageDealt} HP. Залишилось HP у ${firstPerson.name}: ${firstPersonRemainingHP}. ${secondPerson.name} атакував ${firstPerson.name} на ${enemyDamage} HP. Залишилось HP у ${secondPerson.name}: ${enemyRemainingHP}.`;

// Клас для Pokemon
class Pokemon {
    constructor(name, defaultHP, elHP, elProgressbar) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;
    }

    renderHP = () => {
        this.renderHPlife();
        this.renderProgressbarHP();
    };

    renderHPlife = () => {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    };

    renderProgressbarHP = () => {
        const hpPercentage = (this.damageHP * 100) / this.defaultHP;
        this.elProgressbar.style.width = `${hpPercentage}%`;

        if (hpPercentage > 50) {
            this.elProgressbar.style.backgroundColor = 'green';
        } else if (hpPercentage > 20) {
            this.elProgressbar.style.backgroundColor = 'yellow';
        } else {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    };

    changeHP = count => {
        this.damageHP -= count;
        if (this.damageHP < 0) {
            this.damageHP = 0;
        }
        this.renderHP();
    };
}

// Змінні для елементів та подій
const $btnKick = document.getElementById('btn-kick');
const $btnSpecialAttack = document.getElementById('btn-special-attack');
const $logs = document.getElementById('logs');
const $clickCounter = document.getElementById('click-counter');
const $remainingClicks = document.getElementById('remaining-clicks');

const maxClicks = 6;
let clickCount = 0;

const character = new Pokemon(
    'Pikachu',
    100,
    document.getElementById('health-character'),
    document.getElementById('progressbar-character')
);

const enemy = new Pokemon(
    'Charmander',
    100,
    document.getElementById('health-enemy'),
    document.getElementById('progressbar-enemy')
);

// Журнал випадкових фраз атак
const logs = [
    `${character.name} вспомнив щось важливе, несподівано був атакований ${enemy.name}.`,
    `${character.name} подавився, а ${enemy.name} злякавшись вдарив ворога.`,
    `${character.name} задумався, але ${enemy.name} підкравшись ззаду, ударив.`,
    `${character.name} отямився, але ${enemy.name} наніс несподіваний удар.`,
    `${character.name} засмутився, але раптом ${enemy.name} вдарив у живіт супротивника.`,
    `${character.name} спробував щось сказати, але ${enemy.name} несподівано розбив йому брову.`
];

const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
    updateRemainingClicks();
};

const attackCharacter = (attacker, defender, damage) => {
    defender.changeHP(damage);
    return damage;
};

const handleAttack = (isSpecialAttack = false) => {
    const characterDamage = isSpecialAttack ? random(30) : random(20);
    const enemyDamage = random(20);

    attackCharacter(character, enemy, characterDamage);
    attackCharacter(enemy, character, enemyDamage);

    const logMessage = generateLog(character, enemy, characterDamage, character.damageHP, enemyDamage, enemy.damageHP);
    const randomLog = logs[random(logs.length) - 1];

    $logs.innerHTML = `<p>${logMessage}</p><p>${randomLog}</p>` + $logs.innerHTML;

    checkWinner();
};

const updateRemainingClicks = () => {
    const remainingClicks = maxClicks - clickCount;
    $remainingClicks.innerText = `Залишилося натискань: ${remainingClicks}`;
};

const createClickCounter = () => {
    return () => {
        if (clickCount < maxClicks) {
            clickCount++;
            $clickCounter.innerText = `Кількість натискань: ${clickCount}`;
            updateRemainingClicks();
            return true;
        } else {
            console.log('Досягнуто максимальну кількість натискань');
            $btnKick.disabled = true;
            $btnSpecialAttack.disabled = true;
            return false;
        }
    };
};

const clickHandler = createClickCounter();

$btnKick.addEventListener('click', () => {
    if (clickHandler()) {
        handleAttack(false);
    }
});

$btnSpecialAttack.addEventListener('click', () => {
    if (clickHandler()) {
        handleAttack(true);
    }
});

const checkWinner = () => {
    if (character.damageHP === 0) {
        alert(enemy.name + ' wins!');
        $btnKick.disabled = true;
        $btnSpecialAttack.disabled = true;
    } else if (enemy.damageHP === 0) {
        alert(character.name + ' wins!');
        $btnKick.disabled = true;
        $btnSpecialAttack.disabled = true;
    }
};

init();
