class Rover {
   constructor(position){
     this.position=position;
     this.mode='NORMAL';
     this.generatorWatts=110;
   };
   receiveMessage(receivedMessage){
     let res = {
        message : receivedMessage.name,
        results : []
     };
     let command;
     let result = null;
    for (let i = 0; i < receivedMessage.commands.length; i++) {
      command = receivedMessage.commands[i];
      if (command.commandType=='STATUS_CHECK'){
        result = {completed: true,
        roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
       }
      }else if (command.commandType=='MODE_CHANGE'){
        this.mode = command.value;
        result= {completed: true};
      }else if (command.commandType=='MOVE'){
        if (this.mode=='LOW_POWER'){
          result = {completed: false};
        }else{
          this.position =command.value;
          result = {completed: true};
        }
      }
      res.results.push(result);
    }
     return res;
   }
}

module.exports = Rover;