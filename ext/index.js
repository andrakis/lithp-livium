/**
 * Extension library for Livium.
 *
 * Adds new builtins to Lithp.
 */
var util = require('util'),
	inspect = util.inspect;
var lithp = require(__dirname + '/../node_modules/lithp/index'),
	Lithp = lithp.Lithp,
	debug = lithp.debug,
	types = lithp.Types,
	OpChain = types.OpChain,
	Atom = types.Atom,
	GetAtoms = types.GetAtoms,
	FunctionCall = types.FunctionCall,
	FunctionReentry = types.FunctionReentry,
	FunctionDefinition = types.FunctionDefinition,
	FunctionDefinitionNative = types.FunctionDefinitionNative,
	AnonymousFunction = types.AnonymousFunction,
	LiteralValue = types.LiteralValue,
	VariableReference = types.VariableReference,
	Tuple = types.Tuple;

var builtins = {};
function builtin (name, params, body) {
	builtins[name] = {params: params, body: body};
}

builtin("exit", [], () => process.exit());
builtin("exit", ['ExitCode'], ExitCode => process.exit(ExitCode));

builtin("on", ['Object', 'Event', 'Callback'], (Obj, Event, Callback) => {
	return Obj.on.call(Obj, Event, Callback);
});
builtin("rawmode", ['Bool'], Bool => {
	if(process.stdin.isTTY)
		process.stdin.setRawMode(Bool == Atom('true') ? true : false)
});
builtin("stdin", [], () => process.stdin);
builtin("true", [], () => true);
builtin("false", [], () => false);
builtin("tty-cols", [], () => process.stdout.columns);
builtin("tty-rows", [], () => process.stdout.rows);

builtin('process-at-exit', ['Callback'], function(Callback) {
	return this.at_exit(() => {
		return this.run(Callback);
	});
});

builtin('bool', ['Atom'], atom => atom == Atom('true') ? true : false);

builtin('terminal-print', ['Term', 'Message'], (Term, Message) => {
	if(Array.isArray(Message)) {
		// Create an array and join the results
		Message = Message.map(M => M.toString()).join(' ');
	}
	Term(Message)
});

builtin('stop', [], function() {
	// Stop instance
	this.stop();
	return 'stopping instance ' + this.id;
});

builtin('repeat', ['String', 'Count'], (Str, Count) => Str.repeat(Count));

exports.setup = function(lithp) {
	var count = 0;
	for(var k in builtins) {
		lithp.builtin(k, builtins[k].params, builtins[k].body);
		count++;
	}
	return count;
};
