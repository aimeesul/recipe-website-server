const { Sequelize } = require('sequelize');
const { configureModelRelationships } = require("./configureModelRelationships");
const { modelDefiners } = require('./models')

async function initializeSequelize() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.data/database.sqlite',
        logging: (...msg) => console.log(msg),
        // logging: false,
    });

    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }

    configureModelRelationships(sequelize);
    await sequelize.sync({ force: true });
    return sequelize;
}



module.exports.initializeSequelize = initializeSequelize;


