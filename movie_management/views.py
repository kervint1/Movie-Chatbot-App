from django.shortcuts import render, redirect
from .forms import MovieForm
from .models import Movie  # Movie モデルをインポート

def add_movie(request):
    if request.method == "POST":
        form = MovieForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')  # ホームページにリダイレクト
    else:
        form = MovieForm()
    return render(request, 'add_movie.html', {'form': form})

def home(request):
    movies = Movie.objects.all()  # 登録済み映画を取得
    return render(request, 'home.html', {'movies': movies})
