
import { useState, useEffect } from 'react';
import {
  Typography, Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

import { api } from '@/services/api';

interface Device {
  assembly_wave_id : string
  pick_lot_id : string
  die_label_location_1 : string
  wafer_id_location_1 : string
  outgoing_box_sn_location_1 : string
  outgoing_box_row_location_1 : string
  outgoing_box_column_location_1 : string
  die_label_location_2 : string
  wafer_id_location_2 : string
  outgoing_box_sn_location_2 : string
  outgoing_box_row_location_2 : string
  outgoing_box_column_location_2 : string
  ddp_id_assigned : string
  fau_id_location_1_left: string
  fau_id_location_1_right: string
  fau_id_location_2_left: string
  fau_id_location_2_right: string
  assembly_date: string
  assembly_disposition: string
  assembly_failure_codes: string
  fiber_attach_date: string,
  fiber_attach_disposition: string,
  fiber_attach_failure_codes: string
}

const DeviceOverview = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ddpId, setDdpId] = useState<string>('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await api.devices.getByDDPID(ddpId);
        if(data.data.length == 0) setDevices([]);
        setDevices(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [ddpId]);

  // Handle form submission
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setDdpId(event.target.value);
  };


  return (
    <>
      <Paper
        component="form"
        sx={{ p: '5px 10px', display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="DDPID..."
          value={ddpId}
          onChange={handleInputChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Genealogy Report">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>
                        <TableRow>
                          <TableCell><Box sx={{ display: "flex", alignItems: "center" }} ><Typography variant="h5" fontWeight={600}>Location 1 - Wafer Scribe ID: </Typography></Box></TableCell>
                          <TableCell><Typography color="textSecondary" variant="h5" fontWeight={400}>{devices[0]. wafer_id_location_1}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Box sx={{ display: "flex", alignItems: "center" }} ><Typography variant="h5" fontWeight={600}>Location 1 - Die ID: </Typography></Box></TableCell>
                          <TableCell><Typography color="textSecondary" variant="h5" fontWeight={400}>{devices[0]. die_label_location_1}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Box sx={{ display: "flex", alignItems: "center" }} ><Typography variant="h5" fontWeight={600}>Location 2 - Wafer Scribe ID: </Typography></Box></TableCell>
                          <TableCell><Typography color="textSecondary" variant="h5" fontWeight={400}>{devices[0]. wafer_id_location_2}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Box sx={{ display: "flex", alignItems: "center" }} ><Typography variant="h5" fontWeight={600}>Location 2 - Die ID: </Typography></Box></TableCell>
                          <TableCell><Typography color="textSecondary" variant="h5" fontWeight={400}>{devices[0]. die_label_location_2}</Typography></TableCell>
                        </TableRow>
                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Asssembly History Report">
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>
                        
                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Jira Bugs Report">
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>
                     
                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Part Configuration Report">
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>
                     
                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Shipment Statu Report">
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>

                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item sm={12} md={12} xs={6} lg={6}>
          <DashboardCard title="Raw data Links Report">
          <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {
                loading ? 
                <CircularProgress /> 
                :
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight={600}>
                          
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                    {
                      devices.length > 0 ?
                      <TableBody>
                      </TableBody>
                        :
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2} style={{textAlign: "center"}}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              No devices found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    }
                </Table>
              }
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceOverview;
