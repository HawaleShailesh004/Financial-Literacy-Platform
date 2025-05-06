from django.contrib import admin
from django.urls import path
from . import views as views 

urlpatterns = [
    path('dashboard', views.dashboard, name="dashboard"),
    path('module', views.module, name="module"),
    path('editProfile', views.editProfile, name="editProfile"),
    path('privacyPolicy', views.privacyPolicy, name="privacyPolicy"),
    path('t&C', views.tAndC, name="tAndC"),
    path('copyright', views.copyright, name="copyright"),
    path('faq', views.faq, name="faq"),
    
    path('get-user-data/<str:username>/', views.get_user_data, name='get_user_data'),

     path('get-curriculum-titles/', views.get_curriculum_titles, name='get-curriculum-titles'),

    path('get-completed-chapters/<str:username>/of/<path:module>/', views.get_completed_chapters, name='get_completed_chapters'),

    path('get-module-with-chapters/<str:username>/of/<path:module>/', views.get_module_with_chapters, name='get_module_with_chapters'),

    path('update_concept/<str:username>/of/<path:concept>/', views.updateConcept, name='updateConcept'),

    path('update_chapter/<str:username>/of/<path:chapter>/', views.updateChapter, name='updateChapter'),

    path('update_module/<str:username>/of/<path:module>/', views.updateModule, name='updateModule'),

    path('update_quiz/<str:username>/of/<str:quizNo>/', views.updateQuiz, name='updateQuiz'),



    
    # path('get-concepts-of-chapter/<str:username>/of/<path:chapter>/', views.get_concepts_of_chapter, name='get_concepts_of_chapter'),


]
