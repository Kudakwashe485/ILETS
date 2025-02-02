using IELTS.Data;
using IELTS.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container
builder.Services.AddScoped<SpeechToTextService>(provider =>
{
    var modelPath = configuration["SpeechToText:ModelPath"];
    var scorerPath = configuration["SpeechToText:ScorerPath"];

    if (string.IsNullOrEmpty(modelPath) || string.IsNullOrEmpty(scorerPath))
    {
        throw new Exception("Speech-to-Text model path or scorer path is missing in configuration.");
    }

    Console.WriteLine($"? Speech-to-Text Model Path: {modelPath}");
    Console.WriteLine($"? Speech-to-Text Scorer Path: {scorerPath}");

    return new SpeechToTextService(modelPath, scorerPath);
});

// Register necessary services
builder.Services.AddScoped<ScoringService>();
builder.Services.AddScoped<AssessmentService>();

// Retrieve OpenAI API key securely
string? openAiApiKey = configuration["OpenAI:ApiKey"];
if (string.IsNullOrWhiteSpace(openAiApiKey))
{
    throw new Exception("? OpenAI API key is missing in configuration.");
}

Console.WriteLine($"? OpenAI API Key Loaded Successfully");

// Register ConversationalAIService with OpenAI API key
builder.Services.AddScoped<ConversationalAIService>(provider => new ConversationalAIService(openAiApiKey));

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")
        ?? throw new Exception("? Database connection string is missing.")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

// Map default controller routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
