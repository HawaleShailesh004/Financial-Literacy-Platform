from django.contrib import admin
from django.urls import path
from . import views as views 

urlpatterns = [
    path('', views.index, name="index"),
    path('index', views.index, name="index"),
    path('login', views.login, name="login"),
    path('sign-up', views.signUp, name="sign-up"),
    path('quiz-welcome', views.quizWelcome, name="quiz-welcome"),
    path('quiz', views.quiz, name="quiz"),
]
