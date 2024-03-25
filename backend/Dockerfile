FROM ruby:3

WORKDIR /usr/src/app

# Gemfile と Gemfile.lock をコピー
COPY Gemfile ./

# Bundle install を実行
RUN bundle install

# アプリケーションの残りの部分をコピー
COPY . .

CMD ["ruby", "app/app.rb", "-o", "0.0.0.0"]
