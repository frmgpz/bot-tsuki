const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }


  
  async run(client, message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Tu n'as pas les permissions nécéssaires!")
    const mentionnedMember = message.mentions.members.first();
    let reason = args.slice(1).join("");
    if (!reason) reason = "raison non spécifiée";
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle('Tu as été kick de $(message.guild.name)')
    .setDescription('Raison: $(reason)')
    .setColor ("#e24437")
    .setTimestamp()
    .setFooter(client.user.tag ,client.user.displayAvatarURl)

    // -kick @user Raison 
    if (!args[0]) return message.channel.send("Quelle personne veux-tu kick ?")
    if (!mentionnedMember) return message.channel.send("Le membre mentionné est introuvable!")
    if (!mentionedMember.kickable) return message.channel.send('Je ne peux pas kick ce membre!')
    try {
      await memtionnedMember.send(kickEmbed);
    } catch (err) {
      console.log('Impossible de DM le membre.')
    } 

    try {
     await mentionnedMember.kick(reason)
    } catch (err) {
      console.log(err);
     return  message.channel.send("Je ne peux pas kick ce membre!")
    }
  }
}