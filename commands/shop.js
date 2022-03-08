const Shop = require('../modules/shopInterface/shopInterface')
const {itemButtonAction} = require('../modules/shopInterface/itemButtonAction')
const db = require('quick.db');
var shop = new db.table('shop')

module.exports = {
    name: 'shop',
    description: 'Shows you the shop',
    async execute(message){
        var components = [
            Shop.itemRow(['Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Rank 5']),
            Shop.itemRow(['Rank 6'])
        ]
        const response = await message.reply({embeds: [Shop.mainEmbed(message)], components: components});

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.deferUpdate();
        }
        const collector = response.createMessageComponentCollector({
            filter,
            time: 600000,
        });

        collector.on("collect", (iButton) => {
    
            const id = iButton.customId;

            //Back
            if(id == 'back'){
                response.edit({embeds: [Shop.mainEmbed(message)], components: components})
                iButton.deferUpdate();
            }
            itemButtonAction(message, response, iButton, shop.get(`role_rank1`).id, 'Rank 1', 'Milestone role rank 1', 10000)
            itemButtonAction(message, response, iButton, shop.get(`role_rank2`).id, 'Rank 2', 'Milestone role rank 2', 20000)
            itemButtonAction(message, response, iButton, shop.get(`role_rank3`).id, 'Rank 3', 'Milestone role rank 3', 50000)
            itemButtonAction(message, response, iButton, shop.get(`role_rank4`).id, 'Rank 4', 'Milestone role rank 4', 100000)
            itemButtonAction(message, response, iButton, shop.get(`role_rank5`).id, 'Rank 5', 'Milestone role rank 5', 200000)
            itemButtonAction(message, response, iButton, shop.get(`role_rank6`).id, 'Rank 6', 'Milestone role rank 6', 500000)
        });

        collector.on('end', () => {
            const embed = response.embeds[0]
            const oldTitle = embed.title
            embed.setTitle(`${oldTitle} (Closed)`)

            response.edit({embeds: [embed], components: []})
        })

    }
}