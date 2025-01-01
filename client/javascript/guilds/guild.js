class Guild {
    constructor(identifier, name) {
        this.identifier = identifier;
        this.name = name;
        this.questGenerator = null;
    }

    addQuestGenerator(func, min_rep) {
        if (!min_rep) min_rep = 0;
        this.questGenerator = func;
    }

    getQuest(player) {
        this.questGenerator(player);
    }
}
