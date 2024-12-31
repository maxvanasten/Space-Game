class PlanetHandler {
    constructor() {
        this.types = ["gas_planet", "guild_planet"];
        this.types = [
            {
                id: "gas_planet",
                name: "Gas Planet",
                probability: 30,
            },
            {
                id: "guild_planet",
                name: "Guild Planet",
                probability: 70,
            },
        ];
    }

    getType() {
        // Get random planet type based on their probability
        const types = [];
        this.types.forEach((type) => {
            for (let i = 0; i < type.probability; i++) {
                types.push(type);
            }
        });

        return types[Math.floor(Math.random() * types.length)];
    }
}
