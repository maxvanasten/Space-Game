// Balance
// Expedition fuel
// Engine boost
// Current quest name, objective and issuer

class ShipInformation {
    constructor() {
        this.type = "shipinformation";
        this.active = false;

        this.width = width / 4;
        this.height = width / 4;

        this.color = core.uiOptions["mainColor"];
        this.accentColor = core.uiOptions["accentColor"];
    }

    display() {
        if (this.active) {
            push();
            translate(vessel.pos.x + width / 16, vessel.pos.y - width / 6);
            // stroke(
            //     core.uiOptions["accentColor"].r,
            //     core.uiOptions["accentColor"].g,
            //     core.uiOptions["accentColor"].b
            // );

            //title
            // rectMode(CENTER);
            //rect(0, 0, this.width, width / 32);

            //main body
            fill(this.color.r, this.color.g, this.color.b, this.color.a);
            // rectMode(CENTER);
            rect(0, 0, this.width, this.height);

            fill(
                core.uiOptions.textColor.r,
                core.uiOptions.textColor.g,
                core.uiOptions.textColor.b,
                core.uiOptions.textColor.a
            );
            textSize(width / 48);
            textAlign(CENTER);
            text("Information", 0, width / 128, this.width, 50);

            textSize(24);
            textAlign(CENTER);
            fill(230, 230, 230, core.uiOptions.textColor.a);
            let final_text = `Balance: FG$${player.money.toFixed(
                2
            )}\nExpedition Fuel: ${vessel.fuel.toFixed(
                2
            )}/${vessel.maxFuel.toFixed(2)}\nEngine Boost: ${player.boosting}`;

            // Guild reputation
            let gr_text = `Guild Reputations:\n`;
            player.guild_reputation.forEach((guild_rep) => {
                gr_text += `${guild_rep.name}: ${guild_rep.reputation}/100\n`;
            });

            final_text += `\n\n${gr_text}`;

            text(final_text, 0, width / 24, this.width, this.height - 50);

            pop();
        }
    }
}
