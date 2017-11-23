import Staff from '../models/staff';

const getStaff = (request, reply) => {
    Staff.find({}, (error, result) => {
        if (error) return reply(error);

        if (result.length) {
            return reply(result);
        }
    });
};

const createStaff = (request, reply) => {
   const staff = new Staff(request.payload.staff);
   staff.save();
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/staff',
            config: {
                handler: getStaff
            }
        },
        {
            method: 'POST',
            path: '/staff',
            config: {
                handler: createStaff
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'staff'
};