const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js');
const { basename } = require('discord.js/src/util/Util');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
  //Permission Checking:
  if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Tu n'as pas les permissions nécéssaires!")
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("Je n'ai pas les permissions nécéssaires!")

  //Variables:
  let reason = args.slice(1).join(" ");
  let userID = args[0]
  //Inpute Checking: 
  if (!reason) reason = 'Aucune raison spécifié'
  if (!args[0]) return message.channel.send('Qui veux-tu unban ?')
  if (isNaN(args[0])) return message.channel.send("l'ID spécifié n'est pas un chiffre!")

  //Executing:
  message.guild.bans.fetch().then(async bans => {
    if (basename.size == 0) return message.channel.send("Personne n'est banni du server (pour le moment...)")
    let bUser = bans.find(b => b.user.id == userID);
    if (!bUser) return message.channel.send ("Ce membre n'est pas banni!")
    await message.guild.members.unban(bUser.user, reason).catch(err => {
      console.log(err);
      return message.channel.send("Je n'ai pas pu unban ce membre")
    }).then (() => {
     message.channel.send(`${args[0]} a été unban!`);
    });
  });

  }
}