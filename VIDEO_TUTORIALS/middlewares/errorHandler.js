module.exports = (err, req, res, next) => {
    let message = err.message || "Something went wrong!";
    let status = err.status || 500;

    
    res.render("err/error", { message, status })
}