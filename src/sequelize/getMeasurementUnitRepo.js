const getMeasurementUnitRepo = (sequelize) => {
    const { measurementUnit } = sequelize.models;

    async function getAll() {
        const measurementUnits = await measurementUnit.findAll();
        return measurementUnits
    }



    return { getAll };
};
exports.getMeasurementUnitRepo = getMeasurementUnitRepo;
