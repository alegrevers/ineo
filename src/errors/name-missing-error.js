class NameMissingError extends Error {
    constructor() {
      super('O campo name é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = NameMissingError