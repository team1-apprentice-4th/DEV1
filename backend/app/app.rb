require 'webrick'

server = WEBrick::HTTPServer.new(Port: 4567)

server.mount_proc '/' do |_, res|
  res.body = 'Hello World'
end

trap 'INT' do server.shutdown end

server.start
