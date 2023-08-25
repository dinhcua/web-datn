import { ROLES } from 'constants/user';
import moment from 'moment';

export const castUser = (user) => {
    let newUser = {
        ...user,
        cast: {
            role: ROLES[user.role],
            identity_card_date: moment(user.identity_card_date || new Date()),
            date_of_birth: moment(user.date_of_birth || new Date()),
            created_at: moment(user.created_at || new Date()),
            updated_at: moment(user.updated_at || new Date()),
        },
    };
    return newUser;
};

export const castTimestamps = (obj) => {
    let newObj = {
        ...obj,
        cast: {
            created_at: moment(obj.created_at || new Date()),
            updated_at: moment(obj.updated_at || new Date()),
            deleted_at: moment(obj.deleted_at || new Date()),
            accepted_at: moment(obj.accepted_at || new Date()),
            finished_at: moment(obj.finished_at || new Date()),
        },
    };
    return newObj;
};
