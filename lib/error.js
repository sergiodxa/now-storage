class Err extends Error {
  constructor(message, type, ...params) {
    super(message, ...params);
    this.type = type;
    if (process.env.NODE_ENV !== 'production') {
      this.details = `https://err.sh/sergiodxa/now-storage/${type}`;
    }
  }
}

module.exports = Err;
