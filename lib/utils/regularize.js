module.exports = function regularize(argument = "") {
  var regularized = "";
  for (let i = 0; i < argument.length; i++) {
    if (argument[i] === "-") regularized += "_";
    else regularized += argument[i];
  }
  return regularized;
};
