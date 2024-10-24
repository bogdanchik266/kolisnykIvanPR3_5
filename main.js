const $btnKick = document.getElementById('btn-kick');
const $btnSpecialAttack = document.getElementById('btn-special-attack');
const $logs = document.getElementById('logs');
const $clickCounter = document.getElementById('click-counter');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),

    renderHP: function() {
        this.renderHPlife();
        this.renderProgressbarHP();
    },

    renderHPlife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },

    renderProgressbarHP: function() {
        const hpPercentage = (this.damageHP * 100 / this.defaultHP);
        this.elProgressbar.style.width = hpPercentage + '%';

        if (hpPercentage > 50) {
            this.elProgressbar.style.backgroundColor = 'green';
        } else if (hpPercentage > 20) {
            this.elProgressbar.style.backgroundColor = 'yellow';
        } else {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    },

    changeHP: function(count) {
        this.damageHP -= count;
        if (this.damageHP < 0) {
            this.damageHP = 0;
        }
        this.renderHP();
    }
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),

    renderHP: function() {
        this.renderHPlife();
        this.renderProgressbarHP();
    },

    renderHPlife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },

    renderProgressbarHP: function() {
        const hpPercentage = (this.damageHP * 100 / this.defaultHP);
        this.elProgressbar.style.width = hpPercentage + '%';

        if (hpPercentage > 50) {
            this.elProgressbar.style.backgroundColor = 'green';
        } else if (hpPercentage > 20) {
            this.elProgressbar.style.backgroundColor = 'yellow';
        } else {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    },

    changeHP: function(count) {
        this.damageHP -= count;
        if (this.damageHP < 0) {
            this.damageHP = 0;
        }
        this.renderHP();
    }
};

// Attack logs
const logs = [
    `${character.name} вспомнил что-то важное, но неожиданно ${enemy.name}, не помня себя от испуга, ударил в предплечье врага.`,
    `${character.name} поперхнулся, и за это ${enemy.name} с испуга приложил прямой удар коленом в лоб врага.`,
    `${character.name} забылся, но в это время наглый ${enemy.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${character.name} пришел в себя, но неожиданно ${enemy.name} случайно нанес мощнейший удар.`,
    `${character.name} поперхнулся, но в это время ${enemy.name} нехотя раздробил кулаком противника.`,
    `${character.name} удивился, а ${enemy.name} пошатнувшись влепил подлый удар.`,
    `${character.name} высморкался, но неожиданно ${enemy.name} провел дробящий удар.`,
    `${character.name} пошатнулся, и внезапно наглый ${enemy.name} беспричинно ударил в ногу противника.`,
    `${character.name} расстроился, как вдруг, неожиданно ${enemy.name} случайно влепил стопой в живот сопернику.`,
    `${character.name} пытался что-то сказать, но вдруг, неожиданно ${enemy.name} со скуки, разбил бровь сопернику.`
];

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, damageDealt, firstPersonRemainingHP, enemyDamage, enemyRemainingHP) {
    return `${firstPerson.name} атаковал ${secondPerson.name} на ${damageDealt} HP. Залишилось HP у ${firstPerson.name}: ${firstPersonRemainingHP}. ${secondPerson.name} атаковал ${firstPerson.name} на ${enemyDamage} HP. Залишилось HP у ${secondPerson.name}: ${enemyRemainingHP}.`;
}

function attackCharacter(attacker, defender, damage) {
    defender.changeHP(damage);
    return damage;
}

function handleAttack(isSpecialAttack = false) {
    const characterDamage = isSpecialAttack ? random(30) : random(20); // Спеціальна атака завдає 30 шкоди
    const enemyDamage = random(20);

    attackCharacter(character, enemy, characterDamage);
    attackCharacter(enemy, character, enemyDamage);

    const logMessage = generateLog(character, enemy, characterDamage, character.damageHP, enemyDamage, enemy.damageHP);
    const randomLog = logs[random(logs.length) - 1]; // -1 for indexing

    $logs.innerHTML = `<p>${logMessage}</p><p>${randomLog}</p>` + $logs.innerHTML; // Add log at the top

    checkWinner();
}

const clickHandler = createClickCounter(6);

function createClickCounter(maxClicks) {
    let clickCount = 0;
    return function () {
        if (clickCount < maxClicks) {
            clickCount++;
            $clickCounter.innerText = `Кількість натискань: ${clickCount}`; // Оновлення тексту на сторінці
            return true;
        } else {
            console.log('Досягнуто максимальну кількість натискань');
            $btnKick.disabled = true;
            $btnSpecialAttack.disabled = true;
            return false;
        }
    };
}

$btnKick.addEventListener('click', function () {
    if (clickHandler()) {
        handleAttack(false); // Звичайна атака
    }
});

$btnSpecialAttack.addEventListener('click', function () {
    if (clickHandler()) {
        handleAttack(true); // Спеціальна атака
    }
});

function checkWinner() {
    if (character.damageHP === 0) {
        alert(enemy.name + ' wins!');
        $btnKick.disabled = true;
        $btnSpecialAttack.disabled = true;
    } else if (enemy.damageHP === 0) {
        alert(character.name + ' wins!');
        $btnKick.disabled = true;
        $btnSpecialAttack.disabled = true;
    }
}

init();
