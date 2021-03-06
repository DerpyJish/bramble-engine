// GAME STATE SYSTEM //
game.state = {};
game.state.stack = [];

Object.defineProperty( game.state , "current" , { get: function () { return game.state.stack[ game.state.stack.length-1 ] } } );

// Function used to cascade an event down the stack
game.state.triggerEvent = function ( event , ...args ) {

  // Find lowest state from the top of the stack that is allowed to execute on the event
  var n = game.state.stack.length -1;
  var eventCanPass = true;
  while ( n >= 0 && eventCanPass ) {
    var state = game.state.stack[n];
    eventCanPass = state.canEventPass( event );
    n--;
  }
  n++;

  // Execute the event from that state up to the top of the stack
  if ( n >= 0 ) {
    while ( n < game.state.stack.length ) {
      if ( state[event] ) { state[event]( ...args ) }
      n++;
    }
  }
}

// Functions used to manipulate the state stack
game.state.end = function () {
  // End and remove the state on the top of the stack
  var oldState = game.state.stack.pop();
  if ( oldState ) { oldState.end() }

  // Resume the state now on the top of the stack
  var newState = game.state.current;
  if ( newState ) { newState.resume() }
}

game.state.start = function ( state ) {
  // Leave the state on the top of the stack
  var oldState = game.state.current;
  if ( oldState ) { oldState.leave() }

  // Start and push to the stack the given state
  game.state.stack.push( state );
  state.start();
}

game.state.switch = function ( state ) {
  // End and remove the state on the top of the stack
  var oldState = game.state.stack.pop();
  if ( oldState ) { oldState.end() }

  // Start and push to the stack the given state
  game.state.stack.push( state );
  state.start();
}
