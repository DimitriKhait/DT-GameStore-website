using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Models
{
    public partial class video_gamesContext : DbContext
    {
        public video_gamesContext()
        {
        }

        public video_gamesContext(DbContextOptions<video_gamesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AppUser> AppUsers { get; set; } = null!;
        public virtual DbSet<AppUserGamePlatform> AppUserGamePlatforms { get; set; } = null!;
        public virtual DbSet<Game> Games { get; set; } = null!;
        public virtual DbSet<GamePlatform> GamePlatforms { get; set; } = null!;
        public virtual DbSet<GamePublisher> GamePublishers { get; set; } = null!;
        public virtual DbSet<Genre> Genres { get; set; } = null!;
        public virtual DbSet<Platform> Platforms { get; set; } = null!;
        public virtual DbSet<Publisher> Publishers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppUser>(entity =>
            {
                entity.ToTable("App_user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Birthdate)
                    .HasMaxLength(50)
                    .HasColumnName("birthdate");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(50)
                    .HasColumnName("fname");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.Lname)
                    .HasMaxLength(50)
                    .HasColumnName("lname");

                entity.Property(e => e.MobilePhone)
                    .HasMaxLength(30)
                    .HasColumnName("mobile_phone");

                entity.Property(e => e.Pwd)
                    .HasMaxLength(50)
                    .HasColumnName("pwd");
            });

            modelBuilder.Entity<AppUserGamePlatform>(entity =>
            {
                entity.ToTable("App_user_Game_platform");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AppUserId).HasColumnName("app_user_id");

                entity.Property(e => e.GamePlatformId).HasColumnName("game_platform_id");

                entity.HasOne(d => d.AppUser)
                    .WithMany(p => p.AppUserGamePlatforms)
                    .HasForeignKey(d => d.AppUserId)
                    .HasConstraintName("FK__App_user___app_u__48CFD27E");

                entity.HasOne(d => d.GamePlatform)
                    .WithMany(p => p.AppUserGamePlatforms)
                    .HasForeignKey(d => d.GamePlatformId)
                    .HasConstraintName("FK__App_user___game___49C3F6B7");
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.ToTable("Game");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GameDescription)
                    .HasMaxLength(1000)
                    .HasColumnName("game_description");

                entity.Property(e => e.GameName)
                    .HasMaxLength(200)
                    .HasColumnName("game_name");

                entity.Property(e => e.GenreId).HasColumnName("genre_id");

                entity.Property(e => e.PicUrl)
                    .HasMaxLength(255)
                    .HasColumnName("pic_url");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.Games)
                    .HasForeignKey(d => d.GenreId)
                    .HasConstraintName("FK__Game__genre_id__2A4B4B5E");
            });

            modelBuilder.Entity<GamePlatform>(entity =>
            {
                entity.ToTable("Game_platform");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GamePublisherId).HasColumnName("game_publisher_id");

                entity.Property(e => e.PlatformId).HasColumnName("platform_id");

                entity.Property(e => e.ReleaseYear).HasColumnName("release_year");

                entity.HasOne(d => d.GamePublisher)
                    .WithMany(p => p.GamePlatforms)
                    .HasForeignKey(d => d.GamePublisherId)
                    .HasConstraintName("FK__Game_plat__game___30F848ED");

                entity.HasOne(d => d.Platform)
                    .WithMany(p => p.GamePlatforms)
                    .HasForeignKey(d => d.PlatformId)
                    .HasConstraintName("FK__Game_plat__platf__31EC6D26");
            });

            modelBuilder.Entity<GamePublisher>(entity =>
            {
                entity.ToTable("Game_publisher");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GameId).HasColumnName("game_id");

                entity.Property(e => e.PublisherId).HasColumnName("publisher_id");

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.GamePublishers)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK__Game_publ__game___2D27B809");

                entity.HasOne(d => d.Publisher)
                    .WithMany(p => p.GamePublishers)
                    .HasForeignKey(d => d.PublisherId)
                    .HasConstraintName("FK__Game_publ__publi__2E1BDC42");
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.ToTable("Genre");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GenreName)
                    .HasMaxLength(50)
                    .HasColumnName("genre_name");
            });

            modelBuilder.Entity<Platform>(entity =>
            {
                entity.ToTable("Platform");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PlatformName)
                    .HasMaxLength(50)
                    .HasColumnName("platform_name");
            });

            modelBuilder.Entity<Publisher>(entity =>
            {
                entity.ToTable("Publisher");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PublisherName)
                    .HasMaxLength(100)
                    .HasColumnName("publisher_name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
