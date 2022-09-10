const greenPea = new Image
greenPea.src = '../../MODULE_CLIENT_MEDIA/Sprites/General/Pea.png'

const icePea = new Image
icePea.src = '../../MODULE_CLIENT_MEDIA/Sprites/General/IcePea.png'

export default class Pea {
    constructor(x, y, isIce) {
        this.x = x;
        this.y = y;
        this.w = 25
        this.h = 25
        this.isIce = isIce;
    }


    draw(ctx) {
        const peaImage = this.isIce == true ? icePea : greenPea
        
        if(peaImage.complete) {
            ctx.drawImage(peaImage, this.x, this.y, this.w, this.h) 
            }    
    }

    update() {
        this.x++
    }
    
    
}