import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './SupabaseClient';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*');

      if (fetchError) {
        throw fetchError;
      }

      setBookings(data ?? []);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const visibleBookings = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const filtered = bookings.filter((booking) => {
      const matchesType = customerTypeFilter === 'all' || booking.customertype === customerTypeFilter;
      const fullName = `${booking.first_name ?? ''} ${booking.last_name ?? ''}`.toLowerCase();
      const matchesSearch = !searchTerm
        || fullName.includes(searchTerm)
        || (booking.title ?? '').toLowerCase().includes(searchTerm);
      return matchesType && matchesSearch;
    });

    return [...filtered].sort((first, second) => {
      if (sortOrder === 'name') {
        return `${first.last_name} ${first.first_name}`.localeCompare(`${second.last_name} ${second.first_name}`);
      }
      if (sortOrder === 'bond') {
        return Number(second.bond) - Number(first.bond);
      }
      return new Date(second.created_at ?? 0) - new Date(first.created_at ?? 0);
    });
  }, [bookings, customerTypeFilter, search, sortOrder]);

  return (
    <div className="page-content">
      <h1>Bookings</h1>

      <hr />
      <h3>Bookings</h3>
      <div className="booking-filters" aria-label="Booking filters">
        <label>
          Search:
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or title"
          />
        </label>
        <label>
          Customer type:
          <select value={customerTypeFilter} onChange={(event) => setCustomerTypeFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="consumer">Consumer</option>
            <option value="business">Business</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="name">Name</option>
            <option value="bond">Bond (highest)</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : visibleBookings.length === 0 ? (
        <p>No bookings match the selected criteria.</p>
      ) : (
        visibleBookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: '1px solid gray',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <p>
              {booking.title}: {booking.first_name} {booking.last_name}
            </p>
            <p>Bond: {booking.bond}</p>
            <p>Service fee: {booking.service}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Bookings;