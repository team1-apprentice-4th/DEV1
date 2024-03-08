# Tmatter

## フォルダ構成
.
├── backend
│   ├── Dockerfile
│   ├── Gemfile
│   ├── app　　　　                 -- APIの開発はこの中
│   │   └── app.rb
│   └── config
│       └── database.yml　 --☆
├── frontend　　　　                -- フロントはこの中
│   ├── css
│   │   └── style.css
│   ├── index.html
│   └── js
│       └── script.js
├── docker-compose.yaml
└── .env                   --☆

## 環境構築
前提としてDockerがインストールされていて、アプリが起動していることを確認お願いします。
まずは任意のフォルダにクローンしてください。
```bash
git clone [URL]
```
次に、別で別途配布するファイルを上記の構成の通り配置してください。(--☆で記載してるところです)
認証情報が入ってるので実務を想定してgithubにはあげないようにしてます。
```
database.yml
.env
```
次にイメージを作成してコンテナを立ち上げます。
```bash
docker-compose up --build
```
問題なく起動したら「http://0.0.0.0:456」をChromeで開いて「Hello World」が表示されたら環境構築完了です。
