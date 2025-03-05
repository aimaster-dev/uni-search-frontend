const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/';

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