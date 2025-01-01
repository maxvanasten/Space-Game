class Core {
    constructor() {
        this.info = {};

        this.options = {
            debug: false,
            tutorial: false,
            chunks: 50,
            chunkWidth: 2000,
            chunkHeight: 2000,
            tempDelay: 300,
            defaultDialogueDelay: 120,
            maxLoadedChunks: 32,
            maxPlanetsPerChunk: 1,
            planetProb: 1,
        };

        this.gameOptions = {
            fuelCost: 0.1,
        };

        this.uiOptions = {
            mainColor: {
                r: 11,
                g: 21,
                b: 11,
                a: 230,
            },
            accentColor: {
                r: 33,
                g: 60,
                b: 33,
                a: 160,
            },
            // textColor: {
            //     r: 33,
            //     g: 180,
            //     b: 33,
            // },
            textColor: {
                r: 60,
                g: 255,
                b: 60,
                a: 180,
            },
        };

        this.buildOptions = {
            enable: false,
            version: "0.3.4",
            important: "Red Moon Guild, Game name (finally)",
            gameName: "2112",
            currencyName: "Federation Gold",
        };

        this.chunkOptions = {
            stars: true,
            amount: 7,
        };

        this.radarColors = {
            objective: {
                r: 30,
                g: 255,
                b: 30,
                a: 180,
            },
            vessel: {
                r: 50,
                g: 50,
                b: 255,
                a: 150,
            },
            planet: {
                r: 80,
                g: 255,
                b: 80,
                a: 120,
            },
            mothership: {
                r: 255,
                g: 255,
                b: 50,
                a: 120,
            },
        };

        this.playerOptions = {
            maxSpeed: 7.5,
            boostSpeed: 60,
            turnSpeed: 0.035,
            autoPilotSpeed: 0,
            shootingAllowed: true,
            fuelUsage: 0.01,
            boostingFuelUsage: 0.1,
            refuelSpeed: 1,
        };

        this.vesselOptions = {
            maxSpeed: 10,
            turnSpeed: 0.1,
        };

        this.planetNames = [
            "Auron",
            "Caldera",
            "Meridia",
            "Solara",
            "Borealis",
            "Vespera",
            "Erythra",
            "Lythos",
            "Cendara",
            "Orona",
            "Selvara",
            "Halcyon",
            "Zephyra",
            "Altara",
            "Elara",
            "Marineris",
            "Dione",
            "Thalassa",
            "Pyralis",
            "Meliora",
            "Castora",
            "Avandra",
            "Serona",
            "Lyonesse",
            "Peridia",
            "Tethys",
            "Arcturus",
            "Vesperis",
            "Amara",
            "Solis",
        ];
        this.materialNames = [
            "Titanium Alloy",
            "Crysolium",
            "Neutronium Dust",
            "Erythium",
            "Quantum Fibers",
            "Solarite",
            "Lunarite",
            "Plutonium",
        ];

        this.planets = [
            "Planet1",
            "Planet2",
            "Planet3",
            "Planet4",
            "Planet5",
            "Planet6",
            "Planet7",
            "Planet8",
            "Planet9",
            "Planet10",
            "Planet11",
            "Planet12",
            "Planet13",
        ];
        this.mothers = ["mothership", "mothership2", "mothership3"];
        this.vessels = [
            "vessel",
            "vessel2",
            "vessel3",
            "vessel4",
            "vessel5",
            "vessel6",
            "vessel7",
            "vessel8",
            "vessel9",
            "vessel10",
        ];
        this.enemyVessels = ["vessel4"];
        this.alienCharacters = [
            "alien",
            "alien2",
            "alien3",
            "alien4",
            "alien5",
            "alien6",
            "alien7",
            "alien8",
            "alien10",
        ];
        this.player = "player";

        this.backdrops = [
            "backdrop4",
            "backdrop5",
            "backdrop6",
            "backdrop7",
            "backdrop8",
            "backdrop9",
            "backdrop10",
        ];
    }

    getPlanetName() {
        const number = Math.floor(Math.random() * 1000);
        const name =
            this.planetNames[
                Math.floor(Math.random() * this.planetNames.length)
            ] +
            "-" +
            number;
        return name;
    }

    getMaterialName() {
        return this.materialNames[
            Math.floor(Math.random() * this.materialNames.length)
        ];
    }

    getAngleBetweenVectors(vector1, vector2) {
        return Math.atan2(vector1.y - vector2.y, vector1.x - vector2.x);
    }
}
