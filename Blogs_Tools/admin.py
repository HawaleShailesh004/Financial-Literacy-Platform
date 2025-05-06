from django.contrib import admin
from Blogs_Tools.models import Blog


class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    ordering = ('id',)
 

# Register your models here.
admin.site.register(Blog, BlogAdmin)
