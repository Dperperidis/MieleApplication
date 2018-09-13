using Microsoft.EntityFrameworkCore.Migrations;

namespace MieleServiceApp.Migrations
{
    public partial class tech : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "ExternalTechs",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "ExternalTechs",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
