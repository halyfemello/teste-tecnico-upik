using ImageStorageAPI.Models;
using ImageStorageAPI.Repository;
using MediatR;

namespace ImageStorageAPI.Core.Images.Queries
{
    public class ListImagesQuery : IRequest<List<Image>>
    {

    }

    public class ListImagesQueryHandler : IRequestHandler<ListImagesQuery, List<Image>>
    {
        private readonly ImageRepository _imageRepository;

        public ListImagesQueryHandler()
        {
            _imageRepository = new ImageRepository();
        }

        public Task<List<Image>> Handle(ListImagesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var images = _imageRepository.GetAll();
                return Task.FromResult(images);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}