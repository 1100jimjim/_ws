import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("1114data.db");

// 初始化表結構
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);


db.query(`
  CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  )
`);

export function createUser(username, password) {
  const existingUser = [...db.query("SELECT 1 FROM users WHERE username = ?", [username])];
  if (existingUser.length > 0) {
    throw new Error("用戶名已存在");
  }
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
}

export function findUser(username, password) {
  return [...db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password])][0];
}



export function getUserAchievements(username) {
  return [...db.query("SELECT name, description FROM achievements WHERE username = ?", [username])];
}