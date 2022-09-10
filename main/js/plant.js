import Pea from './pea.js'

const images = []
for (let i = 0; i <= 30; i++) {
    let image = new Image
    let currentFrame = i.toString().padStart(2, '0')
    image.src =`../../MODULE_CLIENT_MEDIA/Sprites/PeaShooter/frame_${currentFrame}_delay-0.12s.gif`
    images.push(image)
}

export default class Plant {
    w = 82
    h = 90
    constructor(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
        this.frame = 0

        setInterval(() => {
            this.update()
            }, 120)
     } 
    
    draw(ctx) {
        ctx.drawImage(images[this.frame], this.x, this.y, this.w, this.h)
    
    }

    shoot() {
        return new Pea(this.x + 60, this.y + 10, false)
    }

    update() {
        if(this.frame >= images.length - 1) this.frame = 0
        else this.frame++
    }
}