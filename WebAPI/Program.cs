using WebAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=users.db"));

builder.Services.AddScoped<WebAPI.Repositories.UserRepository>();
builder.Services.AddScoped<WebAPI.Services.UserService>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAngularApp");

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();