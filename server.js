//main file i will forward everything to
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
