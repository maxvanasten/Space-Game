const traders_union = () => {
    let tg = new Guild("traders_union", "Horizon Alliance");
    const quest_giver_title = "Trade Envoy";
    // Horizon Alliance quests
    tg.addQuestGenerator(horizon_alliance_beginner);
    // Red Moon Guild quests
    return tg;
};
