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
server.mount_proc '/memos' do |req, res|
  # MySQLデータベースに接続
  client = Mysql2::Client.new(db_config)
  # データベースを選択
  client.query('USE Tmatter')
  res.header['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'

  if req.request_method == 'GET'
    begin
      # リクエストクエリパラメタからキーを取得
      data = req.query
      title, categories = data.values_at('title', 'tag')

      # こで得するために必要なSQLを書く
      statement = client.prepare('SELECT * FROM memos WHERE title_name LIKE ?')
      results = statement.execute("%#{title}%")

      # 結果をJSON形式で返す
      res.status = 200
      res.content_type = 'application/json'
      res.body = results.to_a.to_json
    rescue StandardError => e
      res.status = 500
      res.content_type = 'application/json'
      res.body = { error: e.message }.to_json
    end

  # Postの処理はここから
  elsif req.request_method == 'POST'
    begin
      # リクエストクエリパラメタからキーを取得
      data = JSON.parse(req.body)
      title, categories, detail, solution = data.values_at('error', 'category', 'detail', 'solution')
      client = Mysql2::Client.new(db_config)
      # データベースを選択
      client.query('USE Tmatter')
      # トランザクション開始
      client.query('START TRANSACTION')
      # memosテーブルに挿入
      memo_insert = client.prepare("INSERT INTO memos (title_name, solution, user_id, detail) VALUES (?, ?, ?, ?)")
      memo_insert.execute(title, solution, 1, detail)
      memo_id = client.last_id

      # memo_tech_categoriesテーブルに挿入
      categories.each do |category|
        tech_category_result = client.query(
          "SELECT tech_category_id FROM tech_categories WHERE tech_category_name = '#{category}'"
        )
        tech_category_id = tech_category_result.first['tech_category_id']

        client.prepare(
          "INSERT INTO memo_tech_categories (memo_id, tech_category_id) VALUES (?, ?)"
        ).execute(memo_id, tech_category_id)
      end

      client.query('COMMIT')

      # レスポンスを設定
      res.status = 200
      res.content_type = 'application/json'
      res.body = {
        success: 'Data posted successfully!',
        received_title: title,
        received_categories: categories,
        received_detail: detail,
        received_solution: solution
      }.to_json
    rescue StandardError => e
      # エラー時の処理
      client.query('ROLLBACK')
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
