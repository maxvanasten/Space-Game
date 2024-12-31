class Dashboard {
    constructor() {
        this.type = "dashboard";

        this.color = core.uiOptions["mainColor"];
        this.accentColor = core.uiOptions["accentColor"];
        this.active = true;
    }

    display() {
        // console.log("DISPLAYING DASHBOARD");
        push();
        stroke(
            core.uiOptions["accentColor"].r,
            core.uiOptions["accentColor"].g,
            core.uiOptions["accentColor"].b
        );

        // const x = -cam.x + (width - width / 4);
        // const y = -cam.y + width / 2 - width / 32;
        let p_x,
            p_y = 0;
        if (player.isVessel) {
            p_x = vessel.pos.x;
            p_y = vessel.pos.y;
        } else {
            p_x = player.pos.x;
            p_y = player.pos.y;
        }
        const x = p_x + width / 3 - width / 64;
        const y = p_y + height / 4 - height / 16;
        translate(x, y);

        //MAIN information
        fill(
            core.uiOptions["mainColor"].r,
            core.uiOptions["mainColor"].g,
            core.uiOptions["mainColor"].b,
            core.uiOptions["mainColor"].a
        );

        rect(0, width / 64, width / 6, height / 4);

        // textSize(width / 64);
        // fill(255);
        // let v = "";
        // if (player.isVessel) {
        //     v = "Exploration Vessel (HP: " + vessel.health + ")";
        // } else {
        //     v = "The Mothership (HP: " + vessel.health + ")";
        // }
        // text(v, 0, width / 48, width / 4, width / 8);

        fill(
            core.uiOptions["mainColor"].r,
            core.uiOptions["mainColor"].g,
            core.uiOptions["mainColor"].b,
            core.uiOptions["mainColor"].a
        );
        //Coordinates
        textAlign(LEFT);
        textSize(width / 64);
        fill(
            core.uiOptions.textColor.r,
            core.uiOptions.textColor.g,
            core.uiOptions.textColor.b,
            core.uiOptions.textColor.a
        );
        let vessel_type = "Unknown vessel";
        if (player.isVessel) {
            vessel_type = "EV-1";
        } else {
            vessel_type = "The mothership";
        }
        let vessel_text = `Vessel: ${vessel_type}`;
        text(vessel_text, width / 256, width / 64, width / 4, width / 8);
        let motherShipCoords =
            "[X=" +
            chunkLoader.chunks[player.chunk].r +
            ":Y=" +
            chunkLoader.chunks[player.chunk].c +
            "]" +
            ` (${core.options.chunks}X${core.options.chunks}, ${core.info.total_planets})`;
        text(motherShipCoords, width / 256, width / 32, width / 4, width / 8);
        //fuel level
        let fuel, velocity;
        if (player.isVessel) {
            fuel = "Fuel: " + vessel.fuel.toFixed(2) + "/" + vessel.maxFuel;
            velocity = "Velocity: " + vessel.vel.mag().toFixed(2);
        } else {
            fuel = "Fuel: " + player.fuel.toFixed(2) + "/" + player.maxFuel;
            velocity = "Velocity: " + player.vel.mag().toFixed(2);
        }
        text(fuel, width / 256, width / 22, width / 4, width / 8);
        //Balance
        let balance = "FG$" + player.money.toFixed(2);
        text(balance, width / 256, width / 16, width / 4, width / 8);
        let engine_boost = "Engine Boost: " + player.boosting;
        text(engine_boost, width / 256, width / 12, width / 4, width / 8);
        text(velocity, width / 256, width / 10, width / 8, width / 8);

        //quest log
        // fill(core.uiOptions["mainColor"].r, core.uiOptions["mainColor"].g, core.uiOptions["mainColor"].b);
        // rect(50, 220, 200, 100);
        let quest_name, quest_objective, quest_giver;
        if (player.quest.name) {
            quest_name = player.quest.name;
            quest_objective = player.quest.objective.task;
            quest_giver = player.quest.giver;
            if (player.quest.amount > 0) {
                quest_objective += " (" + player.quest.objective.current + ")";
            }
        }

        if (quest_name != "No Quest") {
            fill(
                core.uiOptions.textColor.r,
                core.uiOptions.textColor.g,
                core.uiOptions.textColor.b,
                core.uiOptions.textColor.a
            );
            let quest_text = `"${quest_name}"\n${quest_objective}\n[${quest_giver}]`;
            textAlign(CENTER);
            text(
                quest_text,
                -width / 10,
                -(height / 2 + height / 8),
                width / 4,
                height / 2
            );
            // rect(
            //     -width / 10,
            //     -(height / 2 + height / 8),
            //     width / 4,
            //     height / 2
            // );
        }

        pop();
    }
}
