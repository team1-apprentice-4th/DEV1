require 'webrick'
require 'mysql2'

# client = Mysql2::Client.new(
#   host: 'localhost', # データベースのホスト名
#   username: 'root', # ユーザー名
#   password: 'password', # パスワード
#   database: 'Tmatter' # データベース名
# )

server = WEBrick::HTTPServer.new(Port: 4567)

server.mount_proc '/' do |_, res|
  res.body = 'Hello World'
end

# ルートパス('/')に対するGETメソッドの処理を定義
server.mount_proc '/memo' do |req, res|
  if req.request_method == 'GET'
    # クエリを実行して結果を取得する例
    # results = client.query('SELECT * FROM memos')
    res.body = '200'

    # res.body = results
    res.status = 200
  else
    res.body = 'Unsupported method or path'
    res.status = 405 # Method Not Allowed
  end
end

trap 'INT' do
  server.shutdown
end

server.start

# # クエリの実行が終了したら接続を閉じる
# client.close
