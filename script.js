document.addEventListener('DOMContentLoaded', function() {
    let coupleArr = [];

    document.body.addEventListener('click', function(event) {
        const target = event.target;
        const startButton = document.querySelector('.start');
        const settingsButton = document.querySelector('.settings');
        const exitButton = document.querySelector('.exit');
        const submitButton = document.querySelector('.settings-submit');
        const container = document.body.querySelector('.container');
        let cardsNumber = 4;
        let doubleCardValues;

        function removeMainMenu() {
            document.querySelectorAll('button').forEach(function(btn) {
                btn.remove();
            })
            document.querySelector('h1').remove();
        }

        let pushStart = () => {
            let cardsList = document.createElement('div');
            let timerText = document.createElement('p');

            if (cardsNumber == 0 || cardsNumber == 1 || cardsNumber == 3 || cardsNumber == 5 || cardsNumber == 7 || cardsNumber == 9 || cardsNumber > 10 ) {
                cardsNumber = 4;
            }

            removeMainMenu();
            cardsList.classList.add('card-list');
            document.body.querySelector('.container').append(cardsList);
            
            doCardValues();
            console.log(doubleCardValues)

            for ( let i = 1; i<=cardsNumber*cardsNumber; i++) {
                const cards = document.createElement('div');
                cards.classList.add('card', 'card--' + `${cardsNumber}`);
                cards.textContent = doubleCardValues[i-1];
                document.body.querySelector('.card-list').append(cards);
            }

            let startTimer = () => {
                let numberSeconds = 60;
                timer = setInterval (tick, 1000);
                
                timerText.classList.add('timer')
                container.append(timerText);
                document.querySelector('.timer').innerHTML = 'До конца игры осталось ' + numberSeconds + ' cекунд';

                function tick() {
                  if (numberSeconds > 0) {
                    numberSeconds -= 1;
                    console.log(numberSeconds)
                  }
                  document.querySelector('.timer').innerHTML = 'До конца игры осталось ' + numberSeconds + ' cекунд';
        
                  if (numberSeconds == 0) {
                    let startGameButton = document.createElement('button');
                    let exitButton = document.createElement('button');
                    let gameOver = document.createElement('h1');
                    
                    clearTimeout(timer);
                    document.querySelector('.card-list').remove();
                    document.querySelector('.timer').remove();
                    gameOver.classList.add('game-over-title');
                    gameOver.textContent = 'Вы проиграли!'
                    startGameButton.classList.add('start', 'start-button');
                    startGameButton.textContent = 'Играть снова?';
                    exitButton.classList.add('exit', 'exit-button');
                    exitButton.textContent = 'Выход';

                    container.append(gameOver);
                    container.append(startGameButton);
                    container.append(exitButton);
                  } else {
                    timer;
                    return timer;
                  }
                }
            }
            startTimer();
        }

        let pushSettings = () => {
            const settingsTitle = document.createElement('h1');
            const settingsInput = document.createElement('input');
            const settingsSubmit = document.createElement('button');

            removeMainMenu();
            settingsTitle.textContent = 'Укажите количество карточек по вертикали и горизонтали';
            settingsInput.classList.add('settings-input');
            settingsSubmit.classList.add('settings-submit');
            settingsInput.setAttribute('type', 'number');
            settingsInput.setAttribute('min', '2');
            settingsInput.setAttribute('max', '10');
            settingsSubmit.textContent = 'Начать игру';
            container.append(settingsTitle);
            container.append(settingsInput);
            container.append(settingsSubmit);
        }

        let pushExit = () => {
            removeMainMenu();
            let h1 = document.createElement('h1');
            h1.textContent = 'Спасибо за игру!'
            container.append(h1)
            setTimeout(function() {
                window.close();
            }, 5000)
        }

        let doCardValues = () => {
            let cardValues = [];

            for (let i = 1; i < (cardsNumber*cardsNumber)/2+1; i++) {
                const random = Math.floor(Math.random() * (0+8))
                cardValues.push(random)
            }
            doubleCardValues = cardValues.concat(cardValues);
            shuffle(doubleCardValues);
            console.log(doubleCardValues)
        }

        let shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1)); 
    
              [array[i], array[j]] = [array[j], array[i]];
            }
        }

        let checkCouple = () => {
            coupleArr.push(target.textContent)
            console.log(coupleArr);
            if (coupleArr.length == 2) {
                if (coupleArr[0] == coupleArr[1]) {
                    document.querySelectorAll('.card--active').forEach(function(item) {
                        item.classList.remove('card--active');
                        item.classList.add('card--couple');
                        coupleArr = [];
                    })
                } else {
                    document.querySelectorAll('.card--active').forEach(function(item) {
                        coupleArr = [];
                        setTimeout(function() {
                            item.classList.remove('card--active')
                            item.classList.remove('card--white')
                        }, 700);
                    })
                }
            }
            
        }

        let checkComplete = () => {
            const winTitle = document.createElement('h1');
            let coupleCardCount = 0;

            winTitle.textContent = 'Победа!';
            winTitle.classList.add('win-title');
            
            document.querySelectorAll('.card').forEach(function(card) {
                if (card.classList.contains('card--couple')) {
                    coupleCardCount++;
                }
            })

            if (coupleCardCount == document.querySelectorAll('.card').length) {
                let startGameButton = document.createElement('button');
                let exitButton = document.createElement('button');

                document.querySelector('.card-list').remove();
                clearTimeout(timer);

                startGameButton.classList.add('start', 'start-button');
                startGameButton.textContent = 'Играть снова?';
                exitButton.classList.add('exit', 'exit-button');
                exitButton.textContent = 'Выход';
                document.querySelector('.timer').remove();

                container.append(winTitle);
                container.append(startGameButton);
                container.append(exitButton);
            }
        }

        if (target == startButton) {
            pushStart();
        }

        if (target == settingsButton) {
            pushSettings();
        }

        if (target == exitButton) {
            pushExit();
        }

        if (target == submitButton) {
            cardsNumber = document.querySelector('.settings-input').value;
            document.querySelector('input').remove();
            pushStart();
            console.log(cardsNumber)
        }

        if (target.classList.contains('card')) {
            if (target.classList.contains('card--couple')) {
                return;
            }
            if (!target.classList.contains('card--active')) {
                
                target.classList.add('card--active');
                setTimeout(function() {
                    target.classList.add('card--white');
                }, 200)
                checkCouple();
                checkComplete();
            }
        }

    })
})