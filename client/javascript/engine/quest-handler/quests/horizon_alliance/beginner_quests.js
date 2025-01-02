const horizon_alliance_beginner = (player) => {
    let planet1 = chunkLoader.getPlanet();
    let planet2 = chunkLoader.getPlanet();

    let material_name = core.getMaterialName();
    let material_amount = Math.floor(Math.random() * 100) + 50;

    // Quest rewards
    let money_reward = 100 + player.getGuildRep("horizon_alliance") * 10;
    let rep_reward = Math.floor(Math.random() * 10) + 5;

    //intro dialogue
    let d = new DialogueBox(
        "You",
        "Trade Envoy",
        textureHandler.getPlayer(),
        textureHandler.getAlien(5)
    );
    d.addLine(
        new VoiceLine(
            "right",
            "I have a request for you from the Horizon Alliance.",
            core.options["defaultDialogueDelay"]
        )
    );
    d.addLine(
        new VoiceLine(
            "right",
            `They want you to head to ${planet1.name} to pick up a shipment: ${material_amount} units of ${material_name}.`,
            core.options["defaultDialogueDelay"] * 2
        )
    );
    d.addLine(
        new VoiceLine(
            "right",
            `You will then deliver these materials to ${planet2.name}. In exchange, we will give you a reward of ${money_reward} ${core.buildOptions["currencyName"]}.`,
            core.options["defaultDialogueDelay"] * 2.5
        )
    );
    d.addLine(
        new VoiceLine(
            "right",
            `Your reputation with us will also increase by ${rep_reward}, Good luck.`,
            core.options["defaultDialogueDelay"]
        )
    );

    //add quest when dialogue ends
    d.addOnFinished(() => {
        //travel to planet 1
        let ob = new Objective(1, "Travel to " + planet1.name);
        ob.addDesc(`Pick up the ${material_name} from ${planet1.name}.`);
        let quest = new LocationQuest(
            "Pickup",
            "Horizon Alliance",
            ob,
            planet1.pos
        );
        quest.addOnFinished(() => {
            // Add materials to inventory
            let item = new Item("quest_item", material_name);
            let itemstack = new ItemStack(item, material_amount);
            player.inventory.addItemStack(itemstack);
            //dialogue
            let d = new DialogueBox(
                "You",
                "Trade Envoy",
                textureHandler.getPlayer(),
                textureHandler.getAlien(5)
            );
            d.addLine(
                new VoiceLine(
                    "right",
                    "Good job, now travel to the delivery planet",
                    core.options["defaultDialogueDelay"]
                )
            );

            d.addOnFinished(() => {
                //travel to planet 2
                let ob = new Objective(1, "Travel to " + planet2.name);
                ob.addDesc(`Deliver the ${material_name} to ${planet2.name}.`);
                let quest = new LocationQuest(
                    "Delivery",
                    "Horizon Alliance",
                    ob,
                    planet2.pos
                );
                quest.addOnFinished(() => {
                    // Remove items from inventory
                    player.inventory.removeFromItemStack(
                        item.id,
                        material_amount
                    );
                    //dialoge
                    let d = new DialogueBox(
                        "You",
                        "Trade Envoy",
                        textureHandler.getPlayer(),
                        textureHandler.getAlien(5)
                    );
                    d.addLine(
                        new VoiceLine(
                            "right",
                            "Well done, adventurer! Here is your payment.",
                            core.options["defaultDialogueDelay"]
                        )
                    );
                    d.addOnFinished(() => {
                        player.money += money_reward;
                        player.addGuildRep("horizon_alliance", rep_reward);
                        player.quest = false;
                        // let u = new UIAlert(
                        //     "Money Received",
                        //     "You've received 100 " +
                        //         core.buildOptions["currencyName"]
                        // );
                        // ui.addElement(u);
                    });
                    ui.addElement(d);
                });
                questHandler.setQuest(quest);
            });
            ui.addElement(d);
        });
        questHandler.setQuest(quest);
    });
    ui.addElement(d);
};
