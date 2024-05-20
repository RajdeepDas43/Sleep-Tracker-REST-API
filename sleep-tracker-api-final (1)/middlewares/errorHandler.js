
const apiErrorHandler = (err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = apiErrorHandler;
