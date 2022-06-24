import withSession from 'utils/withSession';

export default withSession(async (req, res) => {
    req.session.destroy();
    res.json({ isLoggedIn: false });
});
