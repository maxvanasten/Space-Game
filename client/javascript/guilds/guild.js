class Guild {
    constructor(identifier, name) {
        this.identifier = identifier;
        this.name = name;
        this.questGenerator = null;
    }

    addQuestGenerator(func) {
        this.questGenerator = func;
    }

    getQuest(player) {
        this.questGenerator(player);
    }
}
