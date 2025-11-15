public class AiResult
{
    public string Summary { get; set; } = "";
    public OriginalDto Original { get; set; } = new();
    public List<AlternativeDto> Alternatives { get; set; } = new();
}

public class OriginalDto
{
    public string Name { get; set; } = "";
    public string Items { get; set; } = "";
    public string Price { get; set; } = "";
    public string Location { get; set; } = "";
    public string DeliveryTime { get; set; } = "";
}

public class AlternativeDto
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
