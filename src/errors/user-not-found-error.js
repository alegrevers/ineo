class UserNotFoundError extends Error {
    constructor() {
      super('Usuário não encontradp');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = UserNotFoundError