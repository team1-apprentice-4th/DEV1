# Tmatter

## 進捗管理資料
https://docs.google.com/spreadsheets/d/19ewXW82W5lEVyVkVdIdeyYkbeFR40s7wWx56AfrsziY/edit?usp=sharing

## git運用ルール
基本方針は以下のGitFlowに従う<br>
https://zenn.dev/mo_ri_regen/articles/about-git-flow

- ブランチ <br>
それぞれの機能のタスクごとにそれぞれブランチを切る。 <br>
ガントチャートに記載しているタスクの粒度くらいの想定。

- プルリク <br>
基本的にレビュー者不要なものは各自でマージする。(各機能で担当が分かれており、レビューが難しいため) <br>
コンフリクトが発生する際や、フロントとバックエンドの結合部分のような相談が必要な際は関係者にメンション飛ばして決める。

## フォルダ構成
```
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
```

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
docker compose up --build
```
問題なく起動したら「 lodalhost:4567 」をChromeで開いて「Hello World」が表示されたら環境構築完了です。
以上
