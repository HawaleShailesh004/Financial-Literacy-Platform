from django.contrib import admin
from .models import *

# Custom admin classes
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    ordering = ('id',)  # Orders by ID in ascending order

class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'module', 'title', 'description')
    ordering = ('id',)

class KeyConceptAdmin(admin.ModelAdmin):
    list_display = ('id', 'chapter', 'title', 'description')
    ordering = ('id',)

class ConceptDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'concept', 'fact', 'definition_explanation', 'real_world_example')
    ordering = ('id',)

class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'concept_detail', 'title')
    ordering = ('id',)
    search_fields = ('title',)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz', 'text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer')
    ordering = ('id',)

class UserModuleProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'module', 'completed')
    ordering = ('id',)

class UserChapterProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'chapter', 'completed')
    ordering = ('id',)

class UserConceptProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'concept', 'completed')
    ordering = ('id',)

class UserCurrentProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'current_module', 'current_chapter', 'current_concept', 'current_quiz', 'current_quiz_no')
    ordering = ('id',)

class AchievementTrackerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'points', 'coins', 'level', 'experience', 'badge')
    ordering = ('id',)
    list_editable = ('points', 'coins')


# Register your models here.
admin.site.register(Module, ModuleAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(KeyConcept, KeyConceptAdmin)
admin.site.register(ConceptDetail, ConceptDetailAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(UserModuleProgress, UserModuleProgressAdmin)
admin.site.register(UserChapterProgress, UserChapterProgressAdmin)
admin.site.register(UserConceptProgress, UserConceptProgressAdmin)
admin.site.register(UserCurrentProgress, UserCurrentProgressAdmin)
admin.site.register(AchievementTracker, AchievementTrackerAdmin)
admin.site.register(UserProgress)