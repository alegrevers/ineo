class PasswordMissingError extends Error {
    constructor() {
      super('O campo password é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = PasswordMissingError