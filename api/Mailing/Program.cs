using Microsoft.EntityFrameworkCore;
using Mailing.Database;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddMvc();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();
app.Run();