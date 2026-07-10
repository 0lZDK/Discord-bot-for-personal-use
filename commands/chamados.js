const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chamado")
        .setDescription("Abrir um novo chamado"),

    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId("novoChamado")
            .setTitle("Abrir Chamado");

        const resumo = new TextInputBuilder()
            .setCustomId("resumo")
            .setLabel("Resumo")
            .setPlaceholder("Ex: Impressora do RH")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(80);

        const descricao = new TextInputBuilder()
            .setCustomId("descricao")
            .setLabel("Descrição")
            .setPlaceholder("Descreva detalhadamente o problema...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(resumo),
            new ActionRowBuilder().addComponents(descricao)
        );

        await interaction.showModal(modal);
    }
};