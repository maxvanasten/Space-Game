class PlaceHolderQuest {
    constructor(name, objective, desc) {
        this.name = name;
        this.description = desc;
        this.objective = new Objective(0, "No quest available.");
        this.giver = "Nobody";

        this.type = "placeholder";
    }

    update() {}
}
