const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  devices: {
    getByDDPID: async (id: string) => {
      const response = await fetch(`${BASE_URL}/search/device-info/?keyfeature=ddp_id_assigned&keyword=${id}`);
      if (!response.ok) throw new Error('Failed to fetch DDPID');
      return response.json();
    },
    uploadCSV: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${BASE_URL}/file/upload/device-info/`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to upload CSV file');
      return response.json();
    }
  },
};
// import axios from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
// });

// export const api = {
//   devices: {
//     getByDDPID: async (id: string) => {
//       try {
//         const response = await apiClient.get(`/api/v1/search/device-info/`, {
//           params: { keyfeature: 'ddp_id_assigned', keyword: id }
//         });
//         return response.data;
//       } catch (error) {
//         throw new Error('Failed to fetch DDPID');
//       }
//     },

//     uploadCSV: async (file: File) => {
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         const response = await apiClient.post('/api/v1/upload-csv/', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         return response.data;
//       } catch (error) {
//         throw new Error('Failed to upload CSV file');
//       }
//     },
//   },
// };