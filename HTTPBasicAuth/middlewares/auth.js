function auth(req, res, next) {
  const users = [
    { id: 101, username: "alikavetisyan7", password: "pass1234" },
    { id: 102, username: "maratavetisyan7", password: "pass34" },
    { id: 103, username: "emmaavetisyan7", password: "password23" },
  ];

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    return res.status(401).json({ message: "Unauthorized" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.user = user;
  next();
}

module.exports = auth;
