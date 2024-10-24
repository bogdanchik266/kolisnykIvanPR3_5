// 📁 ui.js
export function updateLog($logs, message) {
  const newLog = document.createElement('p');
  newLog.innerText = message;
  $logs.prepend(newLog);
}

export function createClickCounter(maxClicks, $btnKick, $btnSpecialAttack, $clickCounter) {
  let clickCount = 0;
  return function () {
    if (clickCount < maxClicks) {
      clickCount++;
      $clickCounter.innerText = `Кількість натискань: ${clickCount}`;
      return true;
    } else {
      console.log('Досягнуто максимальну кількість натискань');
      $btnKick.disabled = true;
      $btnSpecialAttack.disabled = true;
      return false;
    }
  };
}
