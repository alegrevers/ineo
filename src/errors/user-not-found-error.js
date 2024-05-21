class UserNotFoundError extends Error {
    constructor() {
      super('Usuário não encontrado');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = UserNotFoundError