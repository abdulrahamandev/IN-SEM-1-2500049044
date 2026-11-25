import { useState } from 'react'
import './App.css'

const patients = [
  { id: 'PT-2048', name: 'Olivia Rhye', doctor: 'Dr. Ethan Carter', time: '09:00 AM', status: 'Checked in' },
  { id: 'PT-2047', name: 'Phoenix Baker', doctor: 'Dr. Maya Patel', time: '09:30 AM', status: 'In progress' },
  { id: 'PT-2046', name: 'Lana Steiner', doctor: 'Dr. Noah Williams', time: '10:15 AM', status: 'Waiting' },
  { id: 'PT-2045', name: 'Demi Wilkinson', doctor: 'Dr. Ethan Carter', time: '11:00 AM', status: 'Confirmed' },
  { id: 'PT-2044', name: 'Candice Wu', doctor: 'Dr. Sophia Chen', time: '11:30 AM', status: 'Confirmed' },
]

const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

function App() {
  const [search, setSearch] = useState('')
  const filteredPatients = patients.filter((patient) =>
    `${patient.id} ${patient.name} ${patient.doctor}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="dashboard">
      <header className="page-header">
        <div className="brand"><span className="brand-icon">+</span> Carepoint</div>
        <span className="today">{today}</span>
      </header>

      <section className="intro">
        <div className="eyebrow">PATIENT INFORMATION</div>
        <h1>Good morning, Jordan</h1>
        <p>Here are the patients scheduled at your clinic today.</p>
      </section>

      <section className="summary">
        <div><span className="summary-label">Appointments today</span><strong>24</strong></div>
        <div><span className="summary-label">Checked in</span><strong>8</strong></div>
        <div><span className="summary-label">Next appointment</span><strong className="next-time">09:00 AM</strong></div>
      </section>

      <section className="patients-card">
        <div className="card-heading">
          <div>
            <h2>Today’s appointments</h2>
            <p>Patient details and appointment schedule</p>
          </div>
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search patients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search patients"
            />
          </label>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Patient ID</th><th>Patient name</th><th>Doctor assigned</th><th>Appointment time</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="patient-id">{patient.id}</td>
                  <td className="patient-name">{patient.name}</td>
                  <td>{patient.doctor}</td>
                  <td className="appointment-time">{patient.time}</td>
                  <td><span className={`status status-${patient.status.toLowerCase().replace(' ', '-')}`}>{patient.status}</span></td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr><td className="empty" colSpan="5">No matching patients found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing {filteredPatients.length} of {patients.length} patients</div>
      </section>

      <footer className="footer">Carepoint Hospital <span>•</span> Patient information system</footer>
    </main>
  )
}

export default App
