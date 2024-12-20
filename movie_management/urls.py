"""
URL configuration for movie_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('add_movie/', views.add_movie, name='add_movie'),  # 映画登録ページ
    path('', views.home, name='home'),  # ホームページ
    path('movie/<int:movie_id>/', views.movie_details, name='movie_details'),
    path('movie/<int:movie_id>/like/', views.like_movie, name='like_movie'),
    path('liked_movies/', views.liked_movies, name='liked_movies'),
    path('chatbot/', views.chatbot, name='chatbot'),
]
