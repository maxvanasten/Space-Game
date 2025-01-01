const horizon_alliance = () => {
    const guild = new Guild("horizon_alliance", "Horizon Alliance");
    guild.options = {};
    // Horizon Alliance quests
    guild.addQuestGenerator(horizon_alliance_beginner);
    // Red Moon Guild quests
    return guild;
};
