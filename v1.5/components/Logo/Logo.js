export default function Logo({ size = '80', ...props }) {
    return (
        <figure {...props}>
            <img width={size} src='/logo.png' alt='logo' />
        </figure>
    );
}