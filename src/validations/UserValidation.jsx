import * as YUP from 'yup';

export const UserValidation = YUP.object().shape({
    first_name: YUP.string().required(),
    last_name: YUP.string().required(),
    email: YUP.string().email().required(),
    mobile: YUP.number().required(),
    details: YUP.string().required()
})