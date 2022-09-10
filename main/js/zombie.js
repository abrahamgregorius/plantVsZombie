import { randomArray } from "./utils.js"

const images = []
    for (let i = 0; i <= 30; i++) {
        let image = new Image
        let currentFrame = i.toString().padStart(2, '0')
        image.src =`../../MODULE_CLIENT_MEDIA/Sprites/Zombie/frame_${currentFrame}_delay-0.05s.gif`
        images.push(image)
    }

export default class Zombie {
    constructor() {
        this.x = 800
        this.y = randomArray([100, 200, 300, 390, 480])
        this.w = 70
        this.h = 90
        this.hp = 100
        this.frame = 0
    
        setInterval(() => this.updateFrame(), 50)
    }

    hit(isIce)  {
        if(isIce) this.hp -= 100/7
        else this.hp -= 100/5

        if(this.hp <=0) {
            return true
        }
        return false
    }


    draw(ctx) {
        ctx.drawImage(images[this.frame], this.x, this.y, this.w, this.h)
    
    }

    shoot() {
        return new Zombie(this.x + 60, this.y + 10, false)
    }

    updateFrame() {
        if(this.frame >= images.length - 1) this.frame = 0
        else this.frame++
    }

    update() {
        this.x--
    }
}