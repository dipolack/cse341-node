const awesomeFunction = (req, res, next) => {
    res.json('Christian Torres');
};

const returnAnotherPerson = (req, res, next) => {
    res.json ('Super awesome person');
}

module.exports = {awesomeFunction, returnAnotherPerson};