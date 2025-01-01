class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = canvas.getContext("2d");
    }

    push() {
        this.ctx.save();
    }

    pop() {
        this.ctx.restore();
    }
}
