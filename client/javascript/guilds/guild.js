class Guild {
    constructor(name) {
        this.name = name;
        this.questGenerator = null;
    }

    addQuestGenerator(func) {
        this.questGenerator = func;
    }

    getQuest() {
        this.questGenerator();
    }
}
