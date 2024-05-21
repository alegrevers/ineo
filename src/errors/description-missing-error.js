class DescriptionMissingError extends Error {
    constructor() {
      super('O campo description é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = DescriptionMissingError