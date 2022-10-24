window.addEventListener('DOMContentLoaded', ()=> {
    // Объявление переменных
        // Блоки html
    const stopwatch = document.querySelector('.main__stopwatch'),
        minutesBlock = document.querySelector('.main__num_minutes'),
        secondsBlock = document.querySelector('.main__num_seconds'),
        millisecondsBlock = document.querySelector('.main__num_milliseconds'),
        controlBlock = document.querySelector('.main__control'),
        controlButtons = document.querySelectorAll('[data-control]'),
        lapsBlock = document.querySelector('.sidebar__laps')
        // Значения переменных
    let minutesVal, secondsVal, millisecondsVal, stopwatchTimer, totalTime, pauseTime = 0

    // Отслеживание клика на функциональные блоки
    controlButtons.forEach((btn, i) => {
        btn.addEventListener('click', ()=> {
            const animationWave = btn.querySelector('.main__anim')

            // Назначение функций в зависимости от кнопки
            switch (btn.getAttribute('data-control')) {
                case 'start' :
                    btn.children[0].classList.add('active')
                    startStopwatch()
                    btn.setAttribute('data-control', 'pause')

                    controlButtons[2].classList.remove('main__button_active')
                    // Цвет анимации
                    animationWave.style.cssText = `
                        border: 2px solid rgba(255, 45, 85, 0.6);
                        box-shadow: -5px -5px 8px rgba(255, 45, 85, 0.1), 5px 5px 7px rgba(255, 45, 85, 0.4),
                        inset -3px -3px 4px #F2F4F800, inset 3px 3px 3px #AEB8C000;
                    `
                    break
                case 'pause' :
                    if (stopwatchTimer) {
                        pauseStopwatch()
                    } else {
                        startStopwatch()
                    }

                    btn.children[0].classList.remove('active')
                    btn.setAttribute('data-control', 'start')
                    // Цвет анимации
                    animationWave.style.cssText = `
                        border: 2px solid rgba(52, 199, 89, 0.6);
                        box-shadow: -5px -5px 8px rgba(52, 199, 89, 0.1), 5px 5px 7px rgba(52, 199, 89, 0.4),
                        inset -3px -3px 4px #F2F4F800, inset 3px 3px 3px #AEB8C000;
                    `
                    break
                case 'lap' :
                    fixLap(
                        getZero(minutesVal),
                        getZero(secondsVal),
                        getZero(millisecondsVal)
                    )
                    lapsBlock.scrollTop = lapsBlock.scrollHeight

                    break
                case 'reset' :
                    resetStopwatch()
                    controlButtons[0].children[0].classList.remove('active')
                    controlButtons[0].setAttribute('data-control', 'start')
                    lapsBlock.innerHTML = ''

                    break
            }

            animationWave.classList.add('anim')

            btn.addEventListener('animationend', () => {
                animationWave.classList.remove('anim')
            })
        })
    })

    function startStopwatch() {
        const startTime = new Date()
        pauseStopwatch()
        stopwatchTimer = setInterval(countValues, 10)

        function countValues() {
            const tickTime = new Date()

            if (pauseTime >= 0) {
                totalTime = tickTime - startTime + pauseTime
            } else {
                totalTime = tickTime - startTime
            }

            millisecondsVal = Math.floor((totalTime / 10) % 100)
            secondsVal = Math.floor((totalTime / 1000) % 60)
            minutesVal = Math.floor((totalTime / (1000*60)) % 60)

            minutesBlock.textContent = getZero(minutesVal)
            secondsBlock.textContent = getZero(secondsVal)
            millisecondsBlock.textContent = getZero(millisecondsVal)
        }
        pauseTime = +totalTime
    }

    function pauseStopwatch() {
        clearInterval(stopwatchTimer)
    }

    function resetStopwatch() {
        totalTime = 0
        clearInterval(stopwatchTimer)
        minutesBlock.textContent = '00'
        secondsBlock.textContent = '00'
        millisecondsBlock.textContent = '00'
    }

    function getZero(num) {
        if (num < 10) {
            return `0${num}`
        } else return num
    }

    function fixLap (min, sec, ms) {
        if (!min) return
        if (!sec) return
        if (!ms) return

        lapsBlock.innerHTML += `
            <li class="sidebar__lap">
                ${min}:${sec},${ms}
            </li>
        `
    }

})