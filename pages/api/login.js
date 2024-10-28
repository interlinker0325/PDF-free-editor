import { request } from 'utils/graphqlRequest';
import withSession from 'utils/withSession';
import Cors from 'cors'
import initMiddleware from 'utils/initMiddleware'
import { query } from 'gql';
import { INPUT_TYPES } from 'utils/form';

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)


export default withSession(async (req, res) => {
    await cors(req, res);
    const { email, password } = await req.body;
    try {
        const { user: userData } = await request([query.user.GET_USER_LOGIN_DATA(email)]);
        if (userData) {
            if (userData.password === password) {
                delete userData.password;
                const user = { isLoggedIn: true, ...userData };
                req.session.set('user', user);
                await req.session.save();
                res.json(user);
            } else {
                res.status(401).json({ field: INPUT_TYPES.PASSWORD, msg: 'Contraseña incorrecta'});
            }
        } else {
            res.status(401).json({ field: INPUT_TYPES.EMAIL, msg: 'No existe un usuario con esas credenciales'});
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ field: INPUT_TYPES.EMAIL, msg: 'No existe un usuario con esas credenciales'});
    }
});
