const red_moon_guild = () => {
    //Red moon's guild (TIMO)
    let rmg = new Guild("red_moon_guild", "Red Moon");
    rmg.addQuestGenerator(() => {
        let d = new DialogueBox(
            player.name,
            "the Count",
            textureHandler.getPlayer(),
            textureHandler.getAlien(6)
        );
        d.addLine(
            new VoiceLine(
                "right",
                "Greetings, traveller. Are you looking for a job?, there is a relic you can retrieve for us.",
                core.options["defaultDialogueDelay"]
            )
        );
        d.addLine(
            new VoiceLine("left", "Yes.", core.options["defaultDialogueDelay"])
        );
        let names = ["First Moon Amulet Shard"]; //TODO: COOLE NAAMEN
        let name = names[Math.floor(Math.random() * names.length)];
        d.addLine(
            new VoiceLine(
                "right",
                "There is an ancient relic, the " +
                    name +
                    ", We have located it.",
                core.options["defaultDialogueDelay"]
            )
        );
        d.addLine(
            new VoiceLine(
                "right",
                "Would you retrieve it for us? We will reward you handsomely.",
                core.options["defaultDialogueDelay"]
            )
        );

        //set player quest data
        player.questData["relic_name"] = name;

        d.addOnFinished(() => {
            // let planet1 = player.questData['planet'];
            let planet1 = chunkLoader.getPlanet();

            let ob = new Objective(
                1,
                "Travel to " +
                    planet1.name +
                    " to retrieve the " +
                    player.questData["relic_name"]
            );
            ob.addDesc(
                "Travel to " +
                    planet1.name +
                    " and retrieve the " +
                    player.questData["relic_name"] +
                    " for the Count."
            );
            let quest = new LocationQuest(
                "Retrieval for the Count",
                "Red Moon Guild",
                ob,
                planet1.pos
            );
            quest.addOnFinished(() => {
                let ob = new Objective(
                    1,
                    "Bring the " +
                        player.questData["relic_name"] +
                        " back to the Count."
                );
                ob.addDesc(
                    "Bring the " +
                        player.questData["relic_name"] +
                        " back to the Count and his followers."
                );
                let quest = new LocationQuest(
                    "Turn in the " + player.questData["relic_name"],
                    "Red Moon Guild",
                    ob,
                    player.questData["planet"].pos
                );
                quest.addOnFinished(() => {
                    let d = new DialogueBox(
                        player.name,
                        "the Count",
                        textureHandler.getPlayer(),
                        textureHandler.getAlien(6)
                    );
                    d.addLine(
                        new VoiceLine(
                            "right",
                            "Thank you, traveller! Now that the " +
                                player.questData["relic_name"] +
                                " is back in our power,",
                            core.options["defaultDialogueDelay"]
                        )
                    );
                    d.addLine(
                        new VoiceLine(
                            "right",
                            "we are one step closer to completing the Amulet. This will not be forgotten.",
                            core.options["defaultDialogueDelay"]
                        )
                    );
                    d.addOnFinished(() => {
                        player.money += 100;
                        player.addGuildRep("red_moon_guild", 50);

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
            questHandler.setQuest(quest);
        });
        //console.log(`Quest generated: ${d}`);

        ui.addElement(d);
    });
    return rmg;
};
