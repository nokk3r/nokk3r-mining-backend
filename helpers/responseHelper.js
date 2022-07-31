exports.ok = (res, msg) => {
    return createSuccessResponse(200, res, msg)
}

exports.create = (res, msg) => {
    return createSuccessResponse(201, res, msg)
}

exports.badRequest = (res, msg) => {
    return createErrorResponse(400, res, msg)
}

exports.forbidden = (res, msg) => {
    return createErrorResponse(403, res, msg)
}

exports.internalError = (res, msg) => {
    return createErrorResponse(500, res, msg)
}


function createSuccessResponse(status, res, msg) {
    if (typeof msg === 'string'){
        return res.status(status).json({msg: msg})
    }
    return res.status(status).json(msg)
}

function createErrorResponse(status, res, msg) {
    try{
        // Custom errors
        if (typeof msg === 'string') {
            return res.status(status).json({errors: [{msg: msg, status: false}]})
        }
        // Mysql2 errors
        if (msg.errors[0].hasOwnProperty(`message`)) {
            return res.status(status).json({
                errors: [{
                    msg: msg.errors[0].message, validatorKey: msg.errors[0].validatorKey
                }],
                status: false
            })
        }
        // Express-validator errors
        if (msg.errors[0].hasOwnProperty(`msg`)) {
            return res.status(status).json({errors: msg.errors, status: false})
        }
        // Other errors
        return res.status(status).json(msg)
    } catch (e){
        return res.status(status).json({errors: [{msg: 'Что-то пошло не так', status: false}]})
    }
}