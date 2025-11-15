namespace TestApi.Models;

public class OriginalOffer
{
    public string Name { get; set; } = "";
    public string Items { get; set; } = "";
    public string Price { get; set; } = "";
    public string Location { get; set; } = "";
    public string DeliveryTime { get; set; } = "";
}

public class AlternativeOffer
{
    public string Name { get; set; } = "";
    public string Items { get; set; } = "";
    public string Price { get; set; } = "";
    public string Savings { get; set; } = "";
    public string SavingsPercent { get; set; } = "";
    public string ExtraBenefit { get; set; } = "";
    public string Location { get; set; } = "";
    public string DeliveryTime { get; set; } = "";
    public double Rating { get; set; }
    public bool IsRecommended { get; set; }
}

public class AiOffersResponse
{
    public string Summary { get; set; } = "";
    public OriginalOffer Original { get; set; } = new();
    public List<AlternativeOffer> Alternatives { get; set; } = new();
}
