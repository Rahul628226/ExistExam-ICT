import React from 'react';

const MongoDBDashboard = () => {
  return (
    <div style={{ background: '#F1F5F4', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)', width: '80vw', height: '100vh', margin: '10vh auto' }}>
      <iframe
        title="MongoDB Dashboard"
        style={{ width: '100%', height: '100%', border: 'none' }}
        src="https://charts.mongodb.com/charts-app-mern-xttpr/embed/dashboards?id=653e4135-ea40-46a0-8a29-766448d2f2cd&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
      ></iframe>
    </div>
  );
};

export default MongoDBDashboard;
