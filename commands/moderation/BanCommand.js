const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js')

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Tu n'as pas les permissions nécéssaires!")
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("Je n'ai pas les permissions nécéssaires!")

    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Inpute Checking: 
    if (!reason) reason = 'Aucune raison spécifié'
    if (!args[0]) return message.channel.send('Qui veux-tu bannir ?')
    if (!mentionedMember) return message.channel.send ('Le membre mentionné est introuvable!')
    if (!mentionedMember.bannable) return message.channel.send('Je ne peux pas bannir ce membre!')

    //Executing:
    const banEmbed = new Discord.MessageEmbed ()
      .setTitle('Tu as été ban de $(message.guild.name)')
      .setDescription('Raison: $(reason)')
      .setColor ("#e24437")
      .setTimestamp()
      .setFooter(client.user.tag ,client.user.displayAvatarURl)


     await mentionedMember.send(banEmbed).catch(err => console.log(err));
     await mentionedMember.ban({
       days: 3,
       reason : reason 
     }).catch(err => console.log(err)).then(() => message.channel.send(mentionedMember.user.tag + " Banni avec succès!"));



  }
}