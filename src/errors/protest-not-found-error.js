class ProtestNotFoundError extends Error {
    constructor() {
      super('Protesto não encontrado');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = ProtestNotFoundError