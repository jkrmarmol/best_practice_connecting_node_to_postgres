const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());


const studentRouter = require('./students');
app.use('/students', studentRouter);



// Error Handling
app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).send(err.message)
});

app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`)
});