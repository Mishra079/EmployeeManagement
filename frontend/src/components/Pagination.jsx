export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(0, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages - 1, start + maxVisible - 1);
  start = Math.max(0, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav aria-label="Page navigation" className="mt-3">
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)}>
            Previous
          </button>
        </li>
        {pages.map((p) => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(p)}>
              {p + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${page >= totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
