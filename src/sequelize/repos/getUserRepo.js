const getUserRepo = (sequelize) => {
    const { user, externalLogin, loginProvider } = sequelize.models;

    async function getUserByExternalId(providerName, id) {
        const login = await externalLogin.findOne({
            where: { externalId: id },
            include: [{
                model: user
            }, { model: loginProvider, where: { providerName } }]
        });
        return login?.user;
    }

    async function getUserById(id) {
        return await user.findOne({ where: { id } })
    }

    async function createUser(providerName, externalId, userName, firstName, lastName) {
        let provider = await loginProvider.findOne({ where: { providerName } });
        if (!provider) {
            provider = await loginProvider.create({ providerName });
        }
        const u = await user.create({ firstName, lastName, userName });
        await provider.createExternalLogin({ externalId, userId: u.id });
        return u;

    }

    return { getUserByExternalId, createUser, getUserById };
};
exports.getUserRepo = getUserRepo;
