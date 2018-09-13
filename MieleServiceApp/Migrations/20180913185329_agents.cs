using Microsoft.EntityFrameworkCore.Migrations;

namespace MieleServiceApp.Migrations
{
    public partial class agents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    InBoundCalls = table.Column<string>(nullable: true),
                    mValueTime = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agents");
        }
    }
}
