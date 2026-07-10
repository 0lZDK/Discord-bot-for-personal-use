const pendingTickets = require("../../services/pendingTickets");
const { getNextTicketNumber } = require("../../services/counterService");
const { createTicket } = require("../../services/forumService");

module.exports = {

    async execute(interaction) {

        const ticket = pendingTickets.get(interaction.user.id);

        if (!ticket) {
            return interaction.reply({
                content: "❌ Não encontrei os dados do chamado.",
                ephemeral: true
            });
        }

        try {

            const status = interaction.values[0];

            const numero = getNextTicketNumber();

            const post = await createTicket(
                interaction.client,
                numero,
                ticket.resumo,
                ticket.descricao,
                status
            );

            pendingTickets.delete(interaction.user.id);

            await interaction.update({
                content:
`✅ Chamado criado com sucesso!

🔢 Número: #${numero}

🔗 ${post.url}`,
                components: []
            });

        } catch (err) {

            console.error(err);

            await interaction.update({
                content: "❌ Erro ao criar o chamado.",
                components: []
            });

        }

    }

};