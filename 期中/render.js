export function layout(title, content, username = null) {
  const navLinks = username
    ? `<a href="/logout">登出</a>`
    : `<a href="/register">註冊</a> | <a href="/login">登錄</a>`;

  const loginStatus = username
  return `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <nav>
          ${navLinks}
        </nav>
        <hr />
        ${loginStatus}
        ${content}
      </body>
    </html>
  `;
}

export function home(username) {
  return layout(
    "首頁",
    username
      ? `<h1>歡迎，${username}！</h1><p>查看 <a href="/chat">聊天</a> 或 <a href="/logout">登出</a>。</p>`
      : `<h1>歡迎來到我們的網站！</h1><p>請 <a href="/login">登錄</a> 或 <a href="/register">註冊</a>。</p>`,
    username
  );
}

export function registerForm(error = null) {
  const errorMessage = error ? `<p style="color: red;">${error}</p>` : "";
  return layout(
    "註冊",
    `
    ${errorMessage}
    <h1>註冊</h1>
    <form action="/register" method="post">
      <p><input type="text" id="username" name="username" placeholder="用戶名" required /></p>
      <p><input type="password" id="password" name="password" placeholder="密碼" required /></p>
      <p><button type="submit">註冊</button></p>
    </form>
  `
  );
}

export function loginForm(error = null) {
  const errorMessage = error ? `<p style="color: red;">${error}</p>` : "";
  return layout(
    "登錄",
    `
    ${errorMessage}
    <h1>登錄</h1>
    <form action="/login" method="post">
      <p><input type="text" name="username" placeholder="用戶名" required /></p>
      <p><input type="password" name="password" placeholder="密碼" required /></p>
      <p><button type="submit">登錄</button></p>
    </form>
  `
  );
}

export function chatPage(messages, username) {
  const messageList = messages
    .map((msg) => `<div><strong>${msg.sender}:</strong> ${msg.message}</div>`)
    .join("");

  return layout(
    "聊天",
    `
      <h1>聊天</h1>
      <div style="border: 1px solid #ccc; padding: 10px; max-height: 300px; overflow-y: auto;">
        ${messageList || "<p>暫無聊天記錄。</p>"}
      </div>
      <form action="/chat" method="post">
        <p>
          <input type="text" name="message" placeholder="輸入消息..." required style="width: 80%;" />
          <button type="submit" style="width: 15%;">發送</button>
        </p>
      </form>
    `,
    username
  );
}