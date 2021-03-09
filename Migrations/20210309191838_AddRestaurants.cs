using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FeedMe.Migrations
{
    public partial class AddRestaurants : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    PhoneNum = table.Column<string>(type: "text", nullable: true),
                    TypeOfFood = table.Column<string>(type: "text", nullable: true),
                    PriceRange = table.Column<string>(type: "text", nullable: true),
                    DietaryMenu = table.Column<bool>(type: "boolean", nullable: false),
                    Website = table.Column<string>(type: "text", nullable: true),
                    OpenLate = table.Column<bool>(type: "boolean", nullable: false),
                    OpenEarly = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Restaurants");
        }
    }
}
