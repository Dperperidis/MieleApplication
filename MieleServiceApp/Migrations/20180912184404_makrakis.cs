using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MieleServiceApp.Migrations
{
    public partial class makrakis : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExternalTechs");

            migrationBuilder.CreateTable(
                name: "ExternalFot",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Area = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    customerId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Order = table.Column<string>(nullable: true),
                    Origin = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    Damage = table.Column<string>(nullable: true),
                    ServiceCost = table.Column<string>(nullable: true),
                    PartsCost = table.Column<string>(nullable: true),
                    TotalCost = table.Column<string>(nullable: true),
                    ServiceDesc = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalFot", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExternalMak",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Area = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    customerId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Order = table.Column<string>(nullable: true),
                    Origin = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    Damage = table.Column<string>(nullable: true),
                    ServiceCost = table.Column<string>(nullable: true),
                    PartsCost = table.Column<string>(nullable: true),
                    TotalCost = table.Column<string>(nullable: true),
                    ServiceDesc = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalMak", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExternalFot");

            migrationBuilder.DropTable(
                name: "ExternalMak");

            migrationBuilder.CreateTable(
                name: "ExternalTechs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Area = table.Column<string>(nullable: true),
                    Damage = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    FullName = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    Order = table.Column<string>(nullable: true),
                    Origin = table.Column<string>(nullable: true),
                    PartsCost = table.Column<string>(nullable: true),
                    ServiceCost = table.Column<string>(nullable: true),
                    ServiceDesc = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    TotalCost = table.Column<string>(nullable: true),
                    customerId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalTechs", x => x.Id);
                });
        }
    }
}
