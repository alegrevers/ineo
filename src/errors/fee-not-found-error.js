class FeeNotFoundError extends Error {
    constructor() {
      super('Emolumento não encontrado');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = FeeNotFoundError