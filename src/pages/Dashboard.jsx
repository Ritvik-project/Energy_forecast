import React from 'react';
import Dashboard1 from '../components/Dashboard1';
import Dashboard2 from '../components/Dashboard2';
// import Dashboard3 from '../components/Dashboard3';
import '../css/Dashboard.css'; // Import the custom CSS

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">ENERGY DASHBOARD</h1>
      </header>
      
      {/* Dashboard1 Section */}
      <section className="dashboard-section">
        <Dashboard1 />
      </section>
      
      {/* Today's Data Divider */}
      <div className="section-divider">
        <div className="divider-line"></div>
        <h2 className="section-title">Today's data</h2>
        <div className="divider-line"></div>
      </div>
      
      {/* Dashboard2 Section */}
      <section className="dashboard-section">
        <Dashboard2 />
      </section>
      
      {/* Uncomment when Dashboard3 is ready */}
      {/* 
      <section className="dashboard-section">
        <Dashboard3 />
      </section>
      */}
      
      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} Energy Monitoring System</p>
      </footer>
    </div>
  );
};

export default Dashboard;