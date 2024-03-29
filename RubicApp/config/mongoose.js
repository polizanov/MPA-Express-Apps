const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/RubicApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
    });
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('Connected database'));
};
