var render = require('./lib/render')
var jsonResp = require('./lib/jsonResp')
var config = require('./lib/config')
var sessionHelper = require('./lib/sessionHelper')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var app = koa()

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)

//ROUTES
app.keys = [config.sessionSecret]
app.use(session())
app.use(jsonResp())
app.use(router(app))

//PAGE ROUTES
app.get('/', defaultPageLoad('index'))
app.get('/public/*', serve('.'))
app.get('/*', defaultPageLoad('survey'))

//PAGE HANDLERS
function defaultPageLoad(pageName, requiresLogin) {
  return function *(){
    if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
      this.redirect('/login')
      return
    }

    var temp = sessionHelper.commonTemplate(this.session);
    this.body = yield render(pageName, temp)
  }
}

var server = http.createServer(app.callback())

server.listen(config.appPort);
console.log('Started ----------------------------------------------')