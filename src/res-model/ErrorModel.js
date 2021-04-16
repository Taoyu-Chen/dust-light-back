/**
 * @description Error Model
 * @author Taoyu Chen
 */

class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno,
        this.message = message
    }
}

module.exports = ErrorModel
