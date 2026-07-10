module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        // Slash Commands
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            return command.execute(interaction);

        }

        // Modal
        if (interaction.isModalSubmit()) {

            if (interaction.customId === "novoChamado") {

                const chamadoModal = require("../interactions/modals/chamadoModal");

                return chamadoModal.execute(interaction);

            }

        }

        // Select Menu
        if (interaction.isStringSelectMenu()) {

            if (interaction.customId === "statusChamado") {

                const statusChamado = require("../interactions/selectMenus/statusChamado");

                return statusChamado.execute(interaction);

            }

        }

    }
};