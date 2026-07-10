const { ChannelType } = require("discord.js");
const config = require("../config");

async function createTicket(client, numero, resumo, descricao, status) {

    const forum = await client.channels.fetch(config.forumId);

    if (!forum || forum.type !== ChannelType.GuildForum) {
        throw new Error("Fórum não encontrado.");
    }

    const post = await forum.threads.create({
        name: `#${numero} | ${resumo}`,
        message: {
            content:
`#️⃣ Chamado #${numero}

📝 **Descrição**
${descricao}`
        },
        appliedTags: [
            config.tags[status]
        ]
    });

    return post;
}

module.exports = {
    createTicket
};