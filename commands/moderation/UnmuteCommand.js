const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send('Tu ne possède pas les permissions requises!')
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send('Je ne possède pas les permissions requises pour mute cette personne!')
    
    let reason = args.slice(1).join("");
    const muteRole = message.guild.roles.cache.get('905022478508769320');
    const memberRole = message.guild.roles.cache.get('905031566303059968');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle('Tu as été unmute dans $(message.guild.name)')
      .setColor ("#e24437")
      .setTimestamp()

    if (!args[0]) return message.channel.send('Tu as mal écrit la commande!');
    if (!mentionedMember) return message.channel.send('Le membre mentionné est introuvable!');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Tu ne peux pas te unmute toi-même.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Tu ne peux pas me mute :)');
    if (!reason) reason = 'Aucune raison spécifiée';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('Ce membre a déjà été unmute!');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('Tu ne peux pas unmute une personne qui a un grade équivalent ou plus haut que le tiens!')

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch (err => console.log(err).then (message.channel.send('Impossible de donner le rôle membre, verifiez la console')))
    await mentionedMember.roles.remove(muteRole.id).catch (err => console.log(err).then (message.channel.send('Impossible de enlever le rôle mute, verifiez la console')))
  }
}