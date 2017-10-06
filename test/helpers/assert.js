function assert(assertion, warningMessage, functionName, callback) {
  if (!assertion) {
    var error = new Error((functionName ? (functionName + ': ') : '') + warningMessage);
    if (callback) { callback(error); } else { throw error; }
  }
  return !!assertion;
}

module.exports = assert;
