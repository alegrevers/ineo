class EmailMissingError extends Error {
    constructor() {
      super('O campo email é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = EmailMissingError