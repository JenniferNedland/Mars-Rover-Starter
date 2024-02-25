const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  const testPosition = 98342;

  test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover();
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });
  
  test("response returned by receiveMessage contains the name of the message", function() {
    const messageText = "Test message."
    let message = new Message(messageText);
    let rover = new Rover(); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(); 
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  test("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message.', commands);
    let rover = new Rover(testPosition); 
    let response = rover.receiveMessage(message);
    const {mode, generatorWatts, position} = response.results[0].roverStatus;
    expect(mode).toEqual("NORMAL");
    expect(generatorWatts).toEqual(110);
    expect(position).toEqual(testPosition);
  })

  test("responds correctly to the MODE_CHANGE command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message('Test message.', commands);
    let rover = new Rover(testPosition); 
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({ completed: true });
    expect(rover.mode).toEqual("LOW_POWER");
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", testPosition + 1)
    ];
    let message = new Message('Test message.', commands);
    let rover = new Rover(testPosition); 
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({ completed: false });
    expect(rover.position).toEqual(testPosition);
  });

  test("responds with the position for the MOVE command", function() {
    let commands = [new Command("MOVE", testPosition)];
    let message = new Message('Test message.', commands);
    let rover = new Rover(testPosition + 1); 
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({ completed: true });
    expect(rover.position).toEqual(testPosition);
  });
});




  




