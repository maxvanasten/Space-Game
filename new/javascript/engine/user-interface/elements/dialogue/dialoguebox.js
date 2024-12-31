class DialogueBox {
    constructor(leftSpeaker, rightSpeaker, leftTexture, rightTexture) {
        this.right = rightSpeaker;
        this.left = leftSpeaker;

        this.rightTexture = rightTexture;
        this.leftTexture = leftTexture;

        this.lines = []; //from voiceline object
        this.currentLine = 0;
        this.timer = 0;

        this.width = width / 2;
        this.height = width / 10;

        this.type = "dialoguebox";

        this.die = false;
    }

    addLine(voiceline) {
        this.lines.push(voiceline);
    }

    addOnFinished(func) {
        this.onFinished = func;
    }

    loop() {
        this.update();
        this.display();
    }

    update() {
        this.timer++;
        if (!this.die) {
            if (this.timer >= this.lines[this.currentLine].delay) {
                this.currentLine++;
                this.timer = 0;

                if (this.currentLine == this.lines.length) {
                    if (this.onFinished) {
                        this.onFinished();
                    }
                }
            }
        }
    }

    display() {
        // this.leftTexture.resize(200,200);
        // this.rightTexture.resize(200,200);
        //display
        if (this.currentLine > this.lines.length - 1) {
            this.die = true;
            return;
        }
        push();
        translate(
            -cam.x + width / 2 - this.width / 2,
            -cam.y + height - (this.height + 20)
        );

        //BACKGROUND
        // fill(
        //     core.uiOptions.textColor.r,
        //     core.uiOptions.textColor.g,
        //     core.uiOptions.textColor.b
        // );
        // rect(
        //     -width / 256,
        //     -width / 256,
        //     this.width + width / 128,
        //     this.height + width / 128
        // );
        //main window
        fill(
            core.uiOptions.mainColor.r,
            core.uiOptions.mainColor.g,
            core.uiOptions.mainColor.b,
            core.uiOptions.mainColor.a
        );
        rect(0, 0, this.width, this.height);

        //character icon left
        fill(100);
        noStroke();
        // // Green bg for speaking party
        if (this.lines[this.currentLine].position == "left") {
            fill(0, 255, 0);
            stroke(0, 255, 0);
            strokeWeight(3);
        }
        // Background for character icon LEFT
        rect(width / 128, width / 128, width / 16, width / 16);
        push();
        scale(-0.75, 0.75);
        image(this.leftTexture, -width / 8, 0, width / 8, width / 8);
        pop();

        //character name left
        fill(255);
        noStroke();
        textSize(width / 48);
        textAlign(CENTER);
        text(this.left, 0, width / 16, width / 8, width / 8);

        //character icon right
        fill(100);
        noStroke();
        // // Green bg for speaking party
        if (this.lines[this.currentLine].position == "right") {
            fill(0, 255, 0);
            stroke(0, 255, 0);
            strokeWeight(3);
        }
        // Background for character icon RIGHT
        // LEFT = rect(width / 128, width / 128, width / 16, width / 16);

        rect(this.width - width / 128, width / 128, -width / 16, width / 16);
        image(
            this.rightTexture,
            this.width - width / 10,
            0,
            width / 10,
            width / 10
        );

        //character name right
        fill(255);
        noStroke();
        textSize(width / 48);
        textAlign(LEFT);
        text(
            this.right,
            this.width - width / 8,
            width / 16,
            width / 2,
            width / 8
        );

        //text
        textSize(width / 60);
        textAlign(CENTER);
        noStroke();
        textFont(bitFont2);
        fill(
            core.uiOptions.textColor.r,
            core.uiOptions.textColor.g,
            core.uiOptions.textColor.b
        );
        text(
            this.lines[this.currentLine].text,
            width / 8,
            width / 64,
            this.width - width / 4,
            width / 2
        );

        pop();
    }
}
