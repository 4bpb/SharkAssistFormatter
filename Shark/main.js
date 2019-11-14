const Discord = require('discord.js');
var request = require('request');
const cheerio = require('cheerio')
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
client.on('message', message => {
    if(message.member.hasPermission(['SEND_MESSAGES'])) {
        if(message.content.startsWith(`https://frenzy.sale/`)) {
            message.delete()
            request(message.content, function (error, response, body) {
                const $ = cheerio.load(body);
                var title = ($('body > div.page-wrapper > div.desktop-left-wrapper.container > div.product-details > h1').text().trim())
                var site = ($('body > div.page-wrapper > div.desktop-right-wrapper > div > div > div.shop-details__social-container > div:nth-child(2) > a').text())
                var img = ($('body > div.page-wrapper > div.desktop-right-wrapper > img').attr('src'))
                var description = ($('body > div.page-wrapper > div.desktop-left-wrapper.container > p').text())



                const main = new Discord.RichEmbed()
                .setColor('3AA8A7')
                .setTitle(title)
                .setThumbnail(img)
                .setDescription(description+'  '+'On : '+site)
                .setAuthor("SharkAssist Product Formatter")
                .setTimestamp()
                .setURL(message.content)
                .setFooter("Submitted by "+message.author.username)
                

                
                
                message.channel.send(main)
            })
        }
    }
    message.react('👍')
    message.react('👎')
})

    



  client.login('<Token>');