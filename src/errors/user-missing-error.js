class UserMissingError extends Error {
    constructor() {
      super('O campo user é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = UserMissingError