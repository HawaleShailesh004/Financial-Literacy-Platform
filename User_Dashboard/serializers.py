from rest_framework import serializers
from .models import Module, Chapter, KeyConcept, ConceptDetail, Quiz, Question, UserModuleProgress, UserChapterProgress, UserConceptProgress, UserCurrentProgress, AchievementTracker

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class KeyConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyConcept
        fields = '__all__'

class ConceptDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConceptDetail
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class UserModuleProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModuleProgress
        fields = '__all__'

class UserChapterProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChapterProgress
        fields = '__all__'

class UserConceptProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConceptProgress
        fields = '__all__'

class UserCurrentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCurrentProgress
        fields = '__all__'

class AchievementTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementTracker
        fields = '__all__'
