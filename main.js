const $btn = document.getElementById('btn-kick');
const $logs = document.getElementById('logs');


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
    `${character.name} поперхнулся, и за это ${enemy.name} с испугу приложил прямой удар коленом в лоб врага.`,
    `${character.name} забылся, но в это время наглый ${enemy.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${character.name} пришел в себя, но неожиданно ${enemy.name} случайно нанес мощнейший удар.`,
    `${character.name} поперхнулся, но в это время ${enemy.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${character.name} удивился, а ${enemy.name} пошатнувшись влепил подлый удар.`,
    `${character.name} высморкался, но неожиданно ${enemy.name} провел дробящий удар.`,
    `${character.name} пошатнулся, и внезапно наглый ${enemy.name} беспричинно ударил в ногу противника`,
    `${character.name} расстроился, как вдруг, неожиданно ${enemy.name} случайно влепил стопой в живот соперника.`,
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


$btn.addEventListener('click', function () {
    console.log('Kick');
    const characterDamage = random(20);
    const enemyDamage = random(20);

    character.changeHP(characterDamage);
    enemy.changeHP(enemyDamage);


    const logMessage = generateLog(character, enemy, characterDamage, enemy.damageHP, enemyDamage, character.damageHP);
    

    const randomLog = logs[random(logs.length) - 1]; // -1 for indexing
    

    $logs.innerHTML = `<p>${logMessage}</p>` + `<p>${randomLog}</p>` + $logs.innerHTML; // Add log at the top

    checkWinner();
});


function checkWinner() {
    if (character.damageHP === 0) {
        alert(enemy.name + ' wins!');
        $btn.disabled = true;
    } else if (enemy.damageHP === 0) {
        alert(character.name + ' wins!');
        $btn.disabled = true;
    }
}


init();
