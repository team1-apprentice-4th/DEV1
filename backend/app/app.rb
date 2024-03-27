require 'webrick'
require 'mysql2'
require 'yaml'
require 'json'

# YAMLファイルからデータベースの接続情報を取得
config_path = '/usr/src/app/config/database.yml'
db_config = YAML.load_file(config_path)['development']

# サーバーをポート4567に立てる
server = WEBrick::HTTPServer.new(Port: 4567)

# GETリクエストに対してHello Worldを返す
server.mount_proc '/' do |_, res|
  res.body = 'Hello World'
end

# POSTリクエストを処理する
server.mount_proc '/search' do |req, res|
  if req.request_method == 'POST'
    begin
      # リクエストボディからキーを取得
      data = JSON.parse(req.body)
      key = data['key']

      # MySQLデータベースに接続
      client = Mysql2::Client.new(db_config)

      # データベースを選択
      client.query('USE Tmatter')

      # ここで取得するために必要なSQLを書く
      statement = client.prepare("SELECT * FROM memos WHERE memo_id = ?")
      results = statement.execute(key)

      # 結果をJSON形式で返す
      res.status = 200
      res.content_type = 'application/json'
      res.body = results.to_a.to_json
    rescue => e
      res.status = 500
      res.content_type = 'application/json'
      res.body = { error: e.message }.to_json
    end
  else
    res.status = 400
    res.content_type = 'application/json'
    res.body = { error: 'Invalid request method' }.to_json
  end
end

trap('INT') { server.shutdown }

server.start
