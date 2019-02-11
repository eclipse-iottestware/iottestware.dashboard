/********************************************************************************
 * Copyright (c) 2019 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 4
 ********************************************************************************/
const express = require('express')
const fileUpload = require('express-fileupload')
const createError = require('http-errors')
const https = require('https')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const path = require('path')
const fs = require('fs')

// https settings
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'resources/ssl', 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'resources/ssl', 'key.pem')),
  passphrase: 'iottestware123'
}

const app = express()
app.set('port', process.env.PORT || 3001)

const httpsServer = https.createServer(httpsOptions, app)

const httpServer = http.createServer(function (req, res) {
  // receiving HTTP requests will be forwarded to HTTPS (httpsServer)
  if (req.headers['host']) {
    const host = req.headers['host'].split(':')[0]
    const httpsPort = app.get('port')
    res.writeHead(301, { 'Location': 'https://' + host + ':' + httpsPort + req.url })
  }
  res.end()
})

const io = socketIo(httpsServer)

// get the routers
const toolsRouter = require('./src/routes/tools')(io)
const nmapRouter = require('./src/routes/nmap')(io)
const opcuaValidatorRouter = require('./src/routes/opcuaValidator')(io)
const gdprRouter = require('./src/routes/gdpr')
const reportRouter = require('./src/routes/report')
const historyRouter = require('./src/routes/history')
const evaluationRouter = require('./src/routes/evaluation')
const resourceRouter = require('./src/routes/resources')

const conformanceRouter = require('./src/routes/conformance')(io)
const testpurposeRouter = require('./src/routes/testpurposes')
const testcasesRouter = require('./src/routes/testcases')

// webpack
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../frontend/webpack.config')

app.use(fileUpload())
app.use(morgan('dev'))

app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodies

/*
 * map endpoints to specific routers which will provide specific endpoints and functionality
 */
app.use('/v1/conformance', conformanceRouter)
app.use('/v1/testpurposes', testpurposeRouter)
app.use('/v1/testcases', testcasesRouter)
app.use('/v1/history', historyRouter)
app.use('/v1/evaluation', evaluationRouter)
app.use('/v1/resources', resourceRouter)

app.use('/v1/tools', toolsRouter)
app.use('/v1/tools/nmap', nmapRouter)
app.use('/v1/tools/opc', opcuaValidatorRouter)

app.use('/v1/dataprotection', gdprRouter)
app.use('/v1/report', reportRouter)

/*
 * serve frontend as default route if no backend endpoint was matching
 */
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../frontend/public', 'index.html'))
})

/*
 * error handler: neither backend nor frontend routes matched
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // response with error message
  res.status(err.status || 500)
  res.json({status: err.status, message: err.message})
})

/*
 * TODO: should be removed later
 */
io.on('connection', function (socket) {
  console.log('a new Socket.io Connection')

  socket.on('disconnect', () => {
    console.log('Socket.io disconnected')
  })
})

httpsServer.listen(app.get('port'), () => {
  console.log(`HTTPS server listen on port ${app.get('port')}`)
})

httpServer.listen(8080, () => {
  console.log(`HTTP server listen on port 8080`)
})
