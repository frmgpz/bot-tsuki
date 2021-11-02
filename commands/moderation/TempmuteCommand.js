const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js');
const ms = require ('ms')

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send('Tu ne possède pas les permissions nécéssaires!')
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send('Je ne possède pas les permissions nécéssaires pour mute cette personne')

  const muteRole = message.guild.roles.cache.get ('905022478508769320') 
  const memberRole = message.guild.roles.cache.get ('905031566303059968') 
  const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let time = args[1];
  let reason = args.slice(2).join(" ");
  const tempmuteEmbed = new Discord.MessageEmbed()
    .setTitle('Tu as été mute dans $(message.guild.name)')
    .addField(`durée ${time}`, `Reason`)
    .setDescription('Raison: $(reason)')
    .setColor ("#e24437")
    .setTimestamp();

  if (!args[0]) return message.channel.send('Tu dois spécifier un membre avec une durée!')
  if (!mentionedMember) return message.channel.send ('Le membre mentionné est introuvable!')
  if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send ('Tu ne peux pas mute une personne qui a un grade équivalent ou plus haut que le tiens!')
  if (!time) return message.channel.send('Tu dois spécifier une durée!')
  if (!reason) reason = 'Pas de raison spécifiée'


  await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
  await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
  await mentionedMember.send(tempmuteEmbed).catch(err => console.log (err));

  setTimeout(async function () {
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
    await mentionedMember.send(`Tu as été unmute dans ${message.guild.name}`).catch(err => Discord.CommandInteractionOptionResolver.log (err));
  }, ms(time));

    

  }
}