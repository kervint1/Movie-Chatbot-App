from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)  # 映画タイトル
    image_path = models.ImageField(upload_to='movie_images/')  # 画像の保存パス
    description = models.TextField()  # 映画の詳細
    description2 = models.TextField()  # 映画の詳細

    def __str__(self):
        return self.title
