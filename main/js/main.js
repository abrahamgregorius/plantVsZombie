import PVZ from "./pvz.js"

let btnInstruction = document.getElementById('instruction')
btnInstruction.addEventListener('click', () => {
    let instructionTab = document.querySelector('.instruction')
    instructionTab.style.display = instructionTab.style.display == 'none' ? 'block' : 'none'
})

let btnPlay = document.getElementById('play')
let usernameInput = document.getElementById('username')
usernameInput.addEventListener('input', () => {
    console.log('user input: ', usernameInput.value)
    if(usernameInput.value == '') btnPlay.setAttribute('disabled', true)
    else btnPlay.removeAttribute('disabled')
})

const pvz = new PVZ(document.getElementById('canvas'))
pvz.render()

btnPlay.addEventListener('click', () => {
    document.querySelector('.flex').style.display = 'none'
    document.querySelector('#canvas').style.display = 'block'

        
    pvz.render()
})