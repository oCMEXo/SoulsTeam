namespace TestApi.Models;

public class AiOfferDto
{
    public string Name { get; set; } = "";
    public string Items { get; set; } = "";
    public double Price { get; set; }
    public double Savings { get; set; }
    public double SavingsPercent { get; set; }
    public string Location { get; set; } = "";
    public string DeliveryTime { get; set; } = "";
    public double? Rating { get; set; }
    public bool IsRecommended { get; set; }
    public bool IsOriginal { get; set; }
}

public class AiOffersResponse
{
    public string Summary { get; set; } = "";
    public List<AiOfferDto> Offers { get; set; } = new();
    public double TotalPrice { get; set; }
    public double TotalSavings { get; set; }
}
