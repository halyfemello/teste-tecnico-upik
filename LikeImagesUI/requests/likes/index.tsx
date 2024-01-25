import axios from 'axios';

const url = "http://localhost:4000";

export const saveLike = async (idImage: string) => {
  
  const likeData = {
    imageId: idImage
  };
  
  try {
      const response = await axios.post(url + '/api/like/save', likeData);
      return response.data;
  } catch (error) {
      console.error('Erro ao salvar like da imagem:', error);
      throw error;
  }
};

export const listLikes = async () => {   
  try {
      const response = await axios.get(url + '/api/like/list');
      return response.data;
  } catch (error) {
      console.error('Erro ao salvar like da imagem:', error);
      throw error;
  }
};