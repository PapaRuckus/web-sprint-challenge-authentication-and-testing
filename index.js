const server = require('./api/server.js');
const {PORT} = require('./cilent/config.js')

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
