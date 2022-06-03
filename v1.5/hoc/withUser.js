import useUser from 'utils/useUser';

const withUser = (WrappedComponent) => (props) => {
    const { user } = useUser();
    return <WrappedComponent user={user} {...props} />;
}

export default withUser;