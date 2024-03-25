# DB構築手順
## 前提
以下を実施していること
[Docker環境構築](https://github.com/team1-apprentice-4th/Tmatter/blob/develop/README.md)

## DBへ接続
mysql -h 127.0.0.1 -P 3306 -u root -p
※パスワードは.env記載のパスワード

## DB作成
CREATE DATABASE Tmatter;

## テーブル作成
use Tmatter;
```
use Tmatter;
Database changed

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100)
);
Query OK, 0 rows affected (0.06 sec)


CREATE TABLE memos (
    memo_id INT AUTO_INCREMENT PRIMARY KEY,
    title_name VARCHAR(200),
    problem_categorie_id INT,
    solution VARCHAR(200),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tech_category_id INT,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
Query OK, 0 rows affected (0.11 sec)



CREATE TABLE problem_categories (
    problem_category_id INT AUTO_INCREMENT PRIMARY KEY,
    problem_category_name VARCHAR(100)
);
Query OK, 0 rows affected (0.05 sec)


CREATE TABLE memo_problem_categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    problem_categorie_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (problem_categorie_id) REFERENCES problem_categories(problem_category_id)
);
Query OK, 0 rows affected (0.09 sec)

CREATE TABLE tech_categories (
    tech_category_id INT AUTO_INCREMENT PRIMARY KEY,
    tech_category_name VARCHAR(100)
);
Query OK, 0 rows affected (0.05 sec)


CREATE TABLE memo_tech_categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    tech_category_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (tech_category_id) REFERENCES tech_categories(tech_category_id)
);
Query OK, 0 rows affected (0.07 sec)

show tables
;
+------------------------+
| Tables_in_Tmatter      |
+------------------------+
| memo_problem_categorie |
| memo_tech_categorie    |
| memos                  |
| problem_categories     |
| tech_categories        |
| users                  |
+------------------------+
```
