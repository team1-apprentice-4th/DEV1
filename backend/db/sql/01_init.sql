CREATE DATABASE Tmatter;

USE Tmatter;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100)
);

CREATE TABLE memos (
    memo_id INT AUTO_INCREMENT PRIMARY KEY,
    title_name VARCHAR(200),
    solution VARCHAR(200),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    user_id INT,
    detail VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

<<<<<<< HEAD
=======
CREATE TABLE problem_categories (
    problem_category_id INT AUTO_INCREMENT PRIMARY KEY,
    problem_category_name VARCHAR(100)
);

CREATE TABLE memo_problem_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    problem_categorie_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (problem_categorie_id) REFERENCES problem_categories(problem_category_id)
);

>>>>>>> 91d671158270092e9b0b582a1e0c7f15064d0cf1
CREATE TABLE tech_categories (
    tech_category_id INT AUTO_INCREMENT PRIMARY KEY,
    tech_category_name VARCHAR(100)
);

CREATE TABLE memo_tech_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memo_id INT,
    tech_category_id INT,
    FOREIGN KEY (memo_id) REFERENCES memos(memo_id),
    FOREIGN KEY (tech_category_id) REFERENCES tech_categories(tech_category_id)
);
