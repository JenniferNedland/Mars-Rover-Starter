const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
  it("throws error if name is not passed into the constructor as the first parameter", function() {
    expect( function() { new Message();}).toThrow(new Error ("Message name required."))
  });

  test("constructor sets name", function() {
		const messageText = "Test message."
    let message = new Message(messageText);
		expect(message.name).toEqual(messageText); 
  });

  it("contains a commands array passed into the constructor as the second argument", function() {
    let testCommands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    let message = new Message("Unused", testCommands);
//    testCommands[0]=new Command("boo");
    expect(message.commands[0].commandType).toEqual("MODE_CHANGE");
//    expect(message.commands[0].commandType).toEqual(testCommands[0].commandType);
    expect(message.commands).toEqual(testCommands);
  });
});

