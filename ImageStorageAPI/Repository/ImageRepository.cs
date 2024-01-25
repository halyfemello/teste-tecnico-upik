using System.Text.Json;
using ImageStorageAPI.Models;

namespace ImageStorageAPI.Repository
{
    public class ImageRepository
    {
        private readonly List<Image> _images;

        public ImageRepository()
        {
            string caminhoArquivo = "./Repository/ImagesDataBase.json";
            using (StreamReader fileReader = new StreamReader(caminhoArquivo))
            {
                string jsonConteudo = fileReader.ReadToEnd();
                _images = JsonSerializer.Deserialize<List<Image>>(jsonConteudo);
            }
        }

        public List<Image> GetAll()
        {
            return _images;
        }
    }
}