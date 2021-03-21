const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let position = 95125;
    let rover = new Rover(position);
    expect(rover.position).toEqual(position);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.message).toEqual('Another message!');
  })

    it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.results.length).toEqual(commands.length);
  })
      it("responds correctly to status check command",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
      expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
      expect(response.results[0].roverStatus.position).toEqual(position);
  })
      it("responds correctly to mode change command",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(true);
      expect(rover.mode).toEqual("LOW_POWER");
  })
      it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.results[2].completed).toEqual(false);
      expect(rover.position).toEqual(position);
  })
        it("responds with position for move command",function(){
      let position = 95125;
      let rover = new Rover(position);

      let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 4968)];
      let message = new Message('Another message!', commands);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(true);
      expect(rover.position).toEqual(4968);
  })
});
