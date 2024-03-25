CREATE DATABASE tmatter;

USE tmatter;

-- ユーザーのテーブルを作成
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL
);

-- 問題カテゴリのテーブルを作成
CREATE TABLE problem_categories (
    problem_category_id INT AUTO_INCREMENT PRIMARY KEY,
    problem_category_name VARCHAR(100) NOT NULL
);

-- 技術カテゴリのテーブルを作成
CREATE TABLE tech_categories (
    tech_category_id INT AUTO_INCREMENT PRIMARY KEY,
    tech_category_name VARCHAR(100) NOT NULL
);

-- メモのテーブルを作成
CREATE TABLE memos (
    memo_id INT AUTO_INCREMENT PRIMARY KEY,
    title_name VARCHAR(200) NOT NULL,
    problem_category_id INT,
    solution VARCHAR(200),
    posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tech_category_id INT,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    user_id INT,
    FOREIGN KEY (problem_category_id) REFERENCES problem_categories(problem_category_id),
    FOREIGN KEY (tech_category_id) REFERENCES tech_categories(tech_category_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- メモと問題カテゴリの関連テーブルを作成
CREATE TABLE memo_problem_categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    problem_categorie_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (problem_categorie_id) REFERENCES problem_categories(problem_category_id)
);

-- メモと技術カテゴリの関連テーブルを作成
CREATE TABLE memo_tech_categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    tech_category_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (tech_category_id) REFERENCES tech_categories(tech_category_id)
);
