class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  
  handleCommand(command) {
    switch(command.commandType) {
      case "MODE_CHANGE": 
        this.mode = command.value;
        return { completed: true }

      case "STATUS_CHECK":
        return {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        };

      case "MOVE":
        if(this.mode === "NORMAL") {
          this.position = command.value;
          return { completed: true };
        }
        // fallthrough
      default:
        return { completed: false };  
    } 
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: message.commands.map(c => this.handleCommand(c))
    };
    return response;
  }
}



module.exports = Rover;
