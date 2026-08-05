import LoadingSpinner from './LoadingSpinner';

export default function DashboardCards({ stats, loading }) {
  if (loading) return <LoadingSpinner />;

  const cards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees ?? 0,
      icon: 'bi-people-fill',
      variant: 'primary',
    },
    {
      title: 'Active Employees',
      value: stats?.activeEmployees ?? 0,
      icon: 'bi-person-check-fill',
      variant: 'success',
    },
    {
      title: 'Departments',
      value: stats?.totalDepartments ?? 0,
      icon: 'bi-building',
      variant: 'info',
    },
    {
      title: 'Average Salary',
      value: stats?.averageSalary
        ? `$${Number(stats.averageSalary).toLocaleString()}`
        : '$0',
      icon: 'bi-currency-dollar',
      variant: 'warning',
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card) => (
        <div key={card.title} className="col-sm-6 col-xl-3">
          <div className={`card stat-card ${card.variant}`}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 small">{card.title}</p>
                <h3 className="mb-0 fw-bold">{card.value}</h3>
              </div>
              <div className={`stat-icon`}>
                <i className={`bi ${card.icon}`}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
