class ProtestNotFoundError extends Error {
    constructor() {
      super('Protesto não encontradp');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = ProtestNotFoundError