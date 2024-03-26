USE Tmatter;

-- users.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- memos.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/memos.csv'
INTO TABLE memos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- problem_categories.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/problem_categories.csv'
INTO TABLE problem_categories
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- tech_categories.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/tech_categories.csv'
INTO TABLE tech_categories
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- memo_problem_categorie.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/memo_problem_categorie.csv'
INTO TABLE memo_problem_categorie
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- memo_tech_categorie.csvのデータをインポート
LOAD DATA INFILE '/var/lib/mysql-files/memo_tech_categorie.csv'
INTO TABLE memo_tech_categorie
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
