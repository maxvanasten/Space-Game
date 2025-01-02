class QuestHandler {
    constructor() {
        this.quest = false;
    }

    loop() {
        this.update();
        this.renderPos();
    }

    trigger(name) {
        //find quest
        if (this.quest) {
            if (this.quest.name == name) {
                //found quest
                this.quest.trigger();
                return true;
            }

            console.error("Couldn't find quest '" + name + "'");
        }
    }

    update() {
        if (this.quest) {
            this.quest.update();
            player.quest = this.quest;

            if (this.quest.complete) {
                this.quest.active = false;
                // this.quests.splice(i, 1);
                player.quest = false;
                this.quest = false;
                this.quest.active = false;
            }

            if (this.quest.type == "location" && this.quest.active) {
                if (radar.active) {
                    radar.drawPoint(
                        radar.getVector(this.quest.location),
                        "objective"
                    );
                }
                push();
                translate(this.quest.location.x, this.quest.location.y);
                fill(255, 255, 0);
                ellipse(0, 0, 50);
                pop();
            }
        }
    }

    setQuest(quest) {
        //console.log(`In tutorial: ${player.inTutorial}`);
        if (!player.inTutorial) {
            //console.log("Setting quest");
            this.quest = quest;
            player.quest = quest;
        }
    }

    renderPos() {
        if (core.options["debug"]) {
            if (this.quest.triggerPos != undefined) {
                for (let j = 0; j < this.quest.triggerPos.length; j++) {
                    push();
                    translate(
                        this.quest.triggerPos[j].x,
                        this.quest.triggerPos[j].y
                    );
                    fill(100, 100, 0, 100);
                    ellipse(0, 0, this.quest.dupeDist * 2);
                    pop();
                }
            }
        }
    }
}
