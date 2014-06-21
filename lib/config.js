//DEVELOPMENT ----------------------------------------------------------------------------------
exports.appRoot = process.cwd()
exports.appPort = 80;

exports.sessionSecret = "secret"

exports.templateOptions = { 
  map: { html: 'swig' },
  cache: false 
}