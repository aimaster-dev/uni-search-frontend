'use client'
import { Grid } from '@mui/material';
import { useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import DeviceOverview from '@/app/(DashboardLayout)/components/dashboard/DeviceOverview';
import FileUpload from '@/app/(DashboardLayout)/components/dashboard/FileUpload';

const Dashboard = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleUploadSuccess = () => {
    setIsFileUploaded(true);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <>
        <Grid container>
          <Grid item xs={12} lg={12}>
            {/* {isFileUploaded ? ( */}
              <DeviceOverview />
            {/* ) : (
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            )} */}
          </Grid>
        </Grid>
      </>
    </PageContainer>
  )
}

export default Dashboard;
