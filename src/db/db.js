const mongoose = require('mongoose')
const { host, database } =  require('./database')
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set('useFindAndModify', false)

mongoose.connect(`${host}${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection

db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('database disconnected');
});
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
});

module.exports = mongoose