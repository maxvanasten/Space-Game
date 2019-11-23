class FPSCounter {
    constructor() {
        this.message = Math.floor(frameRate());
    }

    display() {
        this.message = Math.floor(frameRate());
        push();
        translate(-cam.x + (width-200), -cam.y + (height - 100));
        textSize(36);
        fill(255, 0, 0);
        noStroke();
        text(this.message+" frames", 0, 0, 200, 200);
        pop();
    }
}