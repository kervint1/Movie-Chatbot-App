from django.shortcuts import render, redirect, get_object_or_404
from .forms import MovieForm
from .models import Movie  # Movie モデルをインポート
import requests

API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984'
TMDB_MOVIE_URL = 'https://api.themoviedb.org/3/movie/'

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

def movie_details(request, movie_id):
    try:
        # TMDB API から映画データを取得
        response = requests.get(f"{TMDB_MOVIE_URL}{movie_id}", params={'api_key': API_KEY})
        response.raise_for_status()
        movie_data = response.json()

        # 映画情報をテンプレートに渡す
        return render(request, 'moviedetails.html', {
            'movie': {
                'title': movie_data['title'],
                'overview': movie_data['overview'],
                'poster_path': f"https://image.tmdb.org/t/p/w500{movie_data['poster_path']}",
                'release_date': movie_data['release_date'],
            }
        })
    except requests.exceptions.RequestException as e:
        # エラーが発生した場合、404 ページを表示
        return render(request, '404.html', {'error_message': str(e)}, status=404)