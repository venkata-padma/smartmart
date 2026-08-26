export default function PageContainer({ children, withNav = true, className = '' }) {
  return (
    <main className={`page ${withNav ? '' : 'page--no-nav'} ${className}`}>{children}</main>
  );
}
