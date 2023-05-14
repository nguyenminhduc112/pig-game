'use strict';
// Các DOM
const player0EL = document.querySelector('.player--0')
const player1EL = document.querySelector('.player--1')
const currentScore0EL = document.getElementById('current--0')
const currentScore1EL = document.getElementById('current--1')
const score0EL = document.getElementById('score--0')
const score1EL = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnNewGame = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
// Các Biến Khởi Tạo
let playing = true
let currentScore = 0
let scores = [0, 0]
let activePlayer = 0
// Các Functions
const resetGame = () => {
    playing = true
    currentScore = 0
    activePlayer = 0
    scores = [0, 0]
    player0EL.classList.add('player--active')
    player1EL.classList.remove('player--active')
    currentScore1EL.textContent = 0
    currentScore0EL.textContent = 0
    score0EL.textContent = 0
    score1EL.textContent = 0
    diceEl.style.display = 'none'
    player0EL.classList.remove('player--winner')
    player1EL.classList.remove('player--winner')
}
const switchPlayer = () => {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    activePlayer = activePlayer === 0 ? 1 : 0
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}
// Reset game khi khởi đầu
resetGame()

// Xử lý sự kiện click vào roll dice
btnRoll.addEventListener('click', (e) => {
    // Kiểm tra game có đang được chơi
    if (playing) {
        // Roll và xem kết quả roll
        const diceNumber = Math.trunc(Math.random() * 6) + 1
        diceEl.style.display = 'block'
        diceEl.setAttribute('src', `dice-${diceNumber}.png`)
        // Kiểm tra nếu là dice là 1 thì sẽ chuyển người chơi
        if (diceNumber !== 1) {
            currentScore += diceNumber
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})
// Xử lý sự kiện click vào nút hold
btnHold.addEventListener('click', (e) => {
    // Kiểm tra game có đang được chơi
    if (playing) {
        // Chuyển điểm current hiện tại vào điểm tổng cho player đó
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        // Kiểm tra nếu player đó đủ 100 điểm thì dành chiến thắng
        if (scores[activePlayer] >= 100) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            diceEl.style.display = 'none'
        }
        // Chuyển người chơi
        switchPlayer()
    }
})

// Xử lý sự kiện click vào nút new game
btnNewGame.addEventListener('click', resetGame)
