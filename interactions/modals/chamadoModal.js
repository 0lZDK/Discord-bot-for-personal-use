const pendingTickets = require("../../services/pendingTickets");
const {
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

module.exports = {

    async execute(interaction) {

        const resumo = interaction.fields.getTextInputValue("resumo");
        const descricao = interaction.fields.getTextInputValue("descricao");

        // Guarda temporariamente os dados
        pendingTickets.set(interaction.user.id, {
            resumo,
            descricao
        });

        // Cria o menu de seleção de status
        const menu = new StringSelectMenuBuilder()
            .setCustomId("statusChamado")
            .setPlaceholder("Selecione o status do chamado")
            .addOptions(
                {
                    label: "Em andamento",
                    value: "emAndamento",
                    emoji: "🟡"
                },
                {
                    label: "URGENTE",
                    value: "urgente",
                    emoji: "🔴"
                },
                {
                    label: "Quando der na telha",
                    value: "quandoDerNaTelha",
                    emoji: "🟠"
                }
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            content: "Selecione o status do chamado:",
            components: [row],
            ephemeral: true
        });

    }

};