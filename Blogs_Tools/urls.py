from django.urls import path
from Blogs_Tools import views

urlpatterns = [
    path('blog_index/', views.blog_index, name='all_blogs'),
    path('blog/<int:id>/', views.blog_detail, name='blog_detail'),
    path('api/blogs/', views.blog_data, name='api_blogs'),
    path('calculators/<str:type>/', views.calculators,name='calculators_with_type'),
]
