export default function Footer() {
  return (
    <footer
      className="bg-white border-top text-center py-3 text-muted small"
      style={{ marginLeft: 0 }}
    >
      &copy; {new Date().getFullYear()} Employee Management System. All rights reserved.
    </footer>
  );
}
