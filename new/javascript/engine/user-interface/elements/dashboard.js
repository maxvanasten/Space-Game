class Dashboard {
    constructor() {
        this.type = "dashboard";

        this.color = core.uiOptions["mainColor"];
        this.accentColor = core.uiOptions["accentColor"];
    }

    display() {
        push();
        stroke(
            core.uiOptions["accentColor"].r,
            core.uiOptions["accentColor"].g,
            core.uiOptions["accentColor"].b
        );

        translate(
            -cam.x + (width - width / 4),
            -cam.y + width / 2 - width / 32
        );

        //MAIN information
        fill(this.color.r, this.color.g, this.color.b, this.color.a);

        rect(0, width / 64, width / 4, width / 16);

        // textSize(width / 64);
        // fill(255);
        // let v = "";
        // if (player.isVessel) {
        //     v = "Exploration Vessel (HP: " + vessel.health + ")";
        // } else {
        //     v = "The Mothership (HP: " + vessel.health + ")";
        // }
        // text(v, 0, width / 48, width / 4, width / 8);

        fill(this.color.r, this.color.g, this.color.b);
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
        //Mothership fuel level
        let fuel = "Fuel: " + player.fuel.toFixed(2) + "/" + player.maxFuel;
        text(fuel, width / 256, width / 22, width / 4, width / 8);
        //Balance
        let balance = "FG$" + player.money.toFixed(2);
        text(balance, width / 256, width / 16, width / 4, width / 8);

        //quest log
        // fill(this.color.r, this.color.g, this.color.b);
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
            text(quest_text, 0, -width / 2 + width / 16, width / 4, width / 8);
        }

        pop();
    }
}
