class Radar {
    constructor() {
        this.width = width / 6;
        this.height = width / 6;

        this.type == "radar";
        this.active = true;

        this.gw =
            this.width / (chunkLoader.totalWidth / chunkLoader.chunkWidth);
        this.gh =
            this.height / (chunkLoader.totalHeight / chunkLoader.chunkHeight);
    }

    generate() {
        this.v = {
            x: map(vessel.pos.x, 0, chunkLoader.totalWidth, 0, this.width),
            y: map(vessel.pos.y, 0, chunkLoader.totalHeight, 0, this.height),
        };

        this.m = {
            x: map(player.pos.x, 0, chunkLoader.totalWidth, 0, this.width),
            y: map(player.pos.y, 0, chunkLoader.totalHeight, 0, this.height),
        };
    }

    getVector(vector) {
        return createVector(
            map(vector.x, 0, chunkLoader.totalWidth, 0, this.width),
            map(vector.y, 0, chunkLoader.totalHeight, 0, this.height)
        );
    }

    drawPoint(vector, type) {
        // console.log(`Drawing point at ${vector} with type ${type}`);
        push();
        if (!type) type = "default";

        let radius;
        let color;
        switch (type) {
            case "objective":
                color = core.radarColors.objective;
                radius = 15;
                break;
            case "planet":
                color = core.radarColors.planet;
                radius = 30;
                break;
            case "vessel":
                color = core.radarColors.vessel;
                radius = 15;
                break;
            case "mothership":
                color = core.radarColors.mothership;
                radius = 20;
                break;
            default:
                color = {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 200,
                };
                radius = 10;
        }

        // translate(-cam.x + (width / 2 - this.width / 2), -cam.y + 15);
        fill(color.r, color.g, color.b, color.a);
        ellipse(vector.x, vector.y, radius);
        pop();
    }

    drawEnemy(vector) {
        push();
        translate(-cam.x, -cam.y + height - this.height);
        fill(255, 0, 0, 200);
        ellipse(vector.x, vector.y, 10);
        pop();
    }

    drawPlanet(planet) {
        push();
        translate(-cam.x, -cam.y + height - this.height);
        switch (planet.type.id) {
            case "gas_planet":
                fill(50, 230);
            case "guild_planet":
                fill(0, 255, 0, 230);
        }
        ellipse(planet.x, planet.y, 10);
        pop();
    }

    display(planets) {
        if (this.active) {
            push();
            translate(
                -cam.x + (width / 2 - this.width / 2),
                -cam.y + width / 128
            );
            //draw grid
            // for (let r = 0; r < chunkLoader.rows; r++) {
            //     for (let c = 0; c < chunkLoader.columns; c++) {
            //         fill(255);
            //         rect(r * this.gw, c * this.gh, this.gw, this.gh);
            //     }
            // }

            //background
            fill(
                core.uiOptions.mainColor.r,
                core.uiOptions.mainColor.g,
                core.uiOptions.mainColor.b,
                core.uiOptions.mainColor.a
            );
            rect(0, 0, this.width, this.height);

            //draw grid
            let gx = 0;
            let gy = 0;
            fill(255);
            stroke(
                core.uiOptions.textColor.r,
                core.uiOptions.textColor.g,
                core.uiOptions.textColor.b,
                core.uiOptions.textColor.a
            );
            strokeWeight(1);
            for (let r = 0; r < 10; r++) {
                gx += this.width / 10;
                gy += this.height / 10;
                line(0, gy, this.width, gy);
                line(gx, 0, gx, this.height);
            }

            // console.log(`Drawing mothership at ${this.getVector(player.pos)}`);
            this.drawPoint(this.getVector(player.pos), "mothership");
            this.drawPoint(this.getVector(vessel.pos), "vessel");

            strokeWeight(1);
            stroke(
                core.uiOptions.textColor.r,
                core.uiOptions.textColor.g,
                core.uiOptions.textColor.b,
                core.uiOptions.textColor.a
            );
            line(this.v.x, this.v.y, this.m.x, this.m.y);

            line(0, 0, 0, this.height);
            line(0, 0, this.width, 0);
            pop();
        }
    }
}
