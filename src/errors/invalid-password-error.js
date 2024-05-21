class InvalidPasswordError extends Error {
    constructor() {
      super('Senha incorreta');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = InvalidPasswordError