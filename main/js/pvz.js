import Plant from './plant.js'
import Zombie from './zombie.js'
import Sun from './sun.js'

const backgroundImage = new Image
backgroundImage.src= '../../MODULE_CLIENT_MEDIA/Sprites/General/Background.jpg'

export default class PVZ {
    sun = 50
    seeds = []
    name
    score = 0
    time = 0
    isHoldingSeed = false // true/falsenya
    holdingSeed = null // seed yang sedang di hold
    isHoldingShovel = false
    leaderboard = []
    plants = []
    peas = []
    suns = []
    zombies = []
    mowers = []
    blocks = []

    constructor(canvas) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext('2d')

        this.startTimer()
        this.createBlocks()
        this.createZombies()
        this.createSuns()
        this.eventListener()
    }

    createSuns() {
        setInterval(() => {
            const random = (min, max) => Math.random() * (max - min) + min
            this.suns.push(new Sun(random(50, this.canvas.width - 50)))
            console.log('Sun created!')
        },3000)
    }

    createZombies() {
        setInterval(() => {
            let createdZombie = new Zombie()
            this.zombies.push(createdZombie)
            console.log('Zombie created!', createdZombie);
        }, 5000)
    }

    createBlocks(){
        let row = 5
        let col = 8
        let w = 82
        let h = 90

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let x = j * w + 90
                let y = i * h + 120
                const block = {
                    x,
                    y,
                    w, 
                    h,
                    plant: new Plant(x, y, "PeaShooter")
                }
                this.blocks.push(block)

                if(block.plant.name == "PeaShooter" || block.plant.name == "IcePea") {
                    setInterval(() => {
                        let newPea = block.plant.shoot()
                        this.peas.push(newPea)
                    }, 3000)
                }
        }
    }
}

    startTimer(){
        setInterval(() => {
            this.time++
        }, 1000)
    }
    
    draw() {
        this.ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height)
        this.drawStats()
        this.drawBlocks()
        this.drawPeas()
        this.drawZombies()
        this.drawSun()
    }

    drawSun() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = 'bold 16px Arial'
        this.ctx.fillText(this.sun, 138, 88)
        this.ctx.fill()

        this.suns.forEach(sun => {
            sun.draw(this.ctx)
            sun.update()
        })

        /* this.suns.forEach(sun => {

        }) */
    }

    drawZombies() {
        this.zombies.forEach(zombie => {
            zombie.draw(this.ctx)
            zombie.update()
        })
    }

    drawPeas(){
        this.peas.forEach(pea => {
            pea.draw(this.ctx)
            pea.update()
        })
        
    }

    drawBlocks(){
        this.blocks.forEach(block => {
            this.ctx.strokeRect(block.x, block.y, block.w, block.h)
            block.plant.draw(this.ctx)
        })
    }


    drawStats() {
        this.ctx.fillStyle = "white"
        this.ctx.font = "20px Arial"

        const formatTimer = () => {
            let minute = Math.floor(this.time/ 60).toString().padStart(2, '0')
            let second = (this.time % 60).toString().padStart(2, '0')
            return `${minute}:${second}`
        }

        this.ctx.fillText("Player: " + this.name, 440, 40) 
        this.ctx.fillText("Score: " + this.score, 440,60) 
        this.ctx.fillText("Time: " + formatTimer(), 440, 80) 

    }

    update() {
        this.x++
        this.checkZombieHit()
    }

    checkPea() {
        this.peas.forEach((pea, peaIndex) => {
            if(pea.x > this.canvas.width) this.peas.splice(peaIndex, 1)
        })
    }

    checkZombieHit() { 
        this.zombies.forEach((zombie, zombieIndex) => {
            this.peas.forEach((pea, peaIndex) => {
                if(pea.x + pea.w > zombie.x &&
                    pea.y > zombie.y &&
                    pea.y < zombie.y + zombie.h) {
                        // Remove the pea from array
                        this.peas.splice(peaIndex, 1)

                        let isDie = zombie.hit(pea.isIce)
                        if(isDie) {
                            this.zombies.splice(zombieIndex, 1)
                            console.log('zombie die!')
                        }
                    }
            })
        })
     }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw()
        this.update()
        requestAnimationFrame(() => this.render())   
    }
    
    eventListener() {
        document.addEventListener('click', e => {
            let rect = this.canvas.getBoundingClientRect()
            let clickLocation = {
                x: e.clientX - rect.x,
                y: e.clientY - rect.y
            }

            this.suns.forEach((sun, sunIndex) => {
                if(clickLocation.x > sun.x &&
                    clickLocation.x < sun.x + sun.w &&
                    clickLocation.y > sun.y &&
                    clickLocation.y < sun.y + sun.h) {
                        console.log('Sun is clicked!')
                        this.sun += 25

                        this.suns.splice(sunIndex, 1)
                    }
            })
        })
    }
}