﻿// <auto-generated />
using FeedMe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FeedMe.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210309191838_AddRestaurants")]
    partial class AddRestaurants
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("FeedMe.Models.Restaurant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("DietaryMenu")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<bool>("OpenEarly")
                        .HasColumnType("boolean");

                    b.Property<bool>("OpenLate")
                        .HasColumnType("boolean");

                    b.Property<string>("PhoneNum")
                        .HasColumnType("text");

                    b.Property<string>("PriceRange")
                        .HasColumnType("text");

                    b.Property<string>("TypeOfFood")
                        .HasColumnType("text");

                    b.Property<string>("Website")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Restaurants");
                });
#pragma warning restore 612, 618
        }
    }
}
