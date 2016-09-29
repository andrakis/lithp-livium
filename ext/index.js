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

builtin("stdin", [], () => process.stdin);

builtin("on", ['Object', 'Event', 'Callback'], (Obj, Event, Callback) => {
	return Obj.on.call(Obj, Event, Callback);
});

exports.setup = function(lithp) {
	var count = 0;
	for(var k in builtins) {
		lithp.builtin(k, builtins[k].params, builtins[k].body);
		count++;
	}
	return count;
};
