import * as express from "express";
import * as chalk from "chalk";

const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "localhost";
const targetDir = "build";

const app = express();

// Server static assets
app.use(
  express.static(targetDir, {
    etag: true,
    maxAge: 0,
  })
);

app.listen(port, () => {
  console.log(
    `Serving at http://${host}:${port} ${chalk.green("✓")}. ${chalk.red(
      "To run in dev mode: npm run dev"
    )}`
  );
});
