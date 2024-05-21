class EmailAlreadyRegisteredError extends Error {
    constructor() {
      super('Email já cadastrado');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = EmailAlreadyRegisteredError