/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname, uptime } = require("os");
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (match) {
      for (let i of events.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${message.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╭━━━━━ᆫ ${BOT_NAME} ᄀ━━━
┃ ⎆  Owner :  x-electra
┃ ⎆  Prefix : ${prefix}
┃ ⎆  Hostname :${hostname()}
┃ ⎆  Date : ${date}
┃ ⎆  Time : ${time}
┃ ⎆  Commands : ${events.commands.length} 
┃ ⎆  Uptime : ${clockString(uptime())} 
╰━━━━━━━━━━━━━━━
╭╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼\n╽`;
      let cmnd = [];
      let cmd;
      let category = [];
      events.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
          if (!command.type) {
            type = "misc";
          } else {
            type = command.type.toLowerCase();
          }

          cmnd.push({ cmd, type: type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `\n┠─────〔${cmmd}〕\n╿\n╿╭╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }, num) => {
          menu += `\n╿┠ ${cmd.trim()}`;
        });
        menu += `\n╿╰╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼\n╿`;
      });

      menu += `\n╰╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼`;
 


const buttons = [
  {buttonId: `${prefix}ping`, buttonText: {displayText: tiny("Ping")}, type: 1},
  {buttonId: `${prefix}list`, buttonText: {displayText: tiny("List")}, type: 1}
]

const buttonMessage = {
    text: tiny(menu),
    footer: tiny(
          `X-AsenaDuplicated\nVersion : ${require("../package.json").version}`
        ),
    buttons: buttons,
    headerType: 1
}
return await message.sendMessage(message.jid, buttonMessage)



      
    }
  }
);
/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `╭───〔 ${tiny("x-Asena command list")} 〕────\n`;

    let cmnd = [];
    let cmd, desc;
    events.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
      }
      if (command.desc) {
        desc = command.desc;
      } else {
        desc = false;
      }
      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `├ ${(num += 1)} *${tiny(cmd.trim())}*\n`;
      if (desc) menu += `├ ${tiny("use : " + desc)}\n`;
    });
    menu += `╰──────────────────────────`;
    return await message.reply(menu);
  }
);
