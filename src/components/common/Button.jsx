import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  fullWidth = true,
  icon = null,
  className = '',
  ...rest
}) {
  return (
    <button
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}
