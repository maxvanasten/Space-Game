const traders_union = () => {
    let tg = new Guild("traders_union", "Traders Union");
    const quest_giver_title = "Union Merchant";
    tg.addQuestGenerator((player) => {
        //intro dialogue
        let d = new DialogueBox(
            "You",
            quest_giver_title,
            textureHandler.getPlayer(),
            textureHandler.getAlien(5)
        );
        d.addLine(
            new VoiceLine(
                "right",
                "You've accepted a trade mission!",
                core.options["defaultDialogueDelay"]
            )
        );
        d.addLine(
            new VoiceLine(
                "right",
                "You will travel to a planet where you will pickup some materials.",
                core.options["defaultDialogueDelay"]
            )
        );
        d.addLine(
            new VoiceLine(
                "right",
                "You will then deliver these materials to a different planet",
                core.options["defaultDialogueDelay"]
            )
        );
        d.addLine(
            new VoiceLine(
                "right",
                "Good luck!",
                core.options["defaultDialogueDelay"]
            )
        );

        //add quest when dialogue ends
        d.addOnFinished(() => {
            let planet1 = chunkLoader.getPlanet();
            //travel to planet 1
            let ob = new Objective(1, "Travel to " + planet1.name);
            ob.addDesc("Pick up the resources from the first planet.");
            let quest = new LocationQuest(
                "Pickup",
                "Traders Union",
                ob,
                planet1.pos
            );
            quest.addOnFinished(() => {
                //dialogue
                let d = new DialogueBox(
                    "You",
                    quest_giver_title,
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
                    let planet2 = chunkLoader.getPlanet();
                    //travel to planet 2
                    let ob = new Objective(1, "Travel to " + planet2.name);
                    ob.addDesc("Deliver the resources to the second planet.");
                    let quest = new LocationQuest(
                        "Trade Mission: Part Two",
                        "Traders Union",
                        ob,
                        planet2.pos
                    );
                    quest.addOnFinished(() => {
                        //dialoge
                        let d = new DialogueBox(
                            "You",
                            quest_giver_title,
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
                            player.money += 100;
                            player.addGuildRep("traders_union", 50);
                            let u = new UIAlert(
                                "Money Received",
                                "You've received 100 " +
                                    core.buildOptions["currencyName"]
                            );
                            ui.addElement(u);
                        });
                        ui.addElement(d);
                    });
                    questHandler.setQuest(quest);
                });
                ui.addElement(d);
            });
            questHandler.setQuest(quest);
        });
        console.log(`Quest generated: ${d}`);
        ui.addElement(d);
    });
    return tg;
};
