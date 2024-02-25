class Message {
   constructor(name, inputCommands =[]) {
      this.name = name;
      if (!name) {
         throw Error("Message name required.");
      }
//      this.commands = commands;
      this.commands = [...inputCommands];
   }
}
module.exports = Message;