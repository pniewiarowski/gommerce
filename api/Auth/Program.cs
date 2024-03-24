using Auth.Database;
using Microsoft.EntityFrameworkCore;
using Auth.Service;
using Auth.Service.Implementation;

const string secretForHash = "123456789"; // TODO: Move to environmental variable.
const string secretForJWT = "123456789123456789123456789123456789123456789"; // TODO: Move to environmental variable.

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddDbContext<Context>(
    options => options.UseNpgsql(configuration.GetConnectionString("Connection"))
);

builder.Services.AddSingleton<IHasher>(new Hasher(secretForHash));
builder.Services.AddSingleton<IToken>(new Token(secretForJWT));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMvc();
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();
app.Run();