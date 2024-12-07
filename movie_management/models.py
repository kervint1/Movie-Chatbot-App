from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)  # 映画タイトル
    image_path = models.ImageField(upload_to='movie_images/')  # 画像の保存パス
    description = models.TextField()  # 映画の詳細
    description2 = models.TextField()  # 映画の詳細

    def __str__(self):
        return self.title

class Like(models.Model):
    movie_id = models.IntegerField(unique=True)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return("Movie ID: {self.movie_id}, Likes: {self.count}")
    