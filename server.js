const app = require('./src/app');
const config = require('./src/config/config');
const { connectDB } = require('./src/config/database');

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

let server;
(async () => {
    try {
        await connectDB();
        server = app.listen(config.PORT, () =>
            console.log(`Server running on port ${config.PORT}`));
    } catch (err) {
        console.error('Startup failed:', err);
        process.exit(1);
    }
})();

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
    if (server) server.close(() => process.exit(1));
    else process.exit(1);
});
