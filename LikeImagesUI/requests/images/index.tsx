import axios from 'axios';

const url = "http://localhost:8099";

export const listImages = async () => {
  try {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Substitua pelo token JWT real
    const response = await axios.get(url + '/api/image/list', {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados protegidos:', error);
  }
};