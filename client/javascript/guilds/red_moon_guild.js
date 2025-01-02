const red_moon_guild = () => {
    //Red moon's guild (TIMO)
    const guild = new Guild("red_moon_guild", "Red Moon");
    guild.options = {};
    guild.addQuestGenerator(red_moon_beginner);
    return guild;
};
