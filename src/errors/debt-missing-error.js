class DebtMissingError extends Error {
    constructor() {
      super('O campo debt é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = DebtMissingError