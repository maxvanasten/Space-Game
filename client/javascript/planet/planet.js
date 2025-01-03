class Planet {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.name = core.getPlanetName();

        // this.r = random() * 250;
        // this.r = map(random(), 0, 1, 150, 300);
        this.r = 200;

        this.buffer = this.r / 6;

        this.triggerCD = 200;
        this.cd = 0;

        this.triggerDistance = 100;
        this.triggered = 1;
        this.cooldown = 500;
        this.current = 500;

        this.texture = textureHandler.getPlanetTexture();
        this.type = planetHandler.getType();
    }

    loop() {
        this.update();
        this.render();
    }

    update() {
        this.cd--;
        this.current++;
        if (this.current >= this.cooldown) {
            this.current = 0;
            this.triggered = 0;
        }
        //check vessel
        let v;
        if (player.isVessel) {
            v = vessel;
        } else {
            v = player;
        }
        if (v.pos.dist(this.pos) <= this.triggerDistance) {
            player.addVisited({
                x: this.pos.x,
                y: this.pos.y,
                name: this.name,
                type: "planet",
            });
            if (keyIsDown(32)) {
                // Add visited
                if (this.type.id == "gas_planet") {
                    //check for money
                    if (player.money >= core.gameOptions["fuelCost"]) {
                        //check for full tank
                        if (v.fuel < v.maxFuel) {
                            v.fuel += v.refuelSpeed;
                            if (v.maxFuel - v.fuel < v.refuelSpeed) {
                                v.fuel = v.maxFuel; //IF REFUEL 0.5 fuel 999,7 fuel = 1000 != 1000,3
                            }
                            player.money -= core.gameOptions["fuelCost"];
                        } else {
                            let u = new Banner("Fuel tank full.");
                            u.lifespan = 250;
                            ui.addElement(u);
                        }
                    } else {
                        let u = new Banner("Not enough money.");
                        u.lifespan = 250;
                        ui.addElement(u);
                    }
                }
            } else {
                let u = new UIAlert(
                    "Interact",
                    "Press the spacebar to interact with this planet."
                );
                ui.addElement(u);
            }
        }
        if (vessel.pos.dist(this.pos) <= this.triggerDistance) {
            if (keyIsDown(32)) {
                //console.log("PRESS");
                if (this.type.id == "guild_planet") {
                    //console.log(`Guild planet: ${this.guild.name}`);
                    if (!this.triggered) {
                        this.triggered = 1;
                        //console.log(`TRIGGERING`);
                        if (!player.quest) {
                            this.guild.getQuest(player);
                            player.questData["planet"] = this;
                        }
                    }
                }
                // if (this.type == "enemy_planet") {
                //     if (!this.triggered) {
                //         this.triggered = 1;
                //         //spawn players
                //         for (let i = 0; i < 10; i++) {
                //             let xOffset = (Math.random()*100)-50;
                //             let yOffset = (Math.random()*100)-50;
                //             let e = new Enemy(vessel.pos.x + xOffset, vessel.pos.y + yOffset, "normal");
                //             enemies.push(e);
                //         }
                //     }
                // }
            } else {
                let u = new UIAlert(
                    "Interact",
                    "Press the spacebar to interact with this planet."
                );
                ui.addElement(u);
            }
        }

        //check cursor
        if (cursor.check(this.pos, this.r / 2)) {
            let b;
            if (this.guild) {
                b = new Banner(`${this.name} [${this.guild.name}]`, 10, true);
            } else {
                b = new Banner(`${this.name} [Fuel]`, 10, true);
            }
            ui.addElement(b);
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);

        if (core.options["debug"]) {
            fill(255, 100);
            noStroke();
            ellipse(0, 0, this.r);
        } else if (this.texture != undefined) {
            imageMode(CENTER);
            image(this.texture, 0, 0, this.r, this.r);
        }

        //emissive ring
        if (core.options["debug"]) {
            // fill(255, 255, 255, 100);
            // noStroke();
            noFill();
            stroke(0, 0, 255, 255);
            ellipse(0, 0, this.r + this.buffer);
        }
        pop();
    }
}
