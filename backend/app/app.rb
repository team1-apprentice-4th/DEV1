require 'webrick'
require 'mysql2'
require 'yaml'
require 'json'

module WEBrick
  module HTTPServlet
    class ProcHandler < AbstractServlet
      alias do_PUT    do_GET
      alias do_DELETE do_GET
    end
  end
end

# YAMLファイルからデータベースの接続情報を取得
config_path = '/usr/src/app/config/database.yml'
db_config = YAML.load_file(config_path)['development']

# サーバーをポート4567に立てる
server = WEBrick::HTTPServer.new(Port: 4567)

# POSTリクエストを処理する
server.mount_proc '/memos' do |req, res|
  # MySQLデータベースに接続
  client = Mysql2::Client.new(db_config)
  # データベースを選択
  client.query('USE Tmatter')
  res.header['Access-Control-Allow-Origin'] = '*'

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

      request_method = data['method']
      if request_method == 'PUT'
        title, detail, solution, resolved = data.values_at('title', 'detail', 'solution', 'resolved')
        memo_id = data['memo_id']

        # memosテーブルを更新
        statement = client.prepare("UPDATE memos SET title_name = ?, detail = ?, solution = ?, resolved = ? WHERE memo_id = ?")
        statement.execute(title, detail, solution, resolved, memo_id)

        res.status = 200
        res.content_type = 'application/json'
        res.body = { success: 'Memo updated successfully!', memo_id: memo_id }.to_json
      elsif request_method == 'DELETE'
        memo_id = data['memo_id']

        # memo_tech_categoriesテーブルから該当するメモIDを持つレコードを削除
        client.prepare("DELETE FROM memo_tech_categories WHERE memo_id = ?").execute(memo_id)

        # memosテーブルから指定されたIDのメモを削除
        client.prepare("DELETE FROM memos WHERE memo_id = ?").execute(memo_id)

        res.status = 200
        res.content_type = 'application/json'
        res.body = { success: "Memo with ID #{memo_id} deleted successfully." }.to_json
      else
        title, categories, detail, solution = data.values_at('title', 'category', 'detail', 'solution')
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
      end
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

# 【3/31】追記
server.mount_proc '/history' do |req, res|
  begin
    # MySQLデータベースに接続
    client = Mysql2::Client.new(db_config)
    # データベースを選択
    client.query('USE Tmatter')
    res.header['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'

    if req.request_method == 'GET'
        # ここで得するために必要なSQLを書く【解決までに時間がかかったもの】
        statement = client.prepare('SELECT memo_id, title_name, solution, posted_at,last_updated_at, resolved_at FROM memos
        ORDER BY last_updated_at - posted_at  DESC')
        results = statement.execute.to_a

        # 結果をJSON形式で返す
        res.status = 200
        res.content_type = 'application/json'
        res.body = results.to_json

      end
    rescue StandardError => e
        res.status = 500
        res.content_type = 'application/json'
        res.body = { error: e.message }.to_json
    end
  end

trap('INT') { server.shutdown }

server.start
