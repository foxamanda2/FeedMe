﻿// <auto-generated />
using System;
using FeedMe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace FeedMe.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("FeedMe.Models.DietType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Diet")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Diets");
                });

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

            modelBuilder.Entity("FeedMe.Models.RestaurantDietType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("DietTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("RestaurantId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DietTypeId");

                    b.HasIndex("RestaurantId");

                    b.ToTable("RestaurantDietTypes");
                });

            modelBuilder.Entity("FeedMe.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Body")
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("RestaurantId")
                        .HasColumnType("integer");

                    b.Property<int>("Stars")
                        .HasColumnType("integer");

                    b.Property<string>("Summary")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("FeedMe.Models.RestaurantDietType", b =>
                {
                    b.HasOne("FeedMe.Models.DietType", "DietTypes")
                        .WithMany("RestaurantDietTypes")
                        .HasForeignKey("DietTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FeedMe.Models.Restaurant", "Restaurants")
                        .WithMany("RestaurantDietTypes")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DietTypes");

                    b.Navigation("Restaurants");
                });

            modelBuilder.Entity("FeedMe.Models.Review", b =>
                {
                    b.HasOne("FeedMe.Models.Restaurant", null)
                        .WithMany("Reviews")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FeedMe.Models.DietType", b =>
                {
                    b.Navigation("RestaurantDietTypes");
                });

            modelBuilder.Entity("FeedMe.Models.Restaurant", b =>
                {
                    b.Navigation("RestaurantDietTypes");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
