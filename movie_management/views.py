from django.shortcuts import render

def home(request):
    return render(request, 'home.html')  # ホームページ

def chatbot(request):
    return render(request, 'chatbot.html')  # チャットボットページ
