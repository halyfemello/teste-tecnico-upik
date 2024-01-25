using System.Reflection;
using ImageStorageAPI.Autorizacao;
using ImageStorageAPI.Core.Images.Queries;
using ImageStorageAPI.Models;

static IEnumerable<Assembly> GetAssemblies()
{
    yield return typeof(Image).GetTypeInfo().Assembly;
    yield return typeof(ListImagesQuery).GetTypeInfo().Assembly;
    //yield return typeof(ImageRepository).GetTypeInfo().Assembly;    
}

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddSingleton<IServiceCollection>(builder.Services);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblies(GetAssemblies().ToArray());
});

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("http://localhost:3000", builder =>
//     {
//         builder
//             .AllowAnyOrigin()
//             .AllowAnyHeader()
//             .AllowAnyMethod();
//     });
// });

builder.Services.AddCors(options =>
{
    options.AddPolicy("Publico", builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

if (builder.Environment.IsProduction())
{
    //TODO implementaria aqui a logica para a verificação com o servidor do auth  
}
else
{
    builder.Services.AddAuthentication("Fake")
                .AddScheme<FakeAuthOptions, FakeAuthHandler>("Fake", options => { });
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Image Storage API");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

//app.UseCors("AllowSpecificOrigin");
app.UseCors("Publico");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
