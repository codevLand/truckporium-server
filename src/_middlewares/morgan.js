const morgan = require("morgan");
const logger = require("../_helpers/winston");

// Use the http severity
const stream = { write: (message) => logger.http(message.trim()) };

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganLogger = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':remote-addr :remote-user [:date[web]] ":method :url HTTP/:http-version" status: :status ":referrer" ":user-agent" ":res[content-length]bytes @ :response-time ms"',
  // Options: override stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

module.exports = morganLogger;